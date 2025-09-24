#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: ./quality-gate.sh [--scope <full|modified>] [--skip-tests]

Runs the standard formatting, linting, type-checking, and test commands expected before code review handoff.

Options:
  --scope <full|modified>  Limit checks to modified files when possible (default: full)
  --skip-tests             Skip running the project test command
  -h, --help               Show this help text
USAGE
}

SCOPE="full"
RUN_TESTS=1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --scope)
      shift
      [[ $# -gt 0 ]] || { echo "Missing value for --scope" >&2; exit 1; }
      SCOPE="$1"
      if [[ "$SCOPE" != "full" && "$SCOPE" != "modified" ]]; then
        echo "Unknown scope: $SCOPE" >&2
        exit 1
      fi
      ;;
    --skip-tests)
      RUN_TESTS=0
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
  shift
done

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found; skipping Node.js quality checks" >&2
  exit 0
fi

collect_modified_files() {
  local pattern=$1
  if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    return 1
  fi
  git status --porcelain | awk '{print $2}' | grep -E "$pattern" || true
}

run_step() {
  local description=$1
  shift
  echo "[RUN] $description"
  if "$@"; then
    echo "[OK] $description"
  else
    local status=$?
    echo "[FAIL] $description (exit $status)" >&2
    exit $status
  fi
}

BIOME_TARGET=()
if [[ "$SCOPE" == "modified" ]]; then
  # Fallback for systems without mapfile
  while IFS= read -r line; do
    BIOME_TARGET+=("$line")
  done < <(collect_modified_files '\\.(c|m)?jsx?$|\\.tsx?$')
fi

if [[ ${#BIOME_TARGET[@]} -eq 0 ]]; then
  BIOME_TARGET=(".")
fi

if [[ -f "package.json" ]]; then
  run_step "Format & lint with Biome" pnpm biome check --apply "${BIOME_TARGET[@]}"
  run_step "Type-check with tsc" pnpm exec tsc --noEmit
else
  echo "[INFO] No package.json found, skipping Node.js quality checks"
fi

if [[ $RUN_TESTS -eq 1 ]]; then
  run_step "Run tests" pnpm run test --if-present
else
  echo "[WARN] Tests skipped by flag"
fi

echo "All quality gate checks completed."
