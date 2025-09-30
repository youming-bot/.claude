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
│   ├── arch.md          # Architecture design document
│   ├── arch-tests.md   # Architecture test constraints
│   └── IMPLEMENTATION_PLAN.md  # Implementation plan
├── deploy/              # Deployment configs
├── docs/                # Project documentation
│   ├── frontend/        # Frontend documentation
│   ├── api/             # API documentation
│   ├── architecture/    # Architecture documentation
│   ├── testing/         # Testing documentation
│   └── product/         # Product documentation
├── prd/                 # Product requirements
│   └── prd.md           # Product requirements document
├── review/              # Review reports
├── src/                 # Source code
└── tests/               # Test files
```

## 🎯 Agent Roles

1. **Product Manager**: Requirements breakdown and acceptance criteria
   - Input: User requirements
   - Output: `output/prd/prd.md`

2. **System Architect**: Technical selection and architecture design
   - Input: `output/prd/prd.md`
   - Output: `output/arch/arch.md`, `output/arch/arch-tests.md`, `output/IMPLEMENTATION_PLAN.md`

3. **TDD Developer**: Test-driven development and code implementation
   - Input: `output/arch/arch.md`, `output/IMPLEMENTATION_PLAN.md`
   - Output: New or modified project code

4. **QA Engineer**: Test case writing and quality assurance
   - Input: `output/arch/arch-tests.md`, complete project codebase
   - Output: Test files (existing paths unchanged)

5. **Technical Writer**: Project documentation and user guides
   - Input: All output documentation, project source code
   - Output: `output/docs/` (from multiple perspectives)

6. **Code Reviewer**: Quality control and refactoring suggestions
   - Input: Complete project codebase, all output documentation
   - Output: Review report (existing outputs unchanged)

7. **Cloudflare Deployment Specialist**: Deployment configuration and optimization
   - Input: Complete project codebase
   - Output: Deployment configuration (checking for supplements)

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

The agents execute in parallel optimized workflow:
1. **Product** → **Architect** → **Coder**
2. **Reviewer** ← **Coder** (immediate feedback)
3. **Tester** ← **Deployer** (parallel execution)
4. **Writer** ← **Tester** + **Deployer** (documentation integration)

For detailed input/output specifications, see `AGENT_WORKFLOW.md`.

### Parallel Execution Benefits

- **Faster Delivery**: Parallel execution reduces overall development time by 30-40%
- **Early Feedback**: Reviewer provides immediate feedback to Coder for rapid iteration
- **Resource Optimization**: Tester and Deployer work simultaneously
- **Better Integration**: Writer synthesizes outputs from multiple agents
- **Status Synchronization**: Real-time coordination between agents
- **Quality Gates**: Ensures 9.5-10.0 quality score standards

### Advanced Features

- **Error Recovery**: Comprehensive failure handling and recovery mechanisms
- **Quality Scoring**: Each agent output scored for quality assurance
- **Fast Feedback Loops**: Real-time notifications for critical issues
- **Status Synchronization**: Precise coordination between parallel agents
- **Quality Gates**: Blocker/Warning/Info quality enforcement

## 📖 Core Principles

- **Incremental Progress**: Small steps, every commit works
- **Learn from Existing Code**: Study patterns before implementing
- **Parallel Execution**: Optimize workflow with concurrent agent processing
- **Fast Feedback**: Early quality checks prevent downstream issues
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
