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

### 7. Deployer Agent
- **Input**: Complete project codebase
- **Output**: Deployment configuration (outputs unchanged, checking for supplements)
- **Responsibility**: Deploy application and monitor operational status

## Workflow Diagram

```
User Requirements → Product Agent → Architect Agent → Coder Agent
                         ↓                                       ↓
                    Reviewer Agent ←──┘         ↓
                         ↓                    Tester Agent ←── Deployer Agent
                         ↓                    ↓
                    Writer Agent ←─────────────┘
```

## Parallel Execution Strategy

### Sequential Phase
1. **Product Agent** → **Architect Agent** → **Coder Agent**
   - Core requirements and architecture must be established first

### Parallel Phase 1
2. **Reviewer Agent** starts reviewing **Coder Agent** output immediately
   - Provides fast feedback loop for code quality issues

### Parallel Phase 2
3. **Tester Agent** and **Deployer Agent** work in parallel
   - Tester: Creates test suites based on code and arch-tests.md
   - Deployer: Prepares deployment configuration based on complete codebase

### Parallel Phase 3
4. **Writer Agent** integrates outputs from **Tester Agent** and **Deployer Agent**
   - Creates comprehensive documentation from all perspectives

### Quality Gates
- Each parallel phase waits for all dependencies to complete
- Fast failure mechanisms prevent downstream work on faulty foundations
- Reviewer Agent can trigger early rework if critical issues found

### Feedback Loops

#### Fast Feedback Loops
- **Reviewer Agent → Coder Agent**: Immediate code quality feedback
- **Tester Agent → Coder Agent**: Test failure notifications
- **Deployer Agent → Coder Agent**: Deployment compatibility issues

#### Slow Feedback Loops
- **Writer Agent → All Agents**: Documentation completeness feedback
- **Product Agent → Architect Agent**: Requirements clarification feedback

### Error Recovery
- **Critical Issues**: Return to previous agent for fixes
- **Minor Issues**: Document and proceed with fixes
- **Ambiguity**: Stop and request clarification
- **Performance Issues**: Optimize in current stage or defer to next iteration

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