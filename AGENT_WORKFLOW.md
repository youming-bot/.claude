# Agent Workflow

## Simplified Agent Workflow

### Core Principles
- Simple and easy to use, minimal configuration required
- Dependency management based on file existence
- Unified error handling mechanism
- Multi-platform deployment support

## Agent Specifications

### 1. Product Agent
- **Input**: `.claude/idea.txt` (User requirements)
- **Output**: `output/prd/prd.md` (Product requirements document)
- **Responsibility**: Convert user requirements into structured product requirements

### 2. Architect Agent
- **Input**: `output/prd/prd.md`
- **Output**:
  - `output/arch/arch.md` (Architecture design)
  - `output/arch/IMPLEMENTATION_PLAN.md` (Implementation plan)
- **Responsibility**: Design system architecture and implementation plan

### 3. Coder Agent
- **Input**: `output/arch/arch.md`, `output/arch/IMPLEMENTATION_PLAN.md`
- **Output**: New or modified project code
- **Responsibility**: Implement code based on architecture design and staged implementation plan

### 4. Reviewer Agent
- **Input**: Complete project codebase, `output/arch/arch.md`
- **Output**: `output/feedback/review.md` (Code review report)
- **Responsibility**: Review code quality and architecture compliance

### 5. Tester Agent
- **Input**: Complete project codebase, `output/arch/arch.md`
- **Output**: Test files, `output/feedback/test_report.md`
- **Responsibility**: Write and execute test cases

### 6. Deployer Agent
- **Input**: Complete project codebase
- **Output**: Deployment configuration files, `output/deploy/` (Deployment artifacts)
- **Responsibility**: Select optimal deployment platform and deploy application

### 7. Writer Agent
- **Input**: All output documents and project source code
- **Output**: `output/docs/README.md` (Main documentation)
- **Responsibility**: Generate user documentation and technical documentation

## Workflow Diagram

```
.claude/.idea.txt → Product → Architect → Coder
                       ↓                      ↓
                    Reviewer               Tester
                       ↓                      ↓
                       Writer ←─────────── Deployer
```

## Parallel Execution

### Sequential Phase
1. **Product → Architect → Coder**
   - Core requirements and architecture must be established first

### Parallel Phase
2. **Reviewer, Tester, Deployer** work simultaneously (after Coder completion)
   - Reviewer: Review code quality (depends on Coder)
   - Tester: Write test cases (depends on Coder)
   - Deployer: Prepare deployment configuration (depends on Coder)

3. **Writer** works after Tester and Deployer completion
   - Writer: Generate documentation (depends on Tester & Deployer)

## Dependencies

### Explicit Dependencies
- **Reviewer** → depends on **Coder** (`output/status/coder.complete`)
- **Tester** → depends on **Coder** (`output/status/coder.complete`)
- **Deployer** → depends on **Coder** (`output/status/coder.complete`)
- **Writer** → depends on **Tester** & **Deployer** (`output/status/tester.complete`, `output/status/deployer.complete`)

### Status Synchronization Mechanism
- **Status files**: Create `output/status/{agent}.complete` file after each agent completes
- **Check intervals**: 
  - Reviewer/Tester/Deployer: Check every 5 seconds for rapid iteration
  - Writer: Check every 10 seconds (configurable)
- **Timeout mechanism**: 5-minute timeout, maximum 3 retry attempts

### System Properties
- **Parallel agents**: Judge dependencies based on input file existence and status files
- **Status synchronization**: Coordinate agent execution through status files
- **Error handling**: Simple retry mechanism
- **Quality standards**: Unified quality gate (9.0 target score)

## File Structure

```
.claude/
└── idea.txt                     # User requirements

output/
├── prd/prd.md                   # Product requirements document
├── arch/                        # Architecture design
│   ├── arch.md                  # Architecture document
│   └── IMPLEMENTATION_PLAN.md   # Implementation plan
├── deploy/                      # Deployment configuration
├── docs/README.md               # Project documentation
├── feedback/                    # Feedback reports
│   ├── review.md                # Review report
│   ├── test_report.md           # Test report
│   └── deployment_report.md     # Deployment report
└── status/                      # Agent status files
    ├── product.complete         # Product Agent completion status
    ├── architect.complete       # Architect Agent completion status
    ├── coder.complete           # Coder Agent completion status
    ├── reviewer.complete        # Reviewer Agent completion status
    ├── tester.complete          # Tester Agent completion status
    ├── deployer.complete        # Deployer Agent completion status
    └── writer.complete          # Writer Agent completion status
```
