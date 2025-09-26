# Claude AI Agent Development Framework

A structured software development framework based on Claude AI, implementing complete software development lifecycle management through multi-role collaboration.

## 🚀 Features

- **Multi-role Collaboration**: 7 specialized AI development roles
- **Structured Process**: Complete development flow from requirements to deployment
- **Quality Control**: Strict 3-attempt failure stop principle
- **Bilingual Processing**: English for internal processing, Chinese for outputs
- **Test-Driven**: Emphasis on TDD methodology
- **Reversible Design**: All technical decisions consider reversibility

## 📁 Project Structure

```
.claude/
├── CLAUDE.md              # Core development guidelines
├── idea.txt               # Project requirements
├── run.json               # Workflow configuration
├── agents/                # AI role definitions
│   ├── architect.md      # System Architect
│   ├── coder.md          # TDD Developer
│   ├── devops.md         # DevOps Engineer
│   ├── doc-writer.md     # Technical Writer
│   ├── gemini-analyzer.md # Gemini CLI Manager
│   ├── product-owner.md  # Product Owner
│   ├── reviewer.md       # Code Reviewer
│   └── tester.md         # QA Engineer
└── output/               # Working output directory
    ├── arch/            # Architecture design
    ├── deploy/          # Deployment configs
    ├── docs/            # Project documentation
    ├── prd/             # Product requirements
    ├── review/          # Review reports
    ├── src/             # Source code
    └── tests/           # Test files
```

## 🎯 Agent Roles

1. **Product Owner**: Requirements breakdown and acceptance criteria
2. **Architect**: Technical selection and architecture design
3. **Coder**: TDD development and code implementation
4. **Tester**: Test case writing and execution
5. **DevOps Engineer**: Containerization and CI/CD configuration
6. **Technical Writer**: Project documentation and user guides
7. **Code Reviewer**: Quality control and refactoring suggestions

## 📋 Development Process

1. **Planning & Staging**: Break complex work into 3-5 stages
2. **Understand Existing Code**: Study patterns in the codebase
3. **Test-Driven**: Write tests first, then implement features
4. **Refactor**: Clean up code with tests passing
5. **Quality Gates**: Ensure every commit meets standards

## 🛠️ Usage

1. Describe your project requirements in `idea.txt`
2. Adjust the workflow in `run.json` as needed
3. Run the framework to start automated development
4. View generated files in the `output/` directory

## 📖 Core Principles

- **Incremental Progress**: Small steps, every commit works
- **Learn from Existing Code**: Study patterns before implementing
- **Pragmatic Over Dogmatic**: Adapt to project reality
- **Clear Intent Over Clever Code**: Be boring and obvious

## ⚠️ Important Reminders

- Maximum 3 attempts per issue, then stop and reassess
- Never disable tests, always fix them
- Every commit must compile and pass all tests
- Follow project formatting and linting rules

## 📝 License

This project is licensed under the MIT License.
