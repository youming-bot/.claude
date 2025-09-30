# Agent Workflow

## Agent Input/Output Specifications

### 1. Product Agent
- **Input**: User requirements
- **Output**: `output/prd/prd.md`
- **Responsibility**: Generate product requirements document from user requirements

### 2. Architect Agent
- **Input**: `output/prd/prd.md`
- **Output**:
  - `output/arch/arch-tests.md` (Architecture test documentation)
  - `output/arch/arch.md` (Architecture design documentation)
  - `output/IMPLEMENTATION_PLAN.md` (Implementation plan)
- **Responsibility**: Design system architecture and create implementation plan

### 3. Coder Agent
- **Input**:
  - `output/arch/arch.md`
  - `output/IMPLEMENTATION_PLAN.md`
- **Output**: New or modified project code
- **Responsibility**: Implement code based on architecture design and implementation plan

### 4. Tester Agent
- **Input**:
  - `output/arch/arch-tests.md`
  - Complete project codebase
- **Output**: Test files (existing paths unchanged)
- **Responsibility**: Write and execute test cases

### 5. Reviewer Agent
- **Input**:
  - Complete project codebase
  - All output documentation
- **Output**: Review report (existing outputs unchanged)
- **Responsibility**: Review code quality and documentation completeness

### 6. Writer Agent
- **Input**:
  - All output documentation
  - Project source code
- **Output**: `output/docs/` (from frontend, API, architecture, testing, and product perspectives)
- **Responsibility**: Generate user documentation and technical documentation

### 7. Gemini Analyzer
- **Input/Output**: Unchanged
- **Responsibility**: Analyze and optimize code

### 8. Deployer Agent
- **Input**: Complete project codebase
- **Output**: Deployment configuration (outputs unchanged, checking for supplements)
- **Responsibility**: Deploy application and monitor operational status

## Workflow Diagram

```
User Requirements → Product Agent → Architect Agent → Coder Agent
                         ↓                                       ↓
                         └─────── Writer Agent ← Reviewer Agent ←──┘
                                    ↓                ↓
                               Tester Agent ←── Deployer Agent
                                    ↓
                               Gemini Analyzer
```

## File Structure

```
output/
├── prd/
│   └── prd.md                    # Product requirements document
├── arch/
│   ├── arch.md                  # Architecture design document
│   ├── arch-tests.md           # Architecture test document
│   └── IMPLEMENTATION_PLAN.md  # Implementation plan
└── docs/                        # Generated documentation
    ├── frontend/               # Frontend documentation
    ├── api/                    # API documentation
    ├── architecture/           # Architecture documentation
    ├── testing/               # Testing documentation
    └── product/               # Product documentation
```