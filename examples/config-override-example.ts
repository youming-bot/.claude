/**
 * 配置覆盖示例
 * 演示如何使用不同项目类型的配置覆盖
 */

import config from '../config.json';

// ============================================
// 示例 1: 原型项目 - 宽松约束
// ============================================
console.log('📦 示例 1: 原型项目配置');
console.log('─'.repeat(60));

const prototypeConfig = {
  ...config,
  projectType: 'prototype',
};

// 应用原型项目覆盖
const prototypeOverrides = config.overrides.byProjectType.prototype;
console.log('原型项目覆盖:');
console.log(`  - 最大函数行数: ${prototypeOverrides['coder.maxFunctionLines']} 行（默认: 40）`);
console.log(`  - 最低测试覆盖率: ${prototypeOverrides['coder.testCoverageMinimum']}%（默认: 80%）`);
console.log(`  - 性能目标 RPS: ${prototypeOverrides['tester.performance.targetRPS']}（默认: 500）`);
console.log('\n适用场景: 快速原型验证，MVP 开发\n');

// ============================================
// 示例 2: 企业项目 - 严格约束
// ============================================
console.log('🏢 示例 2: 企业项目配置');
console.log('─'.repeat(60));

const enterpriseConfig = {
  ...config,
  projectType: 'enterprise',
};

const enterpriseOverrides = config.overrides.byProjectType.enterprise;
console.log('企业项目覆盖:');
console.log(`  - 最大函数行数: ${enterpriseOverrides['coder.maxFunctionLines']} 行（默认: 40）`);
console.log(`  - 最低测试覆盖率: ${enterpriseOverrides['coder.testCoverageMinimum']}%（默认: 80%）`);
console.log(`  - 性能目标 RPS: ${enterpriseOverrides['tester.performance.targetRPS']}（默认: 500）`);
console.log(`  - 安全扫描: ${enterpriseOverrides['deployer.validation.requireSecurityScan'] ? '必需' : '可选'}`);
console.log('\n适用场景: 生产级应用，关键业务系统\n');

// ============================================
// 示例 3: 微服务项目 - 高性能约束
// ============================================
console.log('🔧 示例 3: 微服务项目配置');
console.log('─'.repeat(60));

const microserviceConfig = {
  ...config,
  projectType: 'microservice',
};

const microserviceOverrides = config.overrides.byProjectType.microservice;
console.log('微服务项目覆盖:');
console.log(`  - 最大函数行数: ${microserviceOverrides['coder.maxFunctionLines']} 行（默认: 40）`);
console.log(`  - 性能目标 RPS: ${microserviceOverrides['tester.performance.targetRPS']}（默认: 500）`);
console.log(`  - 最大响应时间: ${microserviceOverrides['tester.performance.maxResponseTimeMs']}ms（默认: 500ms）`);
console.log('\n适用场景: 高并发服务，API 网关\n');

// ============================================
// 示例 4: 运行时动态配置
// ============================================
console.log('⚙️ 示例 4: 运行时动态配置');
console.log('─'.repeat(60));

function getProjectConfig(projectType: string) {
  const baseConfig = config;
  const overrides = (config.overrides.byProjectType as any)[projectType];

  if (!overrides) {
    console.log(`⚠️ 未找到项目类型 "${projectType}" 的覆盖配置，使用默认值`);
    return baseConfig;
  }

  // 应用覆盖
  const mergedConfig = { ...baseConfig };
  for (const [key, value] of Object.entries(overrides)) {
    const keys = key.split('.');
    let current: any = mergedConfig;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  return mergedConfig;
}

// 使用环境变量设置项目类型
const projectType = process.env.PROJECT_TYPE || 'default';
console.log(`当前项目类型: ${projectType}`);

const runtimeConfig = getProjectConfig(projectType);
console.log('运行时配置已加载');
console.log(`  - Coder 最大函数行数: ${runtimeConfig.coder.maxFunctionLines}`);
console.log(`  - Tester 性能目标: ${runtimeConfig.tester.performance.targetRPS} RPS`);
console.log('\n使用方法:');
console.log('  export PROJECT_TYPE=enterprise && npm run agent');
console.log('  export PROJECT_TYPE=prototype && npm run agent');
console.log('  export PROJECT_TYPE=microservice && npm run agent\n');

// ============================================
// 示例 5: 环境变量覆盖
// ============================================
console.log('🌍 示例 5: 环境变量覆盖');
console.log('─'.repeat(60));

console.log('支持的环境变量:');
console.log('  CLAUDE_MAX_FUNCTION_LINES     - 覆盖最大函数行数');
console.log('  CLAUDE_TEST_COVERAGE_MIN      - 覆盖最低测试覆盖率');
console.log('  CLAUDE_PERFORMANCE_TARGET_RPS - 覆盖性能目标 RPS');
console.log('  CLAUDE_LANGUAGE               - 覆盖语言设置（en/zh）');
console.log('  PROJECT_TYPE                  - 设置项目类型\n');

console.log('示例用法:');
console.log('  export CLAUDE_MAX_FUNCTION_LINES=60');
console.log('  export CLAUDE_LANGUAGE=zh');
console.log('  npm run agent\n');

// 读取环境变量
const envOverrides = {
  maxFunctionLines: parseInt(process.env.CLAUDE_MAX_FUNCTION_LINES || '') || config.coder.maxFunctionLines,
  testCoverageMin: parseInt(process.env.CLAUDE_TEST_COVERAGE_MIN || '') || config.coder.testCoverageMinimum,
  performanceTargetRPS: parseInt(process.env.CLAUDE_PERFORMANCE_TARGET_RPS || '') || config.tester.performance.targetRPS,
  language: process.env.CLAUDE_LANGUAGE || config.language.externalCommunication,
};

console.log('当前环境变量覆盖:');
console.log(`  - 最大函数行数: ${envOverrides.maxFunctionLines}`);
console.log(`  - 最低测试覆盖率: ${envOverrides.testCoverageMin}%`);
console.log(`  - 性能目标 RPS: ${envOverrides.performanceTargetRPS}`);
console.log(`  - 语言设置: ${envOverrides.language}\n`);

// ============================================
// 示例 6: 完整配置优先级演示
// ============================================
console.log('🎯 示例 6: 配置优先级演示');
console.log('─'.repeat(60));

function resolveConfig(key: string, defaultValue: any) {
  // 优先级: 环境变量 > 项目类型覆盖 > 默认配置
  const envKey = `CLAUDE_${key.toUpperCase().replace(/\./g, '_')}`;
  
  if (process.env[envKey]) {
    console.log(`✓ ${key} 使用环境变量: ${process.env[envKey]}`);
    return process.env[envKey];
  }

  const projectType = process.env.PROJECT_TYPE;
  if (projectType && (config.overrides.byProjectType as any)[projectType]) {
    const override = (config.overrides.byProjectType as any)[projectType][key];
    if (override !== undefined) {
      console.log(`✓ ${key} 使用项目类型覆盖 (${projectType}): ${override}`);
      return override;
    }
  }

  console.log(`✓ ${key} 使用默认配置: ${defaultValue}`);
  return defaultValue;
}

console.log('解析配置示例:');
resolveConfig('coder.maxFunctionLines', config.coder.maxFunctionLines);
resolveConfig('tester.performance.targetRPS', config.tester.performance.targetRPS);
console.log();

console.log('🎉 配置覆盖示例完成！');