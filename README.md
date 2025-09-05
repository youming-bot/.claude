# Agents (Concise Overview)

## Purpose

This folder defines specialized Claude Code agents with clear, single‑purpose roles. We delegate large‑scale analysis to Gemini CLI and mechanical edits to Codex CLI, keeping Claude focused on system architecture and high‑quality implementation.

## Agents

- System Architect (`system-architect.md`): Architectural guidance, context analysis, task decomposition. Uses Codex CLI. No coding/tests/docs.
- Fullstack Developer (`fullstack-developer.md`): Feature implementation and fixes. No tests/docs/review.
- Unit Test Developer (`unit-test-developer.md`): Unit tests and coverage docs under `test/unit/` mirroring `src/`. Uses Codex CLI.
- Docs Maintainer (`docs-maintainer.md`): Project and module documentation, consistency, cross‑references. Uses Codex CLI.
- Code Reviewer (`code-reviewer.md`): Git‑based review for standards and architectural consistency. Uses Codex CLI.
- Gemini Analyzer (`gemini-analyzer.md`): CLI wrapper that builds and runs Gemini commands, returns raw output only.

## Workflow (Typical)

Request → System Architect (plan) → Fullstack Developer (implement) → Unit Test Developer (tests) → Code Reviewer (quality) → Docs Maintainer (docs). Use Gemini Analyzer for whole‑codebase analysis at any stage. Use Codex CLI to land atomic patches.

## Quick Rules

- Boundaries: Each agent does one thing. Do not cross roles.
- Minimal changes: Prefer small, atomic patches that compile and pass tests.
- Learn first: Follow existing patterns in `CLAUDE.md` and `.claude/rules/`.
- Quality gates: Lint, type‑check, tests; keep docs in sync.

## Conventions (Frontmatter)

Each agent file starts with frontmatter:

```yaml
---
name: <agent-id>
description: <when to use>
model: <preferred-model>
color: <ui-hint>
tools: <tool-list> # e.g., Bash, Read, Write, Edit, Glob, Grep
---
```

## Gemini & Codex (In Brief)

- Gemini CLI (via `gemini-analyzer`):
  - Whole‑repo analysis: `gemini --all-files -p "<prompt>"`
  - Non‑interactive: `--yolo`, Debug: `--debug`
  - Returns raw output; interpretation belongs to Architect/Developer.
- Codex CLI (used by multiple agents):
  - Apply atomic patches: `codex apply`
  - Execute commands: `codex exec`
  - Used by System Architect, Unit Test Developer, Docs Maintainer, and Code Reviewer
  - For mechanical edits, documentation, testing, and architectural analysis

## Maintenance

To add an agent: copy an existing file, adjust frontmatter and boundaries, and register it here. For new CLI wrappers, follow gemini‑analyzer’s “compose commands only; do not interpret” rule.
