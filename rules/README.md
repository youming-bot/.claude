# Rules Hub

## Purpose

This directory centralizes project-wide standards that every agent must consult before beginning work or handing off tasks. Treat it as the single source of truth for development, testing, documentation, review, and operations policies.

## Agent Tools & Models

### Claude Code Agents (using Opus model)
- **System Architect**: `agents/system-architect.md` - Uses Claude Code tools
- **Fullstack Developer**: `agents/fullstack-developer.md` - Uses Claude Code tools  
- **Test Developer**: `agents/test-developer.md` - Uses Claude Code tools
- **Docs Maintainer**: `agents/docs-maintainer.md` - Uses Claude Code tools
- **DevOps Engineer**: `agents/devops-engineer.md` - Uses Claude Code tools

### Specialized CLI Agents
- **Code Reviewer**: `agents/code-reviewer.md` - Uses Codex CLI
- **Gemini Analyzer**: `agents/gemini-analyzer.md` - Uses Bash for Gemini CLI orchestration

## Navigation

- `coding-style.md` – Language conventions, formatting, and linting expectations
- `docs.md` – Documentation structure, voice, and approval requirements
- `code-review.md` – Review checklist, severity levels, and escalation paths
- `testing.md` – Unit, integration, and regression test standards
- `devops.md` – Dependency governance, environment, and CI/CD guidelines

## Usage Guidance

1. Start every task by skimming the relevant sections to refresh constraints and tooling expectations.
2. When you introduce or update a rule, modify both the specific document and this index so other agents discover it quickly.
3. Link to precise anchors when referencing rules from agent definitions or handoff notes.
4. Keep examples concise—prefer checklists and decision trees that agents can follow quickly.

## Handoff Alignment

- Capture any rule clarifications or exceptions in `handoff.md` so downstream roles understand the agreed standards.
- When rules change mid-task, update the affected agent files and notify the next role via the handoff summary.

Maintaining this hub prevents rule drift and keeps cross-role collaboration predictable.
