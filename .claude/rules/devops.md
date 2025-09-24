# DevOps & Infrastructure Standards

> Define expectations for dependency management, environment provisioning, and CI/CD pipelines.

## Key Practices

- Pin dependency versions and document approval in `handoff.md` and `.changeset` or equivalent.
- Keep environment secrets and credentials out of the repository; document retrieval steps securely.
- Ensure CI pipelines run `.claude/agents/quality-gate.sh` (or equivalent) and publish artifacts for downstream verification.
