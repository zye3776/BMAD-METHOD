# UI Migration Toolkit - Installation Guide

This guide explains how to install the UI Migration Toolkit module into your local project.

---

## Prerequisites

Before installing, ensure you have:

1. **BMAD Method installed** in your target project
2. **BMM Module installed** (required dependency for architecture workflows)
3. **Node.js** (for running the BMAD installer)
4. A **coding standards document** for your project (required configuration)

---

## Installation Methods

### Method 1: Using BMAD Installer (Recommended)

If this module is published to the BMAD registry:

```bash
# Navigate to your project
cd /path/to/your/project

# Run the BMAD installer
npx bmad-method install

# Select "ui-migrate" from the module list when prompted
```

---

### Method 2: Manual Installation from Source

If installing from the BMAD-METHOD repository directly:

#### Step 1: Copy Module Source

```bash
# From the BMAD-METHOD repository, copy the module to your project
cp -r /path/to/BMAD-METHOD/_bmad/custom/src/modules/ui-migrate \
      /path/to/your/project/_bmad/ui-migrate
```

#### Step 2: Create Module Config

Create `_bmad/ui-migrate/config.yaml` in your project:

```yaml
# UI Migration Toolkit Module Configuration
# Generated during installation

# Inherited from core config
user_name: 'Your Name'
communication_language: 'English'
document_output_language: 'English'
output_folder: '{project-root}/.docs'

# Module-specific configuration
coding_standards_path: '{project-root}/.docs/coding-standards.md'
migrations_output: '{project-root}/.docs/migrations'
test_file_suffix: '.test.tsx'
migration_mode: 'auto'
submodule_path: ''
module_version: '1.0.0'
data_path: '{project-root}/_bmad/ui-migrate/data'
```

#### Step 3: Update Agent Manifest

Add the agents to your `_bmad/_cfg/agent-manifest.csv`:

```csv
"source-analyst","Dr. Scout","Source Analyst","🔬","Codebase Archaeologist - Deep analysis of AI-generated code","Senior code analyst specializing in reverse-engineering AI-generated codebases.","Methodical and thorough, like a detective examining evidence.","Every component has a story - trace its origins and dependencies","ui-migrate","_bmad/ui-migrate/agents/source-analyst.md"
"migration-architect","Stratton","Migration Architect","📐","Strategic Planner - Creates scope-aware migration plans","Senior migration strategist with expertise in codebase transformations.","Strategic and pragmatic, like a general planning a campaign.","Every migration has three modes - Refresh, Addition, or Extraction","ui-migrate","_bmad/ui-migrate/agents/migration-architect.md"
"integration-engineer","Forge","Integration Engineer","⚙️","Execution Specialist - Implements migrations with tests and standards compliance","Elite execution specialist who transforms migration plans into working code.","Precise and efficient, like a skilled craftsman.","Every component ships with its co-located test file","ui-migrate","_bmad/ui-migrate/agents/integration-engineer.md"
```

#### Step 4: Compile Agents

Run the BMAD installer with "Compile Agents Only" option:

```bash
npx bmad-method install
# Select "Compile Agents Only"
# Or use: npx bmad-method compile-agents
```

This converts `.agent.yaml` files to compiled `.md` agent files.

#### Step 5: Create Required Directories

```bash
# Create migrations output directory
mkdir -p /path/to/your/project/.docs/migrations

# Create module data directory
mkdir -p /path/to/your/project/_bmad/ui-migrate/data
```

---

### Method 3: Git Submodule (For Development)

If you want to keep the module linked to the source repo:

```bash
# Add BMAD-METHOD as a submodule
git submodule add https://github.com/your-org/BMAD-METHOD .bmad-source

# Symlink the module
ln -s .bmad-source/_bmad/custom/src/modules/ui-migrate _bmad/ui-migrate

# Create local config (don't symlink this)
cp _bmad/ui-migrate/_module-installer/install-config.yaml _bmad/ui-migrate/config.yaml
# Edit config.yaml with your project settings
```

---

## Post-Installation Setup

### 1. Create Coding Standards Document

The module **requires** a coding standards document. Create one at the configured path:

```bash
# Default location
touch .docs/coding-standards.md
```

Example coding standards document structure:

```markdown
# Project Coding Standards

## Component Conventions

- Use functional components with TypeScript
- Name components in PascalCase
- Use `.tsx` extension for React components

## File Naming

- Component files: PascalCase (e.g., `MyButton.tsx`)
- Test files: Co-located with `.test.tsx` suffix

## Styling

- Use Tailwind CSS for styling
- Use `cn()` utility for conditional classes

## TypeScript

- Prefer `interface` for props
- Name props interfaces as `{ComponentName}Props`
- Enable strict mode

## Testing

- Co-locate tests with components
- Use React Testing Library
- Test file naming: `{ComponentName}.test.tsx`
```

