# 🚀 Agents 系统使用指南

一份高效、规范的 AI Agent 协作开发手册。

## 📋 快速导航

- [⚡ 快速开始](#-快速开始)
- [🌊 核心工作流](#-核心工作流)
- [🛠️ 实用工具与命令](#-实用工具与命令)
- [🎯 最佳实践](#-最佳实践)
- [❓ 常见问题](#-常见问题)
- [🔧 故障排查](#-故障排查)

---

## ⚡ 快速开始

### 1. 环境准备

确保你的开发环境中已安装以下工具：

- `git`: 用于版本控制。
- `claude`: AI Agent 的命令行启动器。
- `node` / `pnpm`: (如果适用) 用于项目依赖管理和脚本执行。

### 2. 5分钟上手

体验一次标准的“架构设计 → 功能开发 → 质量检查”流程。

```bash
# 1. 克隆项目仓库
git clone <your-repo>
cd agents

# 2. 查看可用的 Agents
ls .claude/agents/

# 3. 执行标准开发流程
# 第一步：架构师 Agent 进行系统设计
claude -f .claude/agents/system-architect.md

# 第二步：开发者 Agent 根据设计稿进行功能开发
claude -f .claude/agents/fullstack-developer.md

# 第三步：代码审查，确保代码质量
claude -f .claude/agents/code-reviewer.md

```

### 3. 核心概念

- **Agent**: 一个专门处理特定开发任务（如架构设计、编码、测试）的 AI 实体。
- **`handoff.md`**: Agent 之间交接工作的核心文档，记录任务状态、产出和上下文。

---

## 🌊 核心工作流

标准的开发流程遵循“分而治之”的原则，每个环节由最专业的 Agent 负责。

```mermaid
graph LR
    A[需求分析] --> B(架构设计);
    B --> C(功能开发);
    C --> D(代码审查);
    D --> E(单元测试);
    E --> F(集成测试);
    F --> G(文档更新);
```

### 1. 系统架构设计 (System Architect)

**目标**：将产品需求转化为清晰的技术蓝图和任务列表。

```bash
# 启动架构师 Agent
claude -f .claude/agents/system-architect.md
```

**输入示例**：

```
"设计一个用户管理模块，需要支持用户的增删改查、分页和搜索功能。技术栈采用 Next.js 和 TypeScript。"
```

**输出**：生成或更新 `handoff.md`，包含模块划分、API 设计和任务分解。

### 2. 功能开发 (Fullstack Developer)

**目标**：根据 `handoff.md` 中的设计，实现具体功能。

```bash
# 启动开发者 Agent
claude -f .claude/agents/fullstack-developer.md
```

**核心任务**：

- 实现数据模型和类型定义。
- 开发后端 API 接口。
- 构建前端 UI 组件和页面。

### 3. 代码审查 (Code Reviewer)

**目标**：识别代码中的潜在问题，确保代码质量、性能和安全性。

```bash
# 启动代码审查 Agent
claude -f .claude/agents/code-reviewer.md
```

### 4. 测试覆盖 (Unit/Integration Test Developer)

**目标**：为新功能编写单元测试和集成测试，确保代码的稳定性和可靠性。

```bash
# 启动单元测试 Agent
claude -f .claude/agents/unit-test-developer.md

# 启动集成测试 Agent
claude -f .claude/agents/integration-test-developer.md
```

### 5. 文档更新 (Docs Maintainer)

**目标**：更新项目文档，确保其与最新代码保持同步。

```bash
# 启动文档维护 Agent
claude -f .claude/agents/docs-maintainer.md
```

---

## 🛠️ 实用工具与命令

### 代码审查

使用代码审查 Agent 来确保代码质量。

```bash
# 启动代码审查 Agent
claude -f .claude/agents/code-reviewer.md
```

### 手动创建 `handoff.md`

在开始一个新任务或需要手动介入时，使用此命令快速生成交接文档。

```bash
# 创建一个标准的 handoff.md 文件
cat > handoff.md << 'EOF'
## 任务概述
- **任务名称**：用户管理功能开发
- **优先级**：高
- **截止日期**：2024-01-15

## 技术要求
- **技术栈**：Next.js 15, React 19, TypeScript
- **性能指标**：页面加载时间 < 2s
- **安全标准**：遵循 OWASP Top 10

## 任务分解
1. [ ] 数据模型设计
2. [ ] API 接口开发
3. [ ] 前端组件开发
4. [ ] 集成测试
5. [ ] 文档编写
EOF
```

---

## 🎯 最佳实践

### Agent 选择策略

| 任务类型       | 推荐流程                                                     | 说明                       |
| :------------- | :----------------------------------------------------------- | :------------------------- |
| **新功能开发** | `System Architect` → `Fullstack Developer` → `Code Reviewer` | 标准、完整的开发流程。     |
| **Bug 修复**   | `Fullstack Developer` → `Code Reviewer`                      | 快速定位问题并修复。       |
| **代码重构**   | `System Architect` → `Fullstack Developer` → `Code Reviewer` | 确保重构不偏离架构目标。   |
| **补充测试**   | `Unit Test Developer` → `Integration Test Developer`         | 提升代码库的测试覆盖率。   |
| **文档维护**   | `Docs Maintainer`                                            | 保持文档的实时性和准确性。 |

### `handoff.md` 编写标准

一份高质量的 `handoff.md` 是 Agent 高效协作的关键。

```markdown
## 任务基本信息

- **任务名称**：[清晰的任务标题]
- **任务类型**：[新功能 / Bug修复 / 重构 / 优化]
- **优先级**：[高 / 中 / 低]
- **截止日期**：[YYYY-MM-DD]

## 技术与设计要求

- **技术栈**：[明确的技术选型]
- **性能要求**：[可量化的性能指标]
- **安全要求**：[需遵循的安全标准]

## 任务分解与状态

- [x] **已完成**: [描述已完成的工作]
- [ ] **进行中**: [描述当前正在进行的工作]
- [ ] **待开始**: [描述下一步计划]

## 下游协作须知

- **重点关注**：[需要下游 Agent 特别注意的事项]
- **潜在风险**：[可能遇到的问题或挑战]
- **依赖关系**：[任务的前置或后置依赖]
```

### 团队协作模式

- **顺序模式 (推荐)**: `A -> B -> C`，任务按顺序在 Agent 间流转，流程清晰。
- **并行模式 (大型项目)**: `A -> [B, C] -> D`，架构师分解任务后，由多个开发 Agent 并行处理不同模块。
- **迭代模式 (敏捷开发)**: `(A+B) -> (B+C) -> D`，在短周期内快速迭代，多个 Agent 紧密协作。

---

## ❓ 常见问题

**Q1: 如何为我的任务选择正确的 Agent？**
**A**: 参考 [Agent 选择策略](#agent-选择策略) 表格，根据任务类型（如新功能、Bug修复）选择推荐的流程。

**Q2: `handoff.md` 应该在什么时候创建或更新？**
**A**: 在新任务开始时、任务在 Agent 间交接时、或有重要技术决策需要记录时。

**Q3: 代码审查发现问题怎么办？**
**A**: 首先，仔细阅读代码审查 Agent 的反馈和建议。然后，根据反馈进行必要的修改。最后，可以重新运行代码审查 Agent 进行验证。

**Q4: 如何将代码审查集成到 CI/CD 流程？**
**A**: 在你的 CI/CD 配置文件（如 `.github/workflows/main.yml`）中添加一个步骤，用于执行代码审查。

```yaml
# .github/workflows/code-review.yml
name: Code Review
on: [push, pull_request]
jobs:
  code-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Code Review
        run: claude -f .claude/agents/code-reviewer.md
```

---

## 🔧 故障排查

**问题：Agent 无法启动**

- **检查文件路径**：确保 `.claude/agents/` 目录下的 Agent 定义文件存在。
- **检查 `claude` 工具**：运行 `claude --version` 确认工具已正确安装。

**问题：代码审查发现问题**

- **查看详细反馈**：仔细阅读代码审查 Agent 的反馈和建议。
- **检查环境依赖**：确认 `pnpm`, `node` 等所需工具已安装且版本正确。
- **重新安装依赖**：尝试删除 `node_modules` 和缓存，然后重新运行 `pnpm install`。

---

## 📚 总结

### 核心优势

- **专业分工**: 每个 Agent 聚焦于特定领域，提升产出质量。
- **质量内建**: 专业的代码审查 Agent 确保了代码的健壮性。
- **高度可扩展**: 可以方便地定义新的 Agent 和规则以适应不同项目的需求。
- **高效协作**: `handoff.md` 机制确保了信息在不同角色间无损流转。

### 成功关键

- **清晰的沟通**: 保持 `handoff.md` 的高质量和实时性。
- **严格的代码审查**: 确保每次代码变更都经过专业审查。
- **灵活的流程**: 根据项目规模和阶段，灵活调整 Agent 的使用策略。

---

## 📞 支持与反馈

如果遇到问题或有改进建议，请联系团队或在项目中提出 Issue。

_本文档为动态更新的指南，请以最新版本为准。_
