# Agents (Concise Overview)

## Purpose

This folder defines specialized Claude Code agents with clear, single‑purpose roles. We delegate large‑scale analysis to Gemini CLI and mechanical edits to Codex CLI, keeping Claude focused on system architecture and high‑quality implementation.

## Agents

- System Architect (`system-architect`): Architectural guidance, context analysis, task decomposition. No coding/tests/docs.
- Fullstack Developer (`fullstack-developer`): Feature implementation and fixes. No tests/docs/review.
- Unit Test Developer (`unit-test-developer`): Unit tests and coverage docs under `test/unit/` mirroring `src/`.
- Docs Maintainer (`docs-maintainer`): Project and module documentation, consistency, cross‑references.
- Code Reviewer (`code-reviewer`): Git‑based review for standards and architectural consistency.
- Gemini Analyzer (`gemini-analyzer`): CLI wrapper that builds and runs Gemini commands, returns raw output only.

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
# Optional: tools (e.g., for CLI wrappers like gemini-analyzer)
---
```

## Gemini & Codex (In Brief)

- Gemini CLI (via `gemini-analyzer`):
  - Whole‑repo analysis: `gemini --all-files -p "<prompt>"`
  - Non‑interactive: `--yolo`, Debug: `--debug`
  - Returns raw output; interpretation belongs to Architect/Developer.
- Codex CLI:
  - Apply atomic patches (`apply_patch`) and maintain task plans (`update_plan`).
  - Use for mechanical, repeatable edits and scaffolding under role guidance.

## Maintenance

To add an agent: copy an existing file, adjust frontmatter and boundaries, and register it here. For new CLI wrappers, follow gemini‑analyzer’s “compose commands only; do not interpret” rule.