### 2. Verify Installation

Check that all files are in place:

```bash
# List module structure
find _bmad/ui-migrate -type f -name "*.yaml" -o -name "*.md"

# Expected output:
# _bmad/ui-migrate/config.yaml
# _bmad/ui-migrate/agents/source-analyst.md (compiled)
# _bmad/ui-migrate/agents/migration-architect.md (compiled)
# _bmad/ui-migrate/agents/integration-engineer.md (compiled)
# _bmad/ui-migrate/workflows/analyze-source/workflow.yaml
# ... etc
```

### 3. Test Agent Loading

```bash
# In Claude Code or your BMAD interface
agent source-analyst
*help
```

You should see the Source Analyst menu with available commands.

---

## Configuration Reference

### Required Configuration

| Field                   | Description                       | Example                     |
| ----------------------- | --------------------------------- | --------------------------- |
| `coding_standards_path` | Path to your coding standards doc | `.docs/coding-standards.md` |

### Optional Configuration

| Field               | Default            | Description                                     |
| ------------------- | ------------------ | ----------------------------------------------- |
| `migrations_output` | `.docs/migrations` | Where migration docs are saved                  |
| `test_file_suffix`  | `.test.tsx`        | Test file naming convention                     |
| `migration_mode`    | `auto`             | Default mode (auto/refresh/addition/extraction) |
| `submodule_path`    | (empty)            | Default source code path                        |

---

## Troubleshooting

### Agent not found

```
Error: Agent 'source-analyst' not found
```

**Solution:** Run agent compilation:

```bash
npx bmad-method compile-agents
```

### Config not loading

```
Error: Could not load config from _bmad/ui-migrate/config.yaml
```

**Solution:** Ensure config.yaml exists and has valid YAML syntax:

```bash
# Validate YAML
npx yaml-lint _bmad/ui-migrate/config.yaml
```

### Coding standards not found

```
Error: Coding standards document not found
```

**Solution:** Create the document at the configured path or update `coding_standards_path` in config.yaml.

### BMM workflows not available

```
Error: Could not find architecture workflow
```

**Solution:** Ensure BMM module is installed:

```bash
npx bmad-method install
# Select BMM module
```

---

## Directory Structure After Installation

```
your-project/
├── _bmad/
│   ├── _cfg/
│   │   └── agent-manifest.csv      # Updated with ui-migrate agents
│   ├── bmm/                        # BMM module (dependency)
│   ├── core/                       # Core BMAD files
│   └── ui-migrate/                 # UI Migration Toolkit
│       ├── agents/
│       │   ├── source-analyst.md
│       │   ├── migration-architect.md
│       │   └── integration-engineer.md
│       ├── workflows/
│       │   ├── analyze-source/
│       │   ├── create-migration-plan/
│       │   ├── execute-migration/
│       │   ├── validate-migration/
│       │   └── migration-status/
│       ├── config.yaml
│       └── README.md
├── .docs/
│   ├── coding-standards.md         # Required: Your coding standards
│   └── migrations/                 # Migration output directory
└── ...
```

---

## Quick Start After Installation

1. **Add your AI-generated source code:**

   ```bash
   git submodule add https://github.com/org/lovable-prototype ./ui-prototype
   ```

2. **Load Source Analyst and analyze:**

   ```
   agent source-analyst
   *analyze
   ```

3. **Load Migration Architect and plan:**

   ```
   agent migration-architect
   *scope
   *plan
   ```

4. **Load Integration Engineer and execute:**

   ```
   agent integration-engineer
   *migrate
   ```

5. **Validate:**
   ```
   workflow validate-migration
   ```

---

## Updating the Module

To update to a newer version:

```bash
# If using Method 1 (BMAD Installer)
npx bmad-method update ui-migrate

# If using Method 2 (Manual)
# Re-copy from source and re-compile agents

# If using Method 3 (Submodule)
cd .bmad-source
git pull
cd ..
npx bmad-method compile-agents
```

---

## Uninstalling

To remove the module:

```bash
# Remove module directory
rm -rf _bmad/ui-migrate

# Remove from agent manifest (edit _bmad/_cfg/agent-manifest.csv)
# Remove lines containing "ui-migrate"

# Optionally remove migration outputs
rm -rf .docs/migrations
```

---

_UI Migration Toolkit v1.0.0 - Installation Guide_
