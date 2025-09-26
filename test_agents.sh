#!/bin/bash

AGENT_DIR="/Users/youming/GitHub/oumu.ai/.claude/agents"

echo "=== Agent Configuration Test ==="
echo "Testing all agent configurations..."
echo

# Initialize counters
total_agents=0
opus_agents=0
claude_code_agents=0
codex_cli_agents=0
bash_agents=0

# Test each agent
for agent in "$AGENT_DIR"/*.md; do
    agent_name=$(basename "$agent" .md)
    echo "Testing $agent_name:"

    total_agents=$((total_agents + 1))

    # Extract frontmatter
    echo "  Frontmatter:"
    sed -n '1,/^---$/p' "$agent" | head -n -1 | sed 's/^/    /'

    # Check model field
    if grep -q "^model:" "$agent"; then
        model=$(grep "^model:" "$agent" | cut -d' ' -f2- | xargs)
        echo "  Model: $model"
        if [ "$model" = "opus" ]; then
            opus_agents=$((opus_agents + 1))
        fi
    else
        echo "  Model: Not specified (tool-specific)"
    fi

    # Check tools field
    if grep -q "^tools:" "$agent"; then
        tools=$(grep "^tools:" "$agent" | cut -d' ' -f2- | xargs)
        echo "  Tools: $tools"

        # Count tool types
        if echo "$tools" | grep -q "Claude Code"; then
            claude_code_agents=$((claude_code_agents + 1))
        fi
        if echo "$tools" | grep -q "Codex CLI"; then
            codex_cli_agents=$((codex_cli_agents + 1))
        fi
        if echo "$tools" | grep -q "Bash"; then
            bash_agents=$((bash_agents + 1))
        fi
    fi

    echo "  ---"
    echo
done

echo "=== Summary ==="
echo "Total agents found: $total_agents"
echo "Agents with model: opus: $opus_agents"
echo "Agents without model: $((total_agents - opus_agents))"
echo
echo "=== Tool Distribution ==="
echo "Claude Code: $claude_code_agents agents"
echo "Codex CLI: $codex_cli_agents agents"
echo "Bash: $bash_agents agents"
echo
echo "=== Expected Configuration ==="
echo "Claude Code + Opus: 5 agents (system-architect, fullstack-developer, test-developer, docs-maintainer, devops-engineer)"
echo "Codex CLI only: 1 agent (code-reviewer)"
echo "Bash only: 1 agent (gemini-analyzer)"
