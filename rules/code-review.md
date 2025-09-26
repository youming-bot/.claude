# Code Review Standards

> Outline severity levels, blocking criteria, and required checks for reviewers.

## Minimum Expectations

- Check architectural alignment and adherence to existing patterns.
- Record actionable feedback and link to rule references when requesting changes.

## Codex CLI Integration

The Code Reviewer agent uses Codex CLI for automated review tasks:

- **codex apply**: Apply atomic patches for code quality improvements
- **codex exec**: Execute analysis commands and validation scripts
- Focus on mechanical edits and standardized checks
- Leave complex architectural decisions to human reviewers

## Review Categories

1. **Code Quality**
   - Formatting and style consistency
   - Naming conventions and readability
   - Code complexity and maintainability

2. **Architecture**
   - Adherence to project patterns
   - Proper separation of concerns
   - Integration with existing systems

3. **Security**
   - Input validation and sanitization
   - Authentication and authorization
   - Data exposure and privacy

4. **Performance**
   - Algorithmic efficiency
   - Resource utilization
   - Database query optimization
