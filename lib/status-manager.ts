/**
 * 状态管理器 - 处理智能体状态同步和错误恢复
 * 解决状态文件同步失败的问题
 */

import fs from 'fs/promises';
import path from 'path';
import { EventEmitter } from 'events';

export interface StatusConfig {
  statusDirectory: string;
  retryAttempts: number;
  timeoutSeconds: number;
  checkInterval: number;
  useDatabase?: boolean;
}

export interface AgentStatus {
  agent: string;
  status: 'pending' | 'in_progress' | 'complete' | 'failed';
  timestamp: string;
  metadata?: Record<string, any>;
  error?: string;
}

export class StatusManager extends EventEmitter {
  private config: StatusConfig;
  private statusCache: Map<string, AgentStatus> = new Map();
  private fileWatchers: Map<string, any> = new Map();

  constructor(config: StatusConfig) {
    super();
    this.config = config;
  }

  /**
   * 初始化状态目录
   */
  async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.config.statusDirectory, { recursive: true });
      console.log(`✓ 状态目录已创建: ${this.config.statusDirectory}`);
    } catch (error) {
      const err = error as Error;
      console.error(`✗ 创建状态目录失败:`, err);
      throw new Error(`无法创建状态目录: ${err.message}`);
    }
  }

  /**
   * 设置智能体状态（带重试机制）
   */
  async setStatus(
    agent: string,
    status: AgentStatus['status'],
    metadata?: Record<string, any>
  ): Promise<void> {
    const agentStatus: AgentStatus = {
      agent,
      status,
      timestamp: new Date().toISOString(),
      metadata,
    };

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        // 写入文件
        const statusFile = path.join(
          this.config.statusDirectory,
          `${agent}.${status}`
        );
        await fs.writeFile(statusFile, JSON.stringify(agentStatus, null, 2));

        // 更新缓存
        this.statusCache.set(agent, agentStatus);

        // 发出事件
        this.emit('statusChanged', agentStatus);

        console.log(
          `✓ [尝试 ${attempt}/${this.config.retryAttempts}] 智能体 ${agent} 状态已更新: ${status}`
        );
        return;
      } catch (error) {
        lastError = error as Error;
        console.warn(
          `✗ [尝试 ${attempt}/${this.config.retryAttempts}] 设置状态失败:`,
          lastError.message
        );

        if (attempt < this.config.retryAttempts) {
          // 等待后重试
          await this.sleep(1000 * attempt);
        }
      }
    }

    // 所有尝试失败
    const errorMsg = `设置智能体 ${agent} 状态失败（${this.config.retryAttempts} 次尝试后）: ${lastError?.message}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  /**
   * 获取智能体状态（优先从缓存读取）
   */
  async getStatus(agent: string): Promise<AgentStatus | null> {
    // 先检查缓存
    if (this.statusCache.has(agent)) {
      return this.statusCache.get(agent)!;
    }

    // 从文件系统读取
    try {
      const statusFiles = await fs.readdir(this.config.statusDirectory);
      const agentFiles = statusFiles.filter((f) => f.startsWith(`${agent}.`));

      if (agentFiles.length === 0) {
        return null;
      }

      // 读取最新的状态文件
      const latestFile = agentFiles.sort().reverse()[0];
      const filePath = path.join(this.config.statusDirectory, latestFile);
      const content = await fs.readFile(filePath, 'utf-8');
      const status = JSON.parse(content) as AgentStatus;

      // 更新缓存
      this.statusCache.set(agent, status);

      return status;
    } catch (error) {
      const err = error as Error;
      console.warn(`读取智能体 ${agent} 状态失败:`, err.message);
      return null;
    }
  }

  /**
   * 等待智能体完成（带超时和轮询）
   */
  async waitForCompletion(
    agent: string,
    pollingInterval: number = this.config.checkInterval
  ): Promise<AgentStatus> {
    const startTime = Date.now();
    const timeoutMs = this.config.timeoutSeconds * 1000;

    while (true) {
      const status = await this.getStatus(agent);

      if (status?.status === 'complete') {
        console.log(`✓ 智能体 ${agent} 已完成`);
        return status;
      }

      if (status?.status === 'failed') {
        throw new Error(
          `智能体 ${agent} 失败: ${status.error || '未知错误'}`
        );
      }

      // 检查超时
      const elapsed = Date.now() - startTime;
      if (elapsed >= timeoutMs) {
        throw new Error(
          `等待智能体 ${agent} 超时（${this.config.timeoutSeconds} 秒）`
        );
      }

      // 等待后继续轮询
      await this.sleep(pollingInterval * 1000);
    }
  }

  /**
   * 等待多个智能体完成
   */
  async waitForMultiple(agents: string[]): Promise<AgentStatus[]> {
    try {
      return await Promise.all(agents.map((agent) => this.waitForCompletion(agent)));
    } catch (error) {
      const err = error as Error;
      console.error(`等待多个智能体失败:`, err.message);
      throw error;
    }
  }

  /**
   * 监听智能体状态变化
   */
  watchStatus(agent: string, callback: (status: AgentStatus) => void): void {
    this.on('statusChanged', (status: AgentStatus) => {
      if (status.agent === agent) {
        callback(status);
      }
    });
  }

  /**
   * 清理状态文件
   */
  async cleanup(agent?: string): Promise<void> {
    try {
      if (agent) {
        // 清理特定智能体的状态
        const files = await fs.readdir(this.config.statusDirectory);
        const agentFiles = files.filter((f) => f.startsWith(`${agent}.`));

        for (const file of agentFiles) {
          await fs.unlink(path.join(this.config.statusDirectory, file));
        }

        this.statusCache.delete(agent);
        console.log(`✓ 已清理智能体 ${agent} 的状态`);
      } else {
        // 清理所有状态
        await fs.rm(this.config.statusDirectory, { recursive: true });
        await fs.mkdir(this.config.statusDirectory, { recursive: true });
        this.statusCache.clear();
        console.log(`✓ 已清理所有状态`);
      }
    } catch (error) {
      const err = error as Error;
      console.warn(`清理状态失败:`, err.message);
    }
  }

  /**
   * 获取所有智能体状态
   */
  async getAllStatus(): Promise<Map<string, AgentStatus>> {
    const statusMap = new Map<string, AgentStatus>();

    try {
      const files = await fs.readdir(this.config.statusDirectory);

      for (const file of files) {
        const match = file.match(/^([^.]+)\.(pending|in_progress|complete|failed)$/);
        if (match) {
          const agent = match[1];
          const status = await this.getStatus(agent);
          if (status) {
            statusMap.set(agent, status);
          }
        }
      }
    } catch (error) {
      const err = error as Error;
      console.warn(`读取所有状态失败:`, err.message);
    }

    return statusMap;
  }

  /**
   * 健康检查
   */
  async healthCheck(): Promise<{ healthy: boolean; details: string }> {
    try {
      // 检查状态目录是否可访问
      await fs.access(this.config.statusDirectory);

      // 检查是否可写
      const testFile = path.join(this.config.statusDirectory, '.health-check');
      await fs.writeFile(testFile, 'test');
      await fs.unlink(testFile);

      return { healthy: true, details: '状态管理器运行正常' };
    } catch (error) {
      const err = error as Error;
      return {
        healthy: false,
        details: `状态管理器异常: ${err.message}`,
      };
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// 导出单例实例
let statusManagerInstance: StatusManager | null = null;

export function createStatusManager(config: StatusConfig): StatusManager {
  if (!statusManagerInstance) {
    statusManagerInstance = new StatusManager(config);
  }
  return statusManagerInstance;
}

export function getStatusManager(): StatusManager {
  if (!statusManagerInstance) {
    throw new Error('状态管理器未初始化，请先调用 createStatusManager()');
  }
  return statusManagerInstance;
}