# UI Migration Toolkit

Migrate AI-generated UI code into existing projects with structured analysis, planning, and validation.

## Overview

The UI Migration Toolkit helps developers integrate AI-generated UI code (from tools like Lovable, V0, or similar) into existing projects. It provides:

- **Orchestrated Workflow**: Single entry point manages the entire migration journey
- **State Tracking**: Sprint-like state file tracks progress, commits, and pending fixes
- **Three Migration Modes**: Refresh (visual update), Addition (new elements), Extraction (cherry-pick)
- **Two Execution Modes**: Interactive (step-by-step) or YOLO (automated)
- **Smart Commit Strategy**: Stage-based commits with automatic fix queue for failed hooks
- **Four-Layer Validation**: Visual, Functional, Unit Tests, Standards Compliance
- **Co-located Unit Tests**: Every component ships with its test file

## Installation

```bash
bmad install ui-migrate
```

**Note:** Requires BMM module for architecture workflow integration.

## Quick Start

### 1. Load the Migration Orchestrator

```
agent migration-orchestrator
```

### 2. Start a New Migration

```
*start
```

You'll be prompted for:

- Migration name (e.g., `landing-page`)
- Source code path (e.g., `./ui-prototype`)
- Starting mode (interactive or YOLO)

### 3. Follow the Orchestrated Journey

```
*continue   # Proceed to next task
*status     # View progress dashboard
*yolo       # Switch to automated mode
```

The orchestrator guides you through all phases automatically.

## Architecture

### Entry Point: Migration Orchestrator (Maestro)

The **Migration Orchestrator** is the single entry point to the toolkit. It:

- Manages migration state across sessions
- Coordinates the three specialist agents
- Handles commit strategy with fix queue
- Supports interactive and YOLO modes

```
agent migration-orchestrator
*help
```

### Internal Agents (Invoked Through Orchestrator)

| Agent                    | Icon | Name      | Role                                   |
| ------------------------ | ---- | --------- | -------------------------------------- |
| **Source Analyst**       | 🔬   | Dr. Scout | Codebase Archaeologist - Deep analysis |
| **Migration Architect**  | 📐   | Stratton  | Strategic Planner - Migration plans    |
| **Integration Engineer** | ⚙️   | Forge     | Execution Specialist - Implementation  |

These agents are internal and invoked automatically by the orchestrator.

### Workflows (6)

| Workflow                | Type     | Description                      |
| ----------------------- | -------- | -------------------------------- |
| `init-migration`        | Action   | Initialize new migration project |
| `analyze-source`        | Document | Full source analysis             |
| `create-migration-plan` | Document | Scope selection and strategy     |
| `execute-migration`     | Action   | Component + test creation        |
| `validate-migration`    | Action   | Four-layer validation            |
| `migration-status`      | Action   | Progress dashboard               |

## Migration Phases

```
1. Initialize    → Set up project, create state file
2. Analyze       → Deep-dive into source code
3. Plan          → Select scope, create migration strategy
4. Execute       → Migrate components with tests
5. Validate      → Four-layer quality validation
6. Complete      → Process fixes, final cleanup
```

## State Tracking

Each migration project has a state file at `.docs/migrations/{name}/migration-state.yaml`:

```yaml
migration:
  id: 'mig-landing-page-20241215'
  name: 'landing-page'
  source_path: './ui-prototype'

mode: 'interactive' # or "yolo"

phases:
  - id: 'analyze'
    status: 'in_progress'
    tasks:
      - name: 'Run source analysis'
        status: 'completed'
    commit: null

current:
  phase: 'analyze'
  task: 2

fix_queue:
  - type: 'lint'
    files: ['src/components/Button.tsx']
    status: 'pending'
```

## Commit Strategy

The toolkit uses a smart commit strategy that separates AI-generated code from fixes:

### How It Works

1. **After each phase completes** → Commit staged changes
2. **If pre-commit hooks fail** (lint, tests):
   - Capture error output
   - Parse errors into fix queue entries
   - Commit with `--no-verify`
   - Mark commit as `hooks_skipped: true`
3. **Fix queue** accumulates issues for later resolution
4. **Fixes become separate commits** for easy review

