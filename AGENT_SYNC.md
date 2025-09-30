# Agent Status Synchronization

## Status Files

Each agent creates a status file upon completion:

- `output/status/product.complete` - Product Agent finished
- `output/status/architect.complete` - Architect Agent finished
- `output/status/coder.complete` - Coder Agent finished
- `output/status/reviewer.complete` - Reviewer Agent finished
- `output/status/tester.complete` - Tester Agent finished
- `output/status/deployer.complete` - Deployer Agent finished
- `output/status/writer.complete` - Writer Agent finished

## Status File Format

```json
{
  "agent": "agent_name",
  "status": "complete",
  "timestamp": "2024-01-01T12:00:00Z",
  "duration_seconds": 300,
  "outputs_created": ["file1.md", "file2.js"],
  "quality_score": 9.5,
  "notes": "Optional notes about completion"
}
```

## Parallel Execution Triggers

### Sequential Phase (Must complete in order)
1. **Product Agent** → Creates `output/status/product.complete`
2. **Architect Agent** → Waits for `product.complete`, creates `architect.complete`
3. **Coder Agent** → Waits for `architect.complete`, creates `coder.complete`

### Parallel Phase 1 (Fast Feedback)
4. **Reviewer Agent** → Waits for `coder.complete`, creates `reviewer.complete`
   - Can start immediately after Coder Agent
   - Provides rapid feedback for quality issues

### Parallel Phase 2 (Concurrent Execution)
5. **Tester Agent** → Waits for `coder.complete` + `architect.complete`, creates `tester.complete`
6. **Deployer Agent** → Waits for `coder.complete`, creates `deployer.complete`
   - Both run concurrently after Coder Agent completion

### Parallel Phase 3 (Integration)
7. **Writer Agent** → Waits for `tester.complete` + `deployer.complete`, creates `writer.complete`
   - Integrates outputs from both Tester and Deployer

## Polling Mechanism

Agents poll for dependencies every 30 seconds:

```bash
while [ ! -f "output/status/dependency.complete" ]; do
  echo "Waiting for dependency..."
  sleep 30
done
```

## Error Handling

- If a dependency fails, create `dependency.failed` status file
- Downstream agents should stop and report the dependency failure
- Error status files include error details and recovery suggestions