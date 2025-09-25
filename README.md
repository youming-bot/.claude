# Agents (Concise Overview)

## Purpose

This folder defines specialized Claude Code agents with clear, single‑purpose roles. We delegate large‑scale analysis to Gemini CLI and mechanical edits to Codex CLI, with core development tasks handled by Claude Code agents using the Sonnet model.

## Agents

- System Architect (`agents/system-architect.md`): Architectural guidance, context analysis, task decomposition. Uses Claude Code + Sonnet. No coding/tests/docs.
- Fullstack Developer (`agents/fullstack-developer.md`): Feature implementation and fixes. Uses Claude Code + Sonnet. No tests/docs/review.
- Test Developer (`agents/test-developer.md`): Comprehensive test coverage including unit tests (`test/unit/`), integration tests (`test/integration/`), and end-to-end verification. Uses Claude Code + Sonnet.
- Docs Maintainer (`agents/docs-maintainer.md`): Project and module documentation, consistency, cross‑references. Uses Codex CLI.
- Code Reviewer (`agents/code-reviewer.md`): Git‑based review for standards and architectural consistency. Uses Codex CLI.
- DevOps Engineer (`agents/devops-engineer.md`): Dependency governance, environment setup, CI/CD pipeline tasks. Uses Codex CLI + Bash.
- Gemini Analyzer (`agents/gemini-analyzer.md`): CLI wrapper that builds and runs Gemini commands, returns raw output only.

**Note**: All Claude Code agents use the Sonnet model for optimal performance and quality.

## Workflow (Typical)

Request → System Architect (plan) → Fullstack Developer (implement) ↔ Code Reviewer (review loop) → Test Developer (comprehensive testing) → Docs Maintainer (docs). Use Gemini Analyzer for whole‑codebase analysis at any stage. Use Codex CLI to land atomic patches.

## Handoff & Feedback

- Every agent emits a lightweight `handoff.md` (or updates an accumulating log) capturing:
  - Summary of changes and intent
  - Files touched and entry points
  - Expectations or focus areas for the next agent
- `handoff.md` lives beside the work-in-progress artifacts unless role docs specify otherwise.
- Reviewers can bounce tasks back to previous roles with clear action items before downstream agents proceed.

## Quick Rules

- Boundaries: Each agent does one thing. Do not cross roles.
- Minimal changes: Prefer small, atomic patches that compile and pass tests.
- Learn first: Follow existing patterns in `rules/README.md` and child documents.

## Conventions (Frontmatter)

Each agent file starts with frontmatter:

```yaml
---
name: <agent-id>
description: <when to use>
model: <preferred-model>
color: <ui-hint>
tools: <tool-list> # e.g., Claude Code, Codex CLI
---
```

Agents that exclusively orchestrate Gemini or Codex workflows may omit the `model` field.

## Gemini & Codex (In Brief)

- Gemini CLI (via `gemini-analyzer`):
  - Whole‑repo analysis: `gemini --all-files -p "<prompt>"`
  - Non‑interactive: `--yolo`, Debug: `--debug`
  - Returns raw output; interpretation belongs to Architect/Developer.
- Codex CLI (used by specific agents):
  - Apply atomic patches: `codex apply`
  - Execute commands: `codex exec`
  - Used by Docs Maintainer and Code Reviewer for documentation and quality assurance

## Quality Gate Script

## Tool Assignment

- **Claude Code + Sonnet**: System Architect, Fullstack Developer, Test Developer
  - Used for complex architectural design, feature implementation, and comprehensive test development
  - Leverages full Claude Code capabilities for comprehensive tasks

- **Codex CLI + Bash**: Docs Maintainer, Code Reviewer, DevOps Engineer, Gemini Analyzer
  - Used for mechanical edits, documentation, quality assurance, dependency and environment management, and CLI automation
  - Efficient for standardized, repetitive tasks

## Maintenance

To add an agent: copy an existing file, adjust frontmatter and boundaries, register it above, and update `rules/README.md` if new standards are introduced. For new CLI wrappers, follow gemini-analyzer’s “compose commands only; do not interpret” rule.

Keep `handoff.md` guidance, quality gate instructions, and the central rules index aligned whenever roles evolve.