### Benefits

```
[Commit 1] "feat(migrate): add Button component"
           → Pure AI migration output (hooks skipped)

[Commit 2] "fix(migrate): resolve lint issues in Button"
           → Only the fixes, easy to diff
```

This lets you see exactly what the AI produced vs what changes were needed to pass checks.

### Processing Fixes

```
*fix   # Process fix queue interactively
```

Options for each fix:

- **Fix now** → Apply fix, verify, commit
- **Defer** → Handle later
- **Skip** → Mark as won't fix

## Execution Modes

### Interactive Mode (Default)

- Confirms each step
- Shows detailed output
- Pauses at checkpoints
- Full user control

### YOLO Mode

- Automated execution
- Simulates expert decisions
- Still pauses at checkpoints
- Can be scoped:
  - Until next checkpoint
  - Until phase complete
  - Until migration complete

```
*yolo         # Enable YOLO mode
*interactive  # Switch back to interactive
```

## Commands Reference

### Migration Orchestrator

| Command        | Description                      |
| -------------- | -------------------------------- |
| `*start`       | Initialize new migration project |
| `*status`      | Show progress dashboard          |
| `*continue`    | Proceed to next task             |
| `*yolo`        | Enable automated mode            |
| `*interactive` | Switch to interactive mode       |
| `*fix`         | Process pending fix queue        |
| `*commit`      | Manually trigger commit          |
| `*list`        | List all migration projects      |
| `*abort`       | Abort current migration          |
| `*help`        | Show all commands                |
| `*exit`        | Exit orchestrator                |

## Configuration

Configuration is set during installation in `_bmad/ui-migrate/config.yaml`:

| Field                   | Description                         | Default                     |
| ----------------------- | ----------------------------------- | --------------------------- |
| `coding_standards_path` | Path to coding standards (REQUIRED) | `.docs/coding-standards.md` |
| `migrations_output`     | Where migration projects are saved  | `.docs/migrations`          |
| `test_file_suffix`      | Test file naming                    | `.test.tsx`                 |
| `migration_mode`        | Default mode                        | `interactive`               |

## Migration Modes

### Refresh

Update existing UI visuals while preserving functionality.

- Use when: Redesigning existing components
- Effect: Creates new versions alongside old

### Addition

Add new pages, components, or panels.

- Use when: Expanding your application
- Effect: Creates entirely new components

### Extraction

Cherry-pick specific components from source.

- Use when: You only need certain pieces
- Effect: Migrates only selected components

## Validation Framework

Every migration is validated across four layers:

| Layer          | What It Checks            | When             |
| -------------- | ------------------------- | ---------------- |
| **Unit Tests** | Component logic           | During execution |
| **Standards**  | Coding conventions        | During execution |
| **Visual**     | Appearance matches source | Post-execution   |
| **Functional** | Behavior is correct       | Post-execution   |

## Module Structure

```
ui-migrate/
├── agents/
│   ├── migration-orchestrator.agent.yaml  # Entry point
│   ├── source-analyst.agent.yaml          # Internal
│   ├── migration-architect.agent.yaml     # Internal
│   └── integration-engineer.agent.yaml    # Internal
├── workflows/
│   ├── init-migration/
│   ├── analyze-source/
│   ├── create-migration-plan/
│   ├── execute-migration/
│   ├── validate-migration/
│   └── migration-status/
├── templates/
│   └── migration-state.yaml
├── _module-installer/
│   └── install-config.yaml
├── README.md
├── TODO.md
└── INSTALL-GUIDE.md
```

## User Journey

```
1. Load orchestrator: agent migration-orchestrator
         ↓
2. Start migration: *start
         ↓
3. Provide source path and migration name
         ↓
4. Orchestrator guides through phases:
   - Analyze source
   - Create migration plan
   - Execute migrations (with commits per stage)
   - Validate results
         ↓
5. Process fix queue: *fix
         ↓
6. Migration complete!
```

## Dependencies

- **BMM Module**: Required for architecture workflow integration
- **Git**: For commit strategy (recommended)
- **Jest/Vitest**: For running unit tests

## Author

Created by Zee using the BMAD Method

---

_UI Migration Toolkit v1.1.0_
