# Claude AI Agent Development Framework

A structured software development framework based on Claude AI, implementing complete software development lifecycle management through multi-role collaboration.

## 🚀 Features

- **Multi-role Collaboration**: 7 specialized AI development roles
- **Structured Process**: Complete development flow from requirements to deployment
- **Quality Control**: Strict 3-attempt failure stop principle
- **Bilingual Processing**: English for internal processing, Chinese for outputs
- **Test-Driven**: Emphasis on TDD methodology
- **Reversible Design**: All technical decisions consider reversibility
- **MCP Integration**: Built-in Model Context Protocol (MCP) servers for enhanced capabilities

### MCP Servers Enabled

The framework includes pre-configured MCP servers to enhance development capabilities:

- **Context7**: Enhanced context management for complex development scenarios
- **Sequential Thinking**: Structured reasoning and problem-solving
- **Chrome DevTools**: Browser debugging and web development tools

## 📁 Project Structure

```
.claude/
├── CLAUDE.md              # Core development guidelines
├── mcp_settings.json       # MCP servers configuration
├── idea.txt               # Project requirements input
├── run.json               # Workflow configuration
└── agents/                # AI role definitions
    ├── architect.md      # System Architect
    ├── coder.md          # TDD Developer
    ├── deployer.md       # Cloudflare Deployment Specialist
    ├── product.md        # Product Manager
    ├── reviewer.md       # Code Reviewer
    ├── tester.md         # QA Engineer
    └── writer.md         # Technical Writer

output/                   # Working output directory (project root)
├── arch/                # Architecture design
├── deploy/              # Deployment configs
├── docs/                # Project documentation
├── prd/                 # Product requirements
├── review/              # Review reports
├── src/                 # Source code
└── tests/               # Test files
```

## 🎯 Agent Roles

1. **Product Manager**: Requirements breakdown and acceptance criteria
2. **System Architect**: Technical selection and architecture design
3. **TDD Developer**: Test-driven development and code implementation
4. **Cloudflare Deployment Specialist**: Deployment configuration and optimization
5. **QA Engineer**: Test case writing and quality assurance
6. **Technical Writer**: Project documentation and user guides
7. **Code Reviewer**: Quality control and refactoring suggestions

### Core Components

- **System Reminder**: Enforces quality gates and constraints across all agents

## 📋 Development Process

1. **Planning & Staging**: Break complex work into 3-5 stages
2. **Understand Existing Code**: Study patterns in the codebase
3. **Test-Driven**: Write tests first, then implement features
4. **Refactor**: Clean up code with tests passing
5. **Quality Gates**: Ensure every commit meets standards

## 🛠️ Usage

### Quick Start

1. **Describe Requirements**: Edit `idea.txt` with your project requirements
2. **Configure Workflow**: Adjust agent sequence in `run.json` if needed
3. **Run Development**: Execute the framework to start automated development
4. **Review Output**: Check generated files in the `output/` directory

### Example Workflow

```bash
# Edit project requirements
vim .claude/idea.txt

# Run the agent system
claude-code run

# View results
ls -la output/
```

### Agent Flow

The agents execute in sequence:
1. **Product** → **Architect** → **Coder** → **Deployer** → **Tester** → **Writer** → **Reviewer**

## 📖 Core Principles

- **Incremental Progress**: Small steps, every commit works
- **Learn from Existing Code**: Study patterns before implementing
- **Pragmatic Over Dogmatic**: Adapt to project reality
- **Clear Intent Over Clever Code**: Be boring and obvious

## ⚠️ Important Reminders

### Quality Gates
- Maximum 3 attempts per issue, then stop and reassess
- Never disable tests, always fix them
- Every commit must compile and pass all tests
- Follow project formatting and linting rules

### System Constraints
- **Bilingual Processing**: English for internal, Chinese for external
- **Reversible Design**: All technical decisions must be reversible
- **TDD First**: Write tests before implementation
- **Incremental Progress**: Small, working changes only

## 📝 License

This project is licensed under the MIT License.
