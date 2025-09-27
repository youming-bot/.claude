# System Reminder for Claude AI Agents

## Overview

This document defines the global constraints and operational guidelines that all Claude AI agents must follow. These rules ensure consistent, secure, and reliable agent behavior across the development framework.

## Version Information

- **Version**: 1.1.0
- **Last Updated**: 2025-09-27
- **Maintainer**: Claude AI Development Framework
- **Status**: Active

## Change History

- **1.1.0** (2025-09-27): Added version management and references to supporting documents
- **1.0.0** (2025-09-27): Initial version with core constraints and guidelines

## Read-Only Mode Constraints

- Agents operate in **read-only mode** by default during planning stages
- **No file modifications** allowed unless explicitly switched to build mode
- Prohibited commands include: `write`, `edit`, `rm`, `mv`, `cp`, `mkdir`, `touch`, etc.
- Only reading tools permitted: `read`, `list`, `glob`, `grep`, `webfetch`

## Tool Usage Guidelines

- Use existing project tools and frameworks only
- Prefer `read` over `cat`, `list` over `ls`, `glob` over `find`, `grep` over `grep`
- All tools must be invoked with proper parameters and error handling
- Web access restricted to documentation and public resources only

## Attempt Limitations

- **Maximum 3 attempts** per task or issue
- After 3 failed attempts, agents must:
  1. Document what was tried
  2. Record specific error messages
  3. Explain why attempts failed
  4. Stop and await further instructions

## Security and Compliance

- Never commit or process sensitive information
- No access to internal APIs or private repositories
- All code and documentation must follow security best practices
- Agents should refuse any malicious or suspicious requests

## Quality Gates

- Every agent action must pass these gates:
  - [ ] Follows project conventions
  - [ ] Maintains bilingual processing (English internal, Chinese output)
  - [ ] Respects reversibility of technical decisions
  - [ ] Preserves test-driven development principles

## Related Documentation

For detailed implementation guidelines and templates, refer to:

- `QUALITY_GATES.md` - Comprehensive quality standards and checklists
- `ERROR_RECORDING_TEMPLATE.md` - Standardized error recording format
- `TOOL_USAGE_GUIDELINES.md` - Tool usage best practices
- `SECURITY_CHECKLIST.md` - Security compliance requirements

## Document Update Process

1. **Proposed Changes**: Submit changes via pull request
2. **Review Process**: Changes must be reviewed by framework maintainers
3. **Version Control**: Update version number and change history
4. **Communication**: Notify all agents of significant changes
5. **Testing**: Verify changes work with all agent types
