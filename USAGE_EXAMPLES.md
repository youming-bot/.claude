# 🚀 Agents 系统使用示例

## 📋 目录

- [快速开始](#快速开始)
- [完整开发流程](#完整开发流程)
- [实际操作指南](#实际操作指南)
- [最佳实践](#最佳实践)
- [常见问题解答](#常见问题解答)
- [故障排除](#故障排除)

---

## 🚀 快速开始

### 环境准备

```bash
# 1. 克隆或下载 agents 系统
git clone <your-repo>
cd agents

# 2. 查看可用的 agents
ls .claude/agents/

# 3. 阅读主要文档
cat README.md
cat .claude/rules/README.md

# 4. 验证质量门控脚本
.claude/agents/quality-gate.sh --help
```

### 基础使用流程

```bash
# 开发新功能的标准流程
claude -f .claude/agents/system-architect.md    # 架构设计
↓
.claude/agents/quality-gate.sh --scope modified   # 质量检查
↓
claude -f .claude/agents/fullstack-developer.md   # 功能开发
↓
claude -f .claude/agents/code-reviewer.md         # 代码审查
↓
claude -f .claude/agents/unit-test-developer.md   # 单元测试
↓
claude -f .claude/agents/docs-maintainer.md       # 文档更新
```

---

## 🔄 完整开发流程

### 📋 示例场景：用户管理功能开发

假设我们要在一个 Next.js 项目中开发一个用户管理功能，包含以下需求：
- 用户列表展示（分页、搜索、筛选）
- 添加新用户（表单验证）
- 编辑用户信息
- 删除用户
- 用户状态管理

### 第1步：需求分析 → System Architect

**启动方式**：
```bash
claude -f .claude/agents/system-architect.md
```

**输入需求**：
```
我需要开发一个用户管理功能，包含：
- 用户列表展示（分页、搜索、筛选）
- 添加新用户（表单验证）
- 编辑用户信息
- 删除用户
- 用户状态管理

项目技术栈：Next.js 15 + React 19 + TypeScript + Prisma + PostgreSQL
```

**System Architect 输出示例**：
```markdown
# handoff.md
## 架构分析结果

### 项目结构分析
- 项目使用 Next.js 15 + React 19 + TypeScript
- 已有 `@/components/ui` 组件库
- 使用 Prisma + PostgreSQL 数据库
- 现有的 ESLint 和 Prettier 配置

### 推荐实现方案
1. **数据层**：创建 `@/lib/user-service.ts`
2. **API 层**：创建 `@/app/api/users` 路由
3. **组件层**：创建 `@/components/users/UserList.tsx`
4. **页面层**：创建 `@/app/users/page.tsx`

### 任务分解
1. 数据模型和 API 接口
2. 用户列表组件
3. 用户表单组件
4. 页面集成
5. 测试覆盖

### 技术决策
- 使用 React Hook Form 进行表单管理
- 使用 Zod 进行数据验证
- 使用 TanStack Query 进行数据获取
- 遵循现有的 TypeScript 类型定义

### 下游注意事项
- 请使用现有的 UI 组件库
- 遵循项目 ESLint 配置
- 注意 TypeScript 类型安全
- 考虑移动端响应式设计
```

### 第2步：功能开发 → Fullstack Developer

**启动方式**：
```bash
# 运行质量门控（确保开发环境干净）
.claude/agents/quality-gate.sh --scope modified

# 启动 Fullstack Developer
claude -f .claude/agents/fullstack-developer.md
```

**开发过程**：
1. 读取 `handoff.md` 了解架构设计
2. 按照任务分解逐个实现
3. 运行质量门控确保代码质量
4. 更新 `handoff.md` 记录开发进度

**Fullstack Developer 更新 handoff.md**：
```markdown
# handoff.md (继续追加)

## 开发完成情况

### 已实现文件
- `@/types/user.ts` - 用户类型定义
- `@/lib/user-service.ts` - 用户服务层
- `@/app/api/users/route.ts` - 用户 API 路由
- `@/components/users/UserList.tsx` - 用户列表组件
- `@/components/users/UserForm.tsx` - 用户表单组件
- `@/app/users/page.tsx` - 用户页面

### 实现功能
- ✅ 用户列表展示（分页、搜索、筛选）
- ✅ 添加新用户（表单验证）
- ✅ 编辑用户信息
- ✅ 删除用户
- ✅ 用户状态管理

### 验证执行
- 运行 `pnpm build` 构建成功
- 运行 `pnpm lint` 通过检查
- TypeScript 类型检查通过
- 手动测试基本功能正常

### 技术实现
- 使用 React Hook Form 管理表单状态
- 使用 Zod 进行客户端和服务器端验证
- 使用 TanStack Query 管理数据状态
- 实现了乐观更新和错误处理

### 下游测试重点
- 请重点关注用户表单验证逻辑
- 测试用户列表的搜索和筛选功能
- 验证 API 的错误处理
- 测试分页功能的边界情况
```

### 第3步：代码审查 → Code Reviewer

**启动方式**：
```bash
claude -f .claude/agents/code-reviewer.md
```

**审查过程**：
1. 检查 git 状态和变更文件
2. 验证代码质量和规范
3. 检查是否符合项目标准
4. 运行质量门控
5. 提供审查反馈

**Code Reviewer 输出示例**：
```markdown
# handoff.md (继续追加)

## 代码审查结果

### 审查范围
- 变更文件：7 个
- 新增代码：约 500 行
- 删除代码：约 20 行

### 审查发现

#### ✅ 优秀实践
- TypeScript 类型定义完整
- 组件结构清晰，职责单一
- 错误处理完善
- 使用了现代 React 最佳实践

#### ⚠️ 需要改进
1. **UserList.tsx 第 85 行**：缺少加载状态处理
2. **user-service.ts 第 120 行**：错误消息可以更具体
3. **UserForm.tsx 第 45 行**：表单验证错误提示不清晰

#### 🔧 建议修复
- 添加加载状态和骨架屏
- 改进错误消息的用户友好性
- 增强表单验证的实时反馈

### 审查结论
- 代码质量：⭐⭐⭐⭐☆ (4/5)
- 测试覆盖：⭐⭐⭐☆☆ (3/5)
- 文档完整性：⭐⭐⭐⭐☆ (4/5)

### 决定
**条件通过** - 建议在测试阶段重点关注上述问题
```

### 第4步：单元测试 → Unit Test Developer

**启动方式**：
```bash
claude -f .claude/agents/unit-test-developer.md
```

**测试过程**：
1. 读取 `handoff.md` 了解功能重点
2. 为每个模块创建单元测试
3. 确保测试覆盖率达标
4. 更新 `handoff.md` 记录测试情况

**Unit Test Developer 更新 handoff.md**：
```markdown
# handoff.md (继续追加)

## 测试覆盖情况

### 单元测试文件
- `test/unit/lib/user-service.test.ts` - 用户服务测试
- `test/unit/components/users/UserList.test.tsx` - 用户列表测试
- `test/unit/components/users/UserForm.test.tsx` - 用户表单测试

### 测试统计
- 总体测试用例：85 个
- 通过率：100%
- 覆盖率：94%
- 执行时间：2.3 秒

### 测试覆盖的功能
- ✅ 用户数据 CRUD 操作
- ✅ 表单验证逻辑
- ✅ 组件渲染和交互
- ✅ 错误处理场景
- ✅ 边界情况测试

### 发现的问题
1. **UserList 组件**：缺少空状态的测试
2. **UserForm 组件**：异步提交的测试不够完善
3. **user-service**：网络错误的模拟测试缺失

### 性能测试
- 大数据量渲染测试通过
- 内存泄漏检测通过
- 组件卸载清理正常

### 集成测试建议
- 建议测试完整的用户注册流程
- 验证用户列表的分页功能
- 测试并发请求的处理
```

### 第5步：集成测试 → Integration Test Developer

**启动方式**：
```bash
claude -f .claude/agents/integration-test-developer.md
```

**集成测试过程**：
1. 创建端到端测试用例
2. 测试跨模块集成
3. 验证用户流程
4. 测试性能和安全性

**Integration Test Developer 更新 handoff.md**：
```markdown
# handoff.md (继续追加)

## 集成测试结果

### 端到端测试
- `test/integration/user-management.test.ts` - 用户管理流程测试
- `test/integration/api-endpoints.test.ts` - API 端点测试

### 测试场景
- ✅ 用户注册 → 登录 → 管理用户完整流程
- ✅ 用户列表的分页、搜索、筛选功能
- ✅ 表单验证和错误处理
- ✅ 权限控制和安全性测试
- ✅ 浏览器兼容性测试

### 性能测试
- 页面加载时间：< 2 秒
- API 响应时间：< 500ms
- 并发用户支持：100+ 用户

### 安全测试
- SQL 注入防护：✅ 通过
- XSS 防护：✅ 通过
- CSRF 防护：✅ 通过
- 输入验证：✅ 通过

### 兼容性测试
- Chrome/Edge/Firefox/Safari：✅ 通过
- 移动端响应式：✅ 通过
- 屏幕阅读器支持：✅ 通过
```

### 第6步：文档更新 → Docs Maintainer

**启动方式**：
```bash
claude -f .claude/agents/docs-maintainer.md
```

**文档更新过程**：
1. 更新 API 文档
2. 更新组件文档
3. 更新用户指南
4. 创建部署文档

**Docs Maintainer 最终输出**：
```markdown
# handoff.md (最终版本)

## 项目交付完成

### 完整的文档
- `docs/api/users.md` - 用户 API 文档
- `docs/components/user-list.md` - 用户列表组件文档
- `docs/components/user-form.md` - 用户表单组件文档
- `docs/deployment.md` - 部署指南
- `docs/troubleshooting.md` - 故障排除指南

### 用户指南
- 开发者入门指南
- 功能使用说明
- API 调用示例
- 常见问题解答

### 部署就绪
- Docker 配置完成
- CI/CD 流程配置
- 环境变量文档
- 监控和日志配置

### 项目统计
- 代码行数：2,347 行
- 测试覆盖率：94%
- 文档完整度：100%
- 性能指标：全部达标

### 后续支持
- 联系方式：开发团队
- 问题反馈：GitHub Issues
- 文档维护：Docs Maintainer
- 技术支持：DevOps Engineer
```

---

## 🛠 实际操作指南

### 日常开发命令

```bash
# 质量门控脚本
.claude/agents/quality-gate.sh --help                 # 查看帮助
.claude/agents/quality-gate.sh --scope modified        # 检查修改的文件
.claude/agents/quality-gate.sh --scope full           # 完整检查
.claude/agents/quality-gate.sh --skip-tests           # 跳过测试

# 启动 agents
claude -f .claude/agents/system-architect.md          # 架构设计
claude -f .claude/agents/fullstack-developer.md       # 功能开发
claude -f .claude/agents/code-reviewer.md             # 代码审查
claude -f .claude/agents/unit-test-developer.md       # 单元测试
claude -f .claude/agents/integration-test-developer.md # 集成测试
claude -f .claude/agents/docs-maintainer.md           # 文档更新
claude -f .claude/agents/devops-engineer.md           # DevOps 支持
```

### 创建和更新 handoff.md

```bash
# 创建新的 handoff.md
cat > handoff.md << 'EOF'
## 任务概述
- 任务名称：用户管理功能开发
- 优先级：高
- 截止日期：2024-01-15

## 技术要求
- 技术栈：Next.js 15 + React 19 + TypeScript
- 性能要求：页面加载 < 2秒
- 安全要求：符合 OWASP 标准

## 任务分解
1. 数据模型设计
2. API 接口开发
3. 前端组件开发
4. 集成测试
5. 文档编写
EOF

# 添加到 handoff.md
echo "## 开发进度
- ✅ 数据模型设计
- ✅ API 接口开发
- 🔄 前端组件开发 (进行中)
- ⏳ 集成测试
- ⏳ 文档编写" >> handoff.md
```

### 团队协作脚本

```bash
#!/bin/bash
# team-workflow.sh - 团队开发流程脚本

# 创建开发任务
create_task() {
    local task_name=$1
    local assignee=$2
    
    echo "创建任务: $task_name"
    echo "分配给: $assignee"
    echo "创建时间: $(date)"
    
    # 创建任务目录
    mkdir -p "tasks/$task_name"
    
    # 创建初始 handoff.md
    cat > "tasks/$task_name/handoff.md" << EOF
## 任务概述
- 任务名称: $task_name
- 分配给: $assignee
- 创建时间: $(date)
- 状态: 待开始

## 任务要求
- 遵循项目编码规范
- 包含完整的测试
- 提供详细的文档

## 下一步
1. 分析需求 (System Architect)
2. 功能开发 (Fullstack Developer)
3. 代码审查 (Code Reviewer)
4. 测试覆盖 (Unit Test Developer)
5. 文档更新 (Docs Maintainer)
EOF
    
    echo "任务已创建: tasks/$task_name/"
}

# 运行质量门控
run_quality_gate() {
    echo "运行质量门控..."
    .claude/agents/quality-gate.sh --scope modified
    
    if [ $? -eq 0 ]; then
        echo "✅ 质量门控通过"
    else
        echo "❌ 质量门控失败"
        exit 1
    fi
}

# 示例使用
create_task "用户管理功能" "开发团队"
run_quality_gate
```

---

## 🎯 最佳实践

### 1. Agent 选择指南

| 开发阶段 | 推荐的 Agent | 使用场景 |
|----------|-------------|----------|
| **需求分析** | System Architect | 新功能、架构设计、技术选型 |
| **功能开发** | Fullstack Developer | 具体功能实现、Bug 修复 |
| **代码审查** | Code Reviewer | 代码质量检查、规范验证 |
| **单元测试** | Unit Test Developer | 组件测试、服务测试 |
| **集成测试** | Integration Test Developer | 端到端测试、跨模块测试 |
| **文档更新** | Docs Maintainer | API 文档、用户指南 |
| **DevOps** | DevOps Engineer | 依赖管理、CI/CD、部署 |
| **大型分析** | Gemini Analyzer | 代码库分析、架构审查 |

### 2. handoff.md 最佳实践

```markdown
# handoff.md 标准模板

## 任务基本信息
- 任务名称：[清晰的任务名称]
- 任务类型：[新功能/Bug修复/重构/优化]
- 优先级：[高/中/低]
- 截止日期：[YYYY-MM-DD]

## 技术要求
### 技术栈
- 前端框架：[React/Vue/Angular等]
- 后端技术：[Node.js/Python/Java等]
- 数据库：[PostgreSQL/MySQL/MongoDB等]
- 其他技术：[其他依赖项]

### 性能要求
- 响应时间：< [具体时间]
- 并发用户：[具体数量]
- 内存使用：< [具体限制]

### 安全要求
- 认证方式：[JWT/OAuth等]
- 数据加密：[加密方式]
- 权限控制：[权限模型]

## 任务分解
1. [步骤1]: [具体描述]
2. [步骤2]: [具体描述]
3. [步骤3]: [具体描述]

## 完成情况
### 已完成
- ✅ [已完成项目1]
- ✅ [已完成项目2]

### 进行中
- 🔄 [进行中项目]
  - 进度：[百分比]
  - 预计完成：[时间]

### 待开始
- ⏳ [待开始项目]
  - 计划开始：[时间]
  - 预估工作量：[时间]

## 质量检查
### 代码质量
- ESLint 检查：[通过/失败]
- TypeScript 检查：[通过/失败]
- 构建测试：[通过/失败]

### 测试覆盖
- 单元测试覆盖率：[百分比]%
- 集成测试覆盖率：[百分比]%
- 端到端测试覆盖率：[百分比]%

### 性能测试
- 页面加载时间：[时间]
- API 响应时间：[时间]
- 内存使用：[大小]

## 问题记录
### 已解决问题
1. [问题描述] - [解决方案] - [解决时间]

### 待解决问题
1. [问题描述] - [影响程度] - [计划解决时间]

## 下游注意事项
- 需要重点关注：[具体事项]
- 潜在风险：[风险描述]
- 依赖关系：[依赖项]

## 后续计划
- [下一步计划]
- [后续优化]
- [长期规划]
```

### 3. 质量门控使用时机

```bash
# 开发阶段
.claude/agents/quality-gate.sh --scope modified     # 每次提交前
.claude/agents/quality-gate.sh --scope full        # 发布前

# 测试阶段
.claude/agents/quality-gate.sh --scope full        # 测试环境部署
.claude/agents/quality-gate.sh --skip-tests        # 快速检查

# 生产阶段
.claude/agents/quality-gate.sh --scope full        # 生产部署前
```

### 4. 团队协作模式

#### 🔄 顺序模式
```bash
# 标准开发流程
System Architect → Fullstack Developer → Code Reviewer → Unit Test Developer → Docs Maintainer
```

#### ⚡ 并行模式
```bash
# 大型项目的并行开发
System Architect → [Fullstack Developer A, Fullstack Developer B] → Code Reviewer → [Unit Test Developer A, Unit Test Developer B] → Docs Maintainer
```

#### 🔄 迭代模式
```bash
# 敏捷开发迭代
Day 1: System Architect + Fullstack Developer (规划 + 开发)
Day 2: Fullstack Developer + Code Reviewer (开发 + 审查)
Day 3: Unit Test Developer + Integration Test Developer (测试)
Day 4: Docs Maintainer + Code Reviewer (文档 + 最终审查)
```

### 5. 效率提升技巧

#### 📝 模板化
```bash
# 创建常用任务模板
mkdir -p templates
cat > templates/feature-development.md << 'EOF'
## 功能开发模板
- 任务类型：新功能开发
- 标准流程：System Architect → Fullstack Developer → Code Reviewer → Unit Test Developer → Docs Maintainer
- 质量要求：代码覆盖率 > 90%，性能达标
- 文档要求：完整的 API 文档和用户指南
EOF
```

#### 🔄 自动化
```bash
# 自动化脚本示例
#!/bin/bash
# auto-quality-check.sh

# 自动运行质量检查
echo "开始自动质量检查..."
.claude/agents/quality-gate.sh --scope modified

if [ $? -eq 0 ]; then
    echo "✅ 质量检查通过"
    # 可以自动提交或触发 CI/CD
else
    echo "❌ 质量检查失败"
    # 发送通知或阻止提交
fi
```

#### 📊 监控和报告
```bash
# 生成开发报告
generate_report() {
    echo "生成开发报告..."
    echo "项目: $(basename $(pwd))"
    echo "时间: $(date)"
    echo "代码行数: $(find . -name "*.ts" -o -name "*.tsx" | xargs wc -l | tail -1)"
    echo "测试覆盖率: $(npm test -- --coverage --silent | grep "All files" | awk '{print $3}')"
}
```

---

## ❓ 常见问题解答

### Q1: 如何选择合适的 Agent？

**A**: 根据你的任务类型选择：
- **新功能开发**：System Architect → Fullstack Developer
- **Bug 修复**：Fullstack Developer → Code Reviewer
- **代码重构**：System Architect → Fullstack Developer → Code Reviewer
- **测试补充**：Unit Test Developer → Integration Test Developer
- **文档更新**：Docs Maintainer

### Q2: 什么时候需要创建 handoff.md？

**A**: 在以下情况下创建：
- 开始新任务时
- 任务从一个 agent 转移到另一个 agent 时
- 需要记录重要决策和进展时
- 团队成员之间交接工作时

### Q3: 质量门控失败怎么办？

**A**: 按以下步骤处理：
1. 查看错误日志，了解失败原因
2. 修复对应的问题
3. 重新运行质量门控
4. 如果是配置问题，更新 `.claude/rules/` 中的相关规则

### Q4: 如何处理 Agent 之间的意见分歧？

**A**: 
1. 在 handoff.md 中记录不同意见
2. 提供具体的技术理由
3. 寻求 System Architect 的最终决策
4. 更新相关规则以避免未来的分歧

### Q5: 如何自定义 Agents？

**A**: 
1. 复制现有的 agent 文件作为模板
2. 修改 frontmatter 中的配置
3. 调整职责边界和工作流程
4. 更新 README.md 和相关文档

### Q6: 如何集成到现有的 CI/CD 流程？

**A**: 
```yaml
# .github/workflows/agents-quality-gate.yml
name: Agents Quality Gate
on: [push, pull_request]

jobs:
  quality-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Quality Gate
        run: ./.claude/agents/quality-gate.sh --scope full
```

---

## 🔧 故障排除

### 常见问题

#### 1. Agent 无法启动
```bash
# 检查 agent 文件是否存在
ls -la .claude/agents/

# 检查文件权限
chmod +x .claude/agents/quality-gate.sh

# 检查 Claude 配置
claude --version
```

#### 2. 质量门控脚本失败
```bash
# 查看详细错误信息
.claude/agents/quality-gate.sh --scope full --verbose

# 检查依赖项
which pnpm
which node

# 重新安装依赖
pnpm install
```

#### 3. Handoff 丢失
```bash
# 从 git 恢复
git log --oneline -10
git show HEAD~1:handoff.md

# 重新创建
cat > handoff.md << 'EOF'
## 任务恢复
- 恢复时间: $(date)
- 恢复原因: handoff.md 文件丢失
- 建议行动: 重新开始当前任务
EOF
```

#### 4. 规则冲突
```bash
# 检查规则文件
cat .claude/rules/README.md

# 查找冲突的规则
grep -r "conflict" .claude/rules/

# 更新规则
echo "## 规则更新" >> .claude/rules/README.md
```

### 调试技巧

#### 1. 启用详细日志
```bash
# 在 agent 文件中添加调试信息
echo "DEBUG: Starting agent execution..."
echo "DEBUG: Current directory: $(pwd)"
echo "DEBUG: Git status: $(git status --porcelain)"
```

#### 2. 检查环境变量
```bash
# 检查相关环境变量
echo $CLAUDE_HOME
echo $PROJECT_ROOT
echo $QUALITY_GATE_SCOPE
```

#### 3. 测试单个组件
```bash
# 测试特定的质量检查
pnpm lint
pnpm type-check
pnpm test
```

### 性能优化

#### 1. 缓存优化
```bash
# 清理缓存
rm -rf node_modules/.cache
rm -rf .next

# 重新安装
pnpm install
```

#### 2. 并行执行
```bash
# 并行运行多个 agents
claude -f .claude/agents/unit-test-developer.md &
claude -f .claude/agents/integration-test-developer.md &
wait
```

---

## 📚 总结

这个 agents 系统提供了一个完整的企业级开发工作流程：

### 🎯 核心优势
- **专业化分工**: 每个 agent 专注于特定领域
- **质量保证**: 通过质量门控和代码审查确保代码质量
- **可扩展性**: 易于添加新的 agents 和规则
- **团队协作**: 清晰的 handoff 机制和责任边界

### 🚀 使用建议
1. **从小开始**: 先从简单的功能开发开始
2. **遵循流程**: 严格按照 agents 的顺序执行
3. **重视质量**: 每个阶段都要运行质量门控
4. **持续改进**: 根据团队反馈优化流程

### 💡 成功关键
- **清晰的沟通**: 通过 handoff.md 保持信息透明
- **严格的质量控制**: 不跳过任何质量检查
- **灵活的调整**: 根据项目特点调整 agents 使用策略
- **持续学习**: 不断优化工作流程和工具

通过这个系统，你可以建立一个高效、专业、可维护的软件开发流程！

---

## 📞 支持和反馈

如果在使用过程中遇到问题或有改进建议，请：
1. 查看本文档的故障排除部分
2. 检查 `.claude/rules/` 中的相关规则
3. 与团队成员交流经验和最佳实践
4. 根据项目需求调整 agents 配置

*最后更新时间：$(date)*