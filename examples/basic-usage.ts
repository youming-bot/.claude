/**
 * 基本使用示例
 * 演示如何使用改进后的 Agent System
 */

import { createStatusManager } from '../lib/status-manager';
import config from '../config.json';

async function main() {
  console.log('🚀 Agent System 基本使用示例\n');

  // ============================================
  // 1. 初始化状态管理器
  // ============================================
  console.log('📋 步骤 1: 初始化状态管理器');
  
  const statusManager = createStatusManager({
    statusDirectory: config.synchronization.statusDirectory,
    retryAttempts: config.synchronization.retryAttempts,
    timeoutSeconds: config.synchronization.timeoutSeconds,
    checkInterval: config.synchronization.statusCheckInterval,
  });

  await statusManager.initialize();
  console.log('✓ 状态管理器已初始化\n');

  // ============================================
  // 2. 健康检查
  // ============================================
  console.log('📋 步骤 2: 执行健康检查');
  
  const health = await statusManager.healthCheck();
  if (health.healthy) {
    console.log('✓ 系统健康检查通过:', health.details);
  } else {
    console.error('✗ 系统健康检查失败:', health.details);
    process.exit(1);
  }
  console.log();

  // ============================================
  // 3. 模拟 Agent 工作流
  // ============================================
  console.log('📋 步骤 3: 模拟 Agent 工作流\n');

  // Product Agent 开始工作
  console.log('👤 Product Agent 开始工作...');
  await statusManager.setStatus('product', 'in_progress');
  await simulateWork(2000); // 模拟 2 秒工作
  await statusManager.setStatus('product', 'complete', {
    prdGenerated: true,
    stagesCount: 3,
  });
  console.log('✓ Product Agent 完成\n');

  // Architect Agent 等待 Product 完成后开始
  console.log('🏗️ Architect Agent 等待 Product 完成...');
  await statusManager.waitForCompletion('product');
  console.log('✓ 依赖满足，Architect Agent 开始工作...');
  await statusManager.setStatus('architect', 'in_progress');
  await simulateWork(3000); // 模拟 3 秒工作
  await statusManager.setStatus('architect', 'complete', {
    archDocGenerated: true,
    implementationPlanReady: true,
  });
  console.log('✓ Architect Agent 完成\n');

  // Coder Agent 开始实现
  console.log('💻 Coder Agent 开始实现...');
  await statusManager.waitForCompletion('architect');
  await statusManager.setStatus('coder', 'in_progress');
  await simulateWork(5000); // 模拟 5 秒工作
  await statusManager.setStatus('coder', 'complete', {
    filesModified: 15,
    testsAdded: 8,
    coveragePercent: 92,
  });
  console.log('✓ Coder Agent 完成\n');

  // ============================================
  // 4. 并行执行的 Agents
  // ============================================
  console.log('📋 步骤 4: 并行执行 Reviewer, Tester, Deployer\n');

  // 启动并行 Agents
  const parallelAgents = ['reviewer', 'tester', 'deployer'];
  
  for (const agent of parallelAgents) {
    console.log(`⚙️ ${agent} Agent 开始工作...`);
    statusManager.setStatus(agent, 'in_progress').catch(console.error);
  }

  // 模拟并行工作
  await Promise.all([
    (async () => {
      await simulateWork(2000);
      await statusManager.setStatus('reviewer', 'complete', {
        issuesFound: 3,
        qualityScore: 9.2,
      });
      console.log('✓ Reviewer Agent 完成');
    })(),
    (async () => {
      await simulateWork(3000);
      await statusManager.setStatus('tester', 'complete', {
        testsRun: 145,
        testsPassed: 143,
        coveragePercent: 92,
      });
      console.log('✓ Tester Agent 完成');
    })(),
    (async () => {
      await simulateWork(2500);
      await statusManager.setStatus('deployer', 'complete', {
        platform: 'vercel',
        deploymentUrl: 'https://example.vercel.app',
      });
      console.log('✓ Deployer Agent 完成');
    })(),
  ]);

  console.log();

  // ============================================
  // 5. Writer Agent 等待所有依赖
  // ============================================
  console.log('📋 步骤 5: Writer Agent 等待所有依赖\n');
  console.log('📝 Writer Agent 等待 Tester 和 Deployer 完成...');
  
  await statusManager.waitForMultiple(['tester', 'deployer']);
  
  console.log('✓ 所有依赖已满足，Writer Agent 开始工作...');
  await statusManager.setStatus('writer', 'in_progress');
  await simulateWork(3000);
  await statusManager.setStatus('writer', 'complete', {
    docsGenerated: 5,
    readmeUpdated: true,
  });
  console.log('✓ Writer Agent 完成\n');

  // ============================================
  // 6. 查看最终状态
  // ============================================
  console.log('📋 步骤 6: 查看最终状态\n');
  
  const allStatus = await statusManager.getAllStatus();
  console.log('📊 所有 Agent 状态:');
  console.log('─'.repeat(60));
  
  for (const [agent, status] of allStatus) {
    const emoji = status.status === 'complete' ? '✓' : '⚠️';
    console.log(`${emoji} ${agent.padEnd(15)} | ${status.status.padEnd(12)} | ${status.timestamp}`);
    if (status.metadata) {
      console.log(`   元数据: ${JSON.stringify(status.metadata)}`);
    }
  }
  
  console.log('─'.repeat(60));
  console.log();

  // ============================================
  // 7. 清理
  // ============================================
  console.log('📋 步骤 7: 清理状态');
  // await statusManager.cleanup();
  console.log('✓ 状态已保留（取消注释以清理）\n');

  console.log('🎉 示例执行完成！');
}

// 辅助函数：模拟工作
function simulateWork(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 错误处理
main().catch((error) => {
  console.error('❌ 执行失败:', error.message);
  process.exit(1);
});