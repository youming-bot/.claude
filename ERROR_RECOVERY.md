# Error Handling and Recovery

## Universal Error Handling Principles

All agents must follow these error handling principles:

### 1. Categorization of Errors
- **Critical Errors**: Block all progress, require immediate intervention
- **High Priority Errors**: Block current agent, allow others to continue
- **Medium Priority Errors**: Document and continue with caution
- **Low Priority Errors**: Document and continue normally

### 2. Error Status Files
When an agent encounters a critical or high priority error:

```json
{
  "agent": "agent_name",
  "status": "failed",
  "timestamp": "2024-01-01T12:00:00Z",
  "error_category": "critical|high|medium|low",
  "error_type": "dependency_missing|validation_failed|resource_error",
  "error_message": "Clear description of the error",
  "attempts": 3,
  "recovery_suggestions": [
    "Specific actionable steps to resolve"
  ],
  "fallback_options": [
    "Alternative approaches if primary fails"
  ]
}
```

### 3. Retry Logic
- **Maximum 3 attempts** for any single issue
- **Progressive backoff**: 1 minute, 5 minutes, 15 minutes
- **Different approach** each attempt
- **Document each attempt** thoroughly

### 4. Dependency Failure Handling
When a dependency fails:
1. Check `output/status/dependency.failed` file
2. Read error details and recovery suggestions
3. Attempt recovery if suggested
4. If recovery fails, create own failure status
5. Stop processing and notify system

## Agent-Specific Error Handling

### Product Agent
- **Common Errors**: Ambiguous requirements, conflicting constraints
- **Recovery**: Break into smaller requirements, request clarification
- **Fallback**: Define MVP scope and defer complex features

### Architect Agent
- **Common Errors**: Technology conflicts, missing dependencies
- **Recovery**: Choose alternative technologies, simplify architecture
- **Fallback**: Use existing patterns, defer complex integrations

### Coder Agent
- **Common Errors**: Implementation blockers, test failures
- **Recovery**: Refactor approach, update tests, seek clarification
- **Fallback**: Implement simplified version, defer complex features

### Reviewer Agent
- **Common Errors**: Quality violations, architecture non-compliance
- **Recovery**: Provide specific fix suggestions, reference patterns
- **Fallback**: Document issues and proceed with warnings

### Tester Agent
- **Common Errors**: Test environment failures, unclear requirements
- **Recovery**: Simplify test cases, focus on critical paths
- **Fallback**: Manual testing procedures, basic coverage only

### Deployer Agent
- **Common Errors**: Configuration conflicts, resource limits
- **Recovery**: Alternative configurations, resource optimization
- **Fallback**: Local deployment only, manual deployment steps

### Writer Agent
- **Common Errors**: Missing information, documentation conflicts
- **Recovery**: Use available information, mark gaps clearly
- **Fallback**: Basic documentation only, TODO sections for gaps

## System-Level Error Recovery

### Cascade Failure Prevention
1. **Isolation**: Errors in one agent don't cascade to others
2. **Partial Success**: System can continue with partial outputs
3. **Graceful Degradation**: Fallback to simpler approaches
4. **Recovery Points**: Each agent completion is a recovery point

### Recovery Automation
```bash
# Check for failed dependencies
check_dependencies() {
  for dep in $DEPENDENCIES; do
    if [ -f "output/status/$dep.failed" ]; then
      echo "Dependency $dep failed. Checking recovery options..."
      # Attempt automated recovery based on suggestions
    fi
  done
}
```

### Quality Gates During Recovery
- **Lower thresholds** during recovery mode
- **Essential features only** (MVP mode)
- **Manual review required** for all recovered outputs
- **Documentation of all compromises** made during recovery

## Monitoring and Alerting

### Error Metrics
- Error rate per agent
- Recovery success rate
- Time to recovery
- Cascade failure frequency

### Alert Triggers
- Critical errors in any agent
- Multiple agents failing simultaneously
- Recovery time exceeding thresholds
- Quality degradation below minimum standards