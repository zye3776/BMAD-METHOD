# General Research Module - Complete Design Specification

**Module Name:** General Research Module
**Module Code:** `general-research`
**Version:** 1.0.0
**Created:** 2025-12-03
**Purpose:** Complete blueprint for recreating the Research Module from scratch

---

## Table of Contents

1. [Module Vision & Philosophy](#1-module-vision--philosophy)
2. [Design Principles](#2-design-principles)
3. [Architecture Overview](#3-architecture-overview)
4. [Agent Specifications](#4-agent-specifications)
5. [Workflow Specifications](#5-workflow-specifications)
6. [Data Architecture](#6-data-architecture)
7. [Configuration System](#7-configuration-system)
8. [Quality & Reliability System](#8-quality--reliability-system)
9. [Error Handling & Recovery](#9-error-handling--recovery)
10. [User Experience Patterns](#10-user-experience-patterns)
11. [Installation & Deployment](#11-installation--deployment)
12. [Extension Guidelines](#12-extension-guidelines)

---

## 1. Module Vision & Philosophy

### 1.1 Core Vision

A powerful single-user research tool that intelligently collects, refines, and organizes knowledge from the web using smart source selection and BMad-powered workflows. The module delivers exceptional research capabilities with human-in-the-loop approval at critical stages.

### 1.2 Core Value Propositions

1. **Intelligent Source Selection** - Automatically selects the most reliable sources based on topic context (academic vs technical vs general)
2. **Automatic Reliability Scoring** - Multi-factor scoring system for source trustworthiness
3. **Plan-Review-Approve Pattern** - 5 approval checkpoints ensure human control
4. **Optional Configuration** - Topic-specific YAML configs for power users
5. **Clear Agent Naming** - Descriptive names (Web Scraper, Knowledge Refiner)

### 1.3 Target Users

Individual developers and researchers who need to:

- Automate web research
- Collect documentation
- Organize knowledge
- Single-user focus (no multi-user features in MVP)

---

## 2. Design Principles

### 2.1 Human-in-the-Loop Control

**Principle:** Never act on critical operations without user consent.

**Implementation:**

- 5 mandatory approval checkpoints in the research workflow
- User can modify, skip, or cancel at any checkpoint
- Clear display of what will happen before each action
- State preservation for interrupt/resume capability

### 2.2 Graceful Degradation

**Principle:** Never block the user. Surface issues at checkpoints.

**Implementation:**

- Skip unavailable sources with warnings
- Exponential backoff for rate limiting
- Log failures, continue processing
- Aggregate issues for checkpoint review

### 2.3 Transparency

**Principle:** Show the user what's happening at every step.

**Implementation:**

- Real-time progress updates during scraping
- Reliability scores visible for all sources
- Quality metrics displayed at checkpoints
- Clear explanation of filtering/refinement actions

### 2.4 Separation of Concerns

**Principle:** Each agent has one primary responsibility.

**Implementation:**

- Research Master: Orchestration and knowledge custody
- Web Scraper: Source selection and content extraction
- Knowledge Refiner: Content processing and organization

### 2.5 Configuration over Code

**Principle:** Behavior should be configurable without code changes.

**Implementation:**

- Topic-specific YAML configs
- Module-level configuration
- Sensible defaults for zero-config usage

### 2.6 Progressive Disclosure

**Principle:** Simple by default, powerful when needed.

**Implementation:**

- Works without any configuration
- Optional topic configs for power users
- Phase 2 features for advanced customization

---

## 3. Architecture Overview

### 3.1 Module Structure

```
general-research/
├── agents/
│   ├── research-master.md           # Primary orchestrator
│   ├── web-scraper.md               # Source selection & scraping
│   └── knowledge-refiner.md         # Content refinement
├── workflows/
│   ├── research/                    # End-to-end pipeline
│   │   ├── workflow.yaml
│   │   ├── instructions.md
│   │   └── template.md
│   ├── scrape/                      # Scraping execution
│   │   ├── workflow.yaml
│   │   └── instructions.md
│   └── refine/                      # Content refinement
│       ├── workflow.yaml
│       ├── instructions.md
│       └── template.md
├── tasks/                           # Standalone tasks (future)
├── templates/                       # Shared templates (future)
├── data/
│   └── _default-sources/            # Source hierarchies
│       ├── academic-research.yaml
│       ├── technical-documentation.yaml
│       ├── general-knowledge.yaml
│       └── recipes-lifestyle.yaml
├── _module-installer/
│   └── install-config.yaml          # Installation configuration
├── docs/
│   └── research-module-design-specification.md  # This document
├── README.md
└── TODO.md
```

### 3.2 Agent Interaction Model

```
┌─────────────────────────────────────────────────────────────────┐
│                     Research Master Agent                        │
│              (Executor, Knowledge Custodian, Orchestrator)       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Research │    │  Scrape  │    │  Refine  │
    │ Workflow │───▶│ Workflow │───▶│ Workflow │
    └──────────┘    └──────────┘    └──────────┘
           │               │               │
           │     ┌─────────┴─────────┐     │
           │     ▼                   ▼     │
           │ ┌────────┐       ┌─────────┐  │
           │ │  Web   │       │Knowledge│  │
           │ │Scraper │       │ Refiner │  │
           │ │ Agent  │       │  Agent  │  │
           │ └────────┘       └─────────┘  │
           │                               │
           └───────────────────────────────┘
                    Sequential Pipeline
              with Human Approval Gates
```

### 3.3 Data Flow

```
User Query
    │
    ▼
┌─────────────────┐
│ Topic Analysis  │ ─── Determine topic type, scope, depth
└────────┬────────┘
         │
         ▼ [CHECKPOINT 1: Plan Approval]
┌─────────────────┐
│ Source Selection│ ─── Load defaults or config, rank by reliability
└────────┬────────┘
         │
         ▼ [CHECKPOINT 2: Source Approval]
┌─────────────────┐
│ Content Scraping│ ─── Execute via Playwright, respect robots.txt
└────────┬────────┘
         │
         ▼ [CHECKPOINT 3: Quality Check]
┌─────────────────┐
│ Refinement Plan │ ─── Analyze for duplicates, structure
└────────┬────────┘
         │
         ▼ [CHECKPOINT 4: Refinement Approval]
┌─────────────────┐
│ Content Refine  │ ─── Remove duplicates, organize, format
└────────┬────────┘
         │
         ▼ [CHECKPOINT 5: Final Review]
┌─────────────────┐
│ Save Output     │ ─── Write to .research/ directory
└─────────────────┘
```

---

## 4. Agent Specifications

### 4.1 Research Master Agent

**Role:** Executor, Knowledge Custodian, and Workflow Orchestrator

**Purpose:** Primary interface for the Research Module. Manages all research operations, maintains knowledge of available resources, and orchestrates workflow execution. Works exactly like BMad Master but scoped to research operations.

**File:** `agents/research-master.md`

#### 4.1.1 Complete Agent Definition (XML Format)

```xml
<agent id=".bmad/general-research/agents/research-master.md" name="Research Master" title="Research Master" icon="🔬">
<activation critical="MANDATORY">
  <step n="1">Load persona from this current agent file (already in context)</step>
  <step n="2">🚨 IMMEDIATE ACTION REQUIRED - BEFORE ANY OUTPUT:
      - Load and read {project-root}/{bmad_folder}/general-research/config.yaml NOW
      - Store ALL fields as session variables: {user_name}, {communication_language}, {output_folder}
      - VERIFY: If config not loaded, STOP and report error to user
      - DO NOT PROCEED to step 3 until config is successfully loaded and variables stored</step>
  <step n="3">Remember: user's name is {user_name} (if available, otherwise omit from greeting)</step>

  <step n="4">Show greeting using {user_name} from config (if available), communicate in {communication_language}, then display numbered list of
      ALL menu items from menu section</step>
  <step n="5">STOP and WAIT for user input - do NOT execute menu items automatically - accept number or cmd trigger or fuzzy command
      match</step>
  <step n="6">On user input: Number → execute menu item[n] | Text → case-insensitive substring match | Multiple matches → ask user
      to clarify | No match → show "Not recognized"</step>
  <step n="7">When executing a menu item: Check menu-handlers section below - extract any attributes from the selected menu item
      (workflow, exec, tmpl, data, action) and follow the corresponding handler instructions</step>

  <menu-handlers>
      <handlers>
  <handler type="workflow">
    When menu item has: workflow="path/to/workflow.yaml"
    1. CRITICAL: Always LOAD {project-root}/{bmad_folder}/core/tasks/workflow.xml
    2. Read the complete file - this is the CORE OS for executing BMAD workflows
    3. Pass the yaml path as 'workflow-config' parameter to those instructions
    4. Execute workflow.xml instructions precisely following all steps
    5. Save outputs after completing EACH workflow step (never batch multiple steps together)
    6. If workflow.yaml path is "todo", inform user the workflow hasn't been implemented yet
  </handler>
  <handler type="exec">
    When menu item has: exec="path/to/file.md"
    Actually LOAD and EXECUTE the file at that path - do not improvise
    Read the complete file and follow all instructions within it
    If there is data="some/path/data-foo.md", pass that data to the executed file as context.
  </handler>
  <handler type="action">
    When menu item has: action="#id" → Find prompt with id="id" in current agent XML, execute its content
    When menu item has: action="text" → Execute the text directly as an inline instruction
  </handler>
    </handlers>
  </menu-handlers>

  <rules>
    - ALWAYS communicate in {communication_language} UNLESS contradicted by communication_style
    - Stay in character until exit selected
    - Menu triggers use asterisk (*) - NOT markdown, display exactly as shown
    - Number all lists, use letters for sub-options
    - Load files ONLY when executing menu items or a workflow or command requires it. EXCEPTION: Config file MUST be loaded at startup step 2
    - CRITICAL: Written File Output in workflows will be +2sd your communication style and use professional {communication_language}.
  </rules>
</activation>
  <persona>
    <role>Research Master Executor + Knowledge Custodian + Workflow Orchestrator</role>
    <identity>Master-level expert in the Research Module with comprehensive knowledge of all research resources, workflows, and capabilities. Serves as the primary execution engine for research operations.</identity>
    <communication_style>Direct and comprehensive. Expert-level communication focused on efficient research execution, presenting information systematically using numbered lists with immediate command response capability.</communication_style>
    <principles>Load resources at runtime never pre-load. Always present numbered lists for choices. Guide users through research with clarity.</principles>
  </persona>
  <menu>
    <item cmd="*help">Show numbered menu</item>
    <item cmd="*research" workflow="{project-root}/.bmad/general-research/workflows/research/workflow.yaml">Start interactive research with 5 approval checkpoints</item>
    <item cmd="*scrape" workflow="{project-root}/.bmad/general-research/workflows/scrape/workflow.yaml">Execute web scraping with source selection</item>
    <item cmd="*refine" workflow="{project-root}/.bmad/general-research/workflows/refine/workflow.yaml">Refine previously scraped content</item>
    <item cmd="*sources" action="Load and display all source hierarchies from {project-root}/.bmad/general-research/data/_default-sources/">View default source hierarchies by topic type</item>
    <item cmd="*config" action="Display current configuration from {project-root}/.bmad/general-research/config.yaml">Show current settings</item>
    <item cmd="*party-mode" exec="{project-root}/.bmad/core/workflows/party-mode/workflow.md">Consult with other expert agents from the party</item>
    <item cmd="*exit">Exit with confirmation</item>
  </menu>
</agent>
```

---

### 4.2 Web Scraper Agent

**Role:** Source Selection and Content Extraction Specialist

**Purpose:** Specialized agent for web scraping operations. Handles topic analysis, source selection, reliability scoring, and content extraction.

**File:** `agents/web-scraper.md`

#### 4.2.1 Complete Agent Definition (XML Format)

```xml
<agent id=".bmad/general-research/agents/web-scraper.md" name="Web Scraper" title="Web Scraper" icon="🔍">
<activation critical="MANDATORY">
  <step n="1">Load persona from this current agent file (already in context)</step>
  <step n="2">🚨 IMMEDIATE ACTION REQUIRED - BEFORE ANY OUTPUT:
      - Load and read {project-root}/{bmad_folder}/general-research/config.yaml NOW
      - Store ALL fields as session variables: {user_name}, {communication_language}, {output_folder}
      - VERIFY: If config not loaded, STOP and report error to user
      - DO NOT PROCEED to step 3 until config is successfully loaded and variables stored</step>
  <step n="3">Remember: user's name is {user_name} (if available, otherwise omit from greeting)</step>

  <step n="4">Show greeting using {user_name} from config (if available), communicate in {communication_language}, then display numbered list of
      ALL menu items from menu section</step>
  <step n="5">STOP and WAIT for user input - do NOT execute menu items automatically - accept number or cmd trigger or fuzzy command
      match</step>
  <step n="6">On user input: Number → execute menu item[n] | Text → case-insensitive substring match | Multiple matches → ask user
      to clarify | No match → show "Not recognized"</step>
  <step n="7">When executing a menu item: Check menu-handlers section below - extract any attributes from the selected menu item
      (workflow, exec, tmpl, data, action) and follow the corresponding handler instructions</step>

  <menu-handlers>
      <handlers>
  <handler type="workflow">
    When menu item has: workflow="path/to/workflow.yaml"
    1. CRITICAL: Always LOAD {project-root}/{bmad_folder}/core/tasks/workflow.xml
    2. Read the complete file - this is the CORE OS for executing BMAD workflows
    3. Pass the yaml path as 'workflow-config' parameter to those instructions
    4. Execute workflow.xml instructions precisely following all steps
    5. Save outputs after completing EACH workflow step (never batch multiple steps together)
    6. If workflow.yaml path is "todo", inform user the workflow hasn't been implemented yet
  </handler>
  <handler type="exec">
    When menu item has: exec="path/to/file.md"
    Actually LOAD and EXECUTE the file at that path - do not improvise
    Read the complete file and follow all instructions within it
    If there is data="some/path/data-foo.md", pass that data to the executed file as context.
  </handler>
    </handlers>
  </menu-handlers>

  <rules>
    - ALWAYS communicate in {communication_language} UNLESS contradicted by communication_style
    - Stay in character until exit selected
    - Menu triggers use asterisk (*) - NOT markdown, display exactly as shown
    - Number all lists, use letters for sub-options
    - Load files ONLY when executing menu items or a workflow or command requires it. EXCEPTION: Config file MUST be loaded at startup step 2
    - CRITICAL: Written File Output in workflows will be +2sd your communication style and use professional {communication_language}.
  </rules>
</activation>
  <persona>
    <role>Source Selection + Content Extraction Specialist</role>
    <identity>Expert in web scraping with deep knowledge of source reliability, content extraction, and ethical scraping practices.</identity>
    <communication_style>Analytical and methodical - precise, clear directions. Reports progress systematically.</communication_style>
    <principles>Quality over quantity - prioritize reliable sources. Transparency at every step. Respect robots.txt and rate limits. Plan-Review-Approve pattern.</principles>
  </persona>
  <menu>
    <item cmd="*help">Show numbered menu</item>
    <item cmd="*scrape" workflow="{project-root}/.bmad/general-research/workflows/scrape/workflow.yaml">Execute web scraping with source selection</item>
    <item cmd="*sources" action="Load and display all source hierarchies from {project-root}/.bmad/general-research/data/_default-sources/">View default source hierarchies by topic type</item>
    <item cmd="*party-mode" exec="{project-root}/.bmad/core/workflows/party-mode/workflow.md">Consult with other expert agents from the party</item>
    <item cmd="*exit">Exit with confirmation</item>
  </menu>
</agent>
```

#### 4.2.2 Core Capabilities

```yaml
capabilities:
  topic_analysis:
    - Parse research query
    - Identify topic category (academic, technical, general, recipes)
    - Determine scope boundaries
    - Assess depth requirements

  source_selection:
    - Load default or custom source hierarchies
    - Calculate multi-factor reliability scores
    - Rank sources by reliability
    - Apply blacklist filtering

  content_extraction:
    - Execute via Playwright (JavaScript support)
    - Respect robots.txt
    - Apply rate limiting (2s default)
    - Extract main content, metadata, citations

  progress_tracking:
    - Real-time progress display
    - Quality score updates
    - Source-level status reporting
    - Interrupt handling (pause/stop/skip)
```

#### 4.2.3 Source Selection Intelligence

```yaml
source_selection:
  topic_types:
    - academic_research
    - technical_documentation
    - general_knowledge
    - recipes_lifestyle

  reliability_factors:
    domain_authority:
      weight: 0.3
      indicators:
        - domain_age
        - ssl_certificate
        - academic_government_domain (.edu, .gov bonus)

    content_quality:
      weight: 0.4
      indicators:
        - citations_present
        - author_credentials
        - publication_date
        - update_frequency

    community_trust:
      weight: 0.2
      indicators:
        - external_links
        - search_ranking
        - peer_citations

    technical_markers:
      weight: 0.1
      indicators:
        - structured_data
        - proper_metadata
        - content_consistency
```

#### 4.2.4 Quality Thresholds

```yaml
quality_thresholds:
  min_reliability_score: 0.7 # Sources below this are filtered
  min_content_depth_words: 500 # Minimum substantive content
  max_duplicate_content_percent: 25 # Maximum allowed overlap
```

---

### 4.3 Knowledge Refiner Agent

**Role:** Content Refinement and Organization Specialist

**Purpose:** Specialized agent for content refinement. Handles filtering, deduplication, organization, and cross-referencing of scraped content.

**File:** `agents/knowledge-refiner.md`

#### 4.3.1 Complete Agent Definition (XML Format)

```xml
<agent id=".bmad/general-research/agents/knowledge-refiner.md" name="Knowledge Refiner" title="Knowledge Refiner" icon="📝">
<activation critical="MANDATORY">
  <step n="1">Load persona from this current agent file (already in context)</step>
  <step n="2">🚨 IMMEDIATE ACTION REQUIRED - BEFORE ANY OUTPUT:
      - Load and read {project-root}/{bmad_folder}/general-research/config.yaml NOW
      - Store ALL fields as session variables: {user_name}, {communication_language}, {output_folder}
      - VERIFY: If config not loaded, STOP and report error to user
      - DO NOT PROCEED to step 3 until config is successfully loaded and variables stored</step>
  <step n="3">Remember: user's name is {user_name} (if available, otherwise omit from greeting)</step>

  <step n="4">Show greeting using {user_name} from config (if available), communicate in {communication_language}, then display numbered list of
      ALL menu items from menu section</step>
  <step n="5">STOP and WAIT for user input - do NOT execute menu items automatically - accept number or cmd trigger or fuzzy command
      match</step>
  <step n="6">On user input: Number → execute menu item[n] | Text → case-insensitive substring match | Multiple matches → ask user
      to clarify | No match → show "Not recognized"</step>
  <step n="7">When executing a menu item: Check menu-handlers section below - extract any attributes from the selected menu item
      (workflow, exec, tmpl, data, action) and follow the corresponding handler instructions</step>

  <menu-handlers>
      <handlers>
  <handler type="workflow">
    When menu item has: workflow="path/to/workflow.yaml"
    1. CRITICAL: Always LOAD {project-root}/{bmad_folder}/core/tasks/workflow.xml
    2. Read the complete file - this is the CORE OS for executing BMAD workflows
    3. Pass the yaml path as 'workflow-config' parameter to those instructions
    4. Execute workflow.xml instructions precisely following all steps
    5. Save outputs after completing EACH workflow step (never batch multiple steps together)
    6. If workflow.yaml path is "todo", inform user the workflow hasn't been implemented yet
  </handler>
  <handler type="exec">
    When menu item has: exec="path/to/file.md"
    Actually LOAD and EXECUTE the file at that path - do not improvise
    Read the complete file and follow all instructions within it
    If there is data="some/path/data-foo.md", pass that data to the executed file as context.
  </handler>
    </handlers>
  </menu-handlers>

  <rules>
    - ALWAYS communicate in {communication_language} UNLESS contradicted by communication_style
    - Stay in character until exit selected
    - Menu triggers use asterisk (*) - NOT markdown, display exactly as shown
    - Number all lists, use letters for sub-options
    - Load files ONLY when executing menu items or a workflow or command requires it. EXCEPTION: Config file MUST be loaded at startup step 2
    - CRITICAL: Written File Output in workflows will be +2sd your communication style and use professional {communication_language}.
  </rules>
</activation>
  <persona>
    <role>Content Curator + Knowledge Architect</role>
    <identity>Expert in content refinement who transforms raw data into polished knowledge, finding patterns and structure.</identity>
    <communication_style>Meticulous and focused on patterns and structure. Reports findings systematically.</communication_style>
    <principles>Clarity through organization. Remove noise, amplify signal. Cross-reference for depth. Preserve attribution always.</principles>
  </persona>
  <menu>
    <item cmd="*help">Show numbered menu</item>
    <item cmd="*refine" workflow="{project-root}/.bmad/general-research/workflows/refine/workflow.yaml">Refine and organize scraped content</item>
    <item cmd="*party-mode" exec="{project-root}/.bmad/core/workflows/party-mode/workflow.md">Consult with other expert agents from the party</item>
    <item cmd="*exit">Exit with confirmation</item>
  </menu>
</agent>
```

#### 4.3.2 Core Capabilities

```yaml
capabilities:
  content_filtering:
    - remove_duplicates (similarity >= 85%)
    - filter_low_quality (< 500 words)
    - extract_key_findings
    - identify_contradictions

  structure_enhancement:
    - organize_by_theme
    - create_hierarchy
    - generate_table_of_contents
    - add_section_summaries

  redundancy_removal:
    - detect_duplicate_content
    - merge_similar_sections
    - consolidate_citations
    - remove_boilerplate

  cross_reference_generation:
    - link_related_concepts
    - create_glossary_entries
    - map_source_relationships
    - generate_topic_index
```

#### 4.3.3 Detail Levels

```yaml
detail_levels:
  minimal:
    description: 'Brief summaries only'
    max_words: 1000
    include_citations: true
    include_analysis: false
    include_excerpts: false

  standard:
    description: 'Balanced detail'
    max_words: 3000
    include_citations: true
    include_analysis: true
    include_excerpts: false

  detailed:
    description: 'Comprehensive information'
    max_words: 10000
    include_citations: true
    include_analysis: true
    include_excerpts: true
```

---

## 5. Workflow Specifications

### 5.1 Research Workflow (Primary)

**Purpose:** End-to-end research pipeline with 5 approval checkpoints

**File:** `workflows/research/`

#### 5.1.1 Workflow Configuration

```yaml
name: 'research'
description: 'End-to-end research pipeline with 5 approval checkpoints'
author: 'Research Module'

config_source: '{project-root}/.bmad/general-research/config.yaml'
variables:
  - output_folder
  - research_output_path
  - user_name (optional)
  - communication_language
  - default_topic_type
  - detail_level
  - auto_approve_high_reliability
  - date: system-generated

installed_path: '{project-root}/.bmad/general-research/workflows/research'
template: '{installed_path}/template.md'
instructions: '{installed_path}/instructions.md'

state_path: '{project-root}/.general-research/state'
default_output_file: '{research_output_path}/research-{{topic_slug}}-{{date}}.md'

standalone: true
```

#### 5.1.2 Approval Checkpoints

| #   | Checkpoint          | User Sees                                            | Actions Available                     |
| --- | ------------------- | ---------------------------------------------------- | ------------------------------------- |
| 1   | **Plan**            | Research plan with topic analysis, estimated sources | Approve, Modify, Cancel               |
| 2   | **Source List**     | Ranked sources with reliability scores               | Approve All, Remove, Add, Cancel      |
| 3   | **Quality Check**   | Results summary, sample quality scores               | Continue, Adjust, Discard             |
| 4   | **Refinement Plan** | Strategy, organization approach                      | Approve, Modify, Skip                 |
| 5   | **Final Review**    | Preview of final document                            | Save, View Full, Refine More, Discard |

#### 5.1.3 Step-by-Step Flow

```
Step 1: Gather research query and analyze topic
  - Ask user for topic/query
  - Load topic config if path provided
  - Analyze query for topic type, scope, depth
  - Generate topic_slug for file naming
  → template-output: topic_analysis

Step 2: CHECKPOINT 1 - Present Research Plan
  - Generate plan: topic, estimated sources, expected results
  - Display with clear formatting
  - ASK: Approve / Modify / Cancel
  - Save checkpoint state
  → template-output: research_plan

Step 3: Select and rank sources
  - Load default or custom source hierarchies
  - Calculate reliability scores (4-factor weighted)
  - Filter below 0.7 threshold
  - Apply blacklist
  → template-output: source_ranking

Step 4: CHECKPOINT 2 - Present Source List
  - Display ranked sources with scores
  - ASK: Approve All / Remove / Add / Cancel
  - Save checkpoint state
  → template-output: approved_sources

Step 5: Execute scraping with progress
  - Initialize session, create state file
  - For each source: robots.txt → rate limit → scrape → extract → score
  - Display real-time progress
  - Handle interrupts (pause/stop/skip)
  → template-output: scrape_results

Step 6: CHECKPOINT 3 - Quality Check
  - Aggregate metrics: items, quality, diversity
  - Show sample high-quality result
  - ASK: Continue / Adjust / Discard
  - Save checkpoint state
  → template-output: quality_check

Step 7: Generate refinement plan
  - Analyze for duplicates, gaps, contradictions
  - Generate organization strategy by detail_level
  - Create section outline
  → template-output: refinement_plan

Step 8: CHECKPOINT 4 - Refinement Plan Approval
  - Display strategy and structure
  - ASK: Approve / Modify / Skip
  - Save checkpoint state
  → template-output: refinement_plan_approved

Step 9: Execute content refinement
  - Invoke refine workflow
  - Remove duplicates, organize, format
  - Generate cross-references, citations
  → template-output: refined_content

Step 10: CHECKPOINT 5 - Final Review
  - Generate preview (summary + structure)
  - ASK: Save / View Full / Refine More / Discard
  → template-output: final_document

Step 11: Save and complete
  - Save to research_output_path
  - Clean up state files
  - Display completion message
  → template-output: completion
```

---

### 5.2 Scrape Workflow

**Purpose:** Execute web scraping with source selection and reliability scoring

**File:** `workflows/scrape/`

#### 5.2.1 Configuration

```yaml
name: 'scrape'
description: 'Web scraping with intelligent source selection'
standalone: true
template: false # No document output, returns data

scraping_config:
  default_delay_ms: 2000
  max_retries: 3
  backoff_multiplier: 2
  min_content_length: 100
  max_content_length: 50000
  respect_robots_txt: true
  user_agent: 'GeneralResearch/1.0 (Educational Research Tool)'
```

#### 5.2.2 Step Flow

```
Step 1: Initialize session
  - Check standalone vs invoked from research workflow
  - If standalone: ask for topic, load default sources
  - Generate session_id, create state file

Step 2: Load and rank sources
  - Load source hierarchies for topic_type
  - Calculate reliability scores
  - Filter below threshold, sort descending

Step 3: Execute scraping (for each source)
  - Display progress bar
  - Check robots.txt → Skip if disallowed
  - Apply rate limiting
  - Fetch via Playwright
  - Extract content, metadata, citations
  - Calculate quality score
  - Store result JSON
  - Update state checkpoint
  - Handle interrupts

Step 4: Handle errors and retries
  - source_unavailable → skip with warning
  - rate_limited → exponential backoff, max 3 retries
  - extraction_failed → log, skip, flag

Step 5: Aggregate and summarize
  - Compile successful results
  - Calculate aggregate metrics
  - Save to output file
  - Clean up intermediate state
```

---

### 5.3 Refine Workflow

**Purpose:** Filter, enhance, and organize scraped content

**File:** `workflows/refine/`

#### 5.3.1 Configuration

```yaml
name: 'refine'
description: 'Content refinement and organization'
standalone: true
template: '{installed_path}/template.md'

refinement_config:
  similarity_threshold: 0.85
  detail_levels:
    minimal: { max_words: 1000 }
    standard: { max_words: 3000 }
    detailed: { max_words: 10000 }
  organization_methods:
    - by_theme
    - by_chronology
    - by_importance
    - by_source_type

quality_requirements:
  min_source_diversity: 3
  max_duplicate_percent: 25
  require_citations: true
```

#### 5.3.2 Step Flow

```
Step 1: Load and analyze content
  - Load scraped content (from input or file path)
  - Count items, words, themes
  - Detect duplicate clusters
  - Map source diversity

Step 2: Remove duplicates and filter
  - Identify clusters >= 85% similarity
  - Select highest quality version from each
  - Remove items < 500 words
  - Remove unattributed content

Step 3: Organize by structure
  - Determine organization strategy by content type
  - Create section outline
  - Assign items to sections
  - Order by relevance and quality

Step 4: Generate content by detail level
  - Apply word limits per detail_level
  - Synthesize narratives
  - Highlight agreements/contradictions
  - Add section summaries

Step 5: Generate cross-references
  - Link related concepts
  - Create concept index/glossary
  - Map source relationships

Step 6: Format citations
  - Consistent citation format
  - In-text citations linked
  - Source reliability notes

Step 7: Generate executive summary
  - Answer research question (2-3 sentences)
  - Key discoveries
  - Confidence level
  - Gaps/limitations

Step 8: Quality check
  - Verify source diversity >= 3
  - Verify duplicate <= 25%
  - Verify all citations present
  - Calculate final quality score

Step 9: Output refined document
  - Compile using template
  - Save to output file
  - Return to calling workflow
```

---

## 6. Data Architecture

### 6.1 Source Hierarchy Structure

Each topic type has a source hierarchy file in `data/_default-sources/`:

```yaml
# Example: academic-research.yaml
topic_type: academic_research
description: 'Sources for academic papers and scholarly articles'

sources:
  priority_1: # Primary, most reliable
    - domain: 'scholar.google.com'
      name: 'Google Scholar'
      base_reliability: 0.95
      notes: 'Comprehensive academic search'

  priority_2: # Secondary, reliable
    - domain: 'researchgate.net'
      base_reliability: 0.80

  priority_3: # Tertiary, verify quality
    - domain: 'academia.edu'
      base_reliability: 0.75

blacklist: # Never use
  - domain: 'twitter.com'
    reason: 'Social media - not peer reviewed'

quality_indicators:
  required: [citations, peer_review]
  preferred: [doi, author_credentials]
```

### 6.2 Topic Types

| Type                      | Primary Sources                              | Avoid                                |
| ------------------------- | -------------------------------------------- | ------------------------------------ |
| `academic_research`       | Google Scholar, PubMed, ArXiv, IEEE, JSTOR   | Social media, forums, blogs          |
| `technical_documentation` | Official docs, GitHub, Stack Overflow, MDN   | Outdated tutorials, unverified blogs |
| `general_knowledge`       | Wikipedia, Britannica, news sites, .gov/.edu | N/A                                  |
| `recipes_lifestyle`       | Serious Eats, Food Network, AllRecipes       | N/A                                  |

### 6.3 User Configuration Structure

Optional user configs at `.general-research/topics/[topic-name].yaml`:

```yaml
topic: machine_learning_research
description: 'Configuration for ML/AI research'

sources:
  priority_1: [arxiv.org, papers.nips.cc]
  priority_2: [github.com/papers-with-code]
  blacklist: [reddit.com]

quality_indicators:
  required: [citations, peer_review]
  preferred: [code_availability]

content_rules:
  min_depth: 1000
  require_references: true

output_preferences:
  format: markdown
  include_citations: true
  summary_length: detailed
```

### 6.4 State Management

Session state stored at `.general-research/state/[session-id].json`:

```json
{
  "session_id": "abc123",
  "topic": "machine learning transformers",
  "topic_type": "academic_research",
  "started_at": "2025-12-03T10:00:00Z",
  "current_step": 5,
  "last_checkpoint": "source_list",
  "approved_sources": [...],
  "scrape_results": [...],
  "progress": {
    "sources_total": 12,
    "sources_completed": 8,
    "quality_avg": 8.2
  }
}
```

---

## 7. Configuration System

### 7.1 Installation Configuration

File: `_module-installer/install-config.yaml`

```yaml
code: 'general-research'
name: 'General Research Module'
default_selected: false

prompt:
  - 'Welcome to the General Research Module.'
  - 'Intelligent web research with source selection and content refinement.'

# Interactive fields (ask during install)
research_output_path:
  prompt: 'Where should research outputs be saved?'
  default: '.research'
  result: '{project-root}/{value}'

default_topic_type:
  prompt: 'What type of research do you primarily do?'
  default: 'technical_documentation'
  single-select:
    - value: 'academic_research'
      label: 'Academic Research'
    - value: 'technical_documentation'
      label: 'Technical Documentation'
    - value: 'general_knowledge'
      label: 'General Knowledge'
    - value: 'recipes_lifestyle'
      label: 'Recipes & Lifestyle'

detail_level:
  prompt: 'How detailed should outputs be?'
  default: 'standard'
  single-select:
    - value: 'minimal'
      label: 'Minimal (max 1000 words)'
    - value: 'standard'
      label: 'Standard (max 3000 words)'
    - value: 'detailed'
      label: 'Detailed (max 10000 words)'

auto_approve_high_reliability:
  prompt: 'Auto-approve high-reliability sources (>0.9)?'
  default: 'false'
  single-select:
    - value: 'true'
      label: 'Yes - Skip approval for trusted sources'
    - value: 'false'
      label: 'No - Always approve manually'

# Static fields (not prompted)
module_version:
  result: '1.0.0'

config_path:
  result: '{project-root}/.general-research'

state_path:
  result: '{project-root}/.general-research/state'

min_reliability_score:
  result: '0.7'
```

### 7.2 Runtime Configuration

Generated at `.bmad/general-research/config.yaml` during installation:

```yaml
# Core values (inherited from installer)
bmad_folder: .bmad
user_name: Zee
communication_language: English
output_folder: '{project-root}/.docs'

# Module-specific values
research_output_path: '{project-root}/.research'
default_topic_type: technical_documentation
detail_level: standard
auto_approve_high_reliability: false
module_version: 1.0.0
config_path: '{project-root}/.general-research'
state_path: '{project-root}/.general-research/state'
min_reliability_score: 0.7
```

---

## 8. Quality & Reliability System

### 8.1 Reliability Scoring Formula

```
reliability_score =
  (domain_authority × 0.3) +
  (content_quality × 0.4) +
  (community_trust × 0.2) +
  (technical_markers × 0.1)
```

### 8.2 Factor Calculations

**Domain Authority (0.3):**

- .edu/.gov domain: +0.15
- SSL certificate: +0.05
- Domain age > 5 years: +0.10

**Content Quality (0.4):**

- Has citations: +0.15
- Has author credentials: +0.10
- Published within 2 years: +0.10
- Regular updates: +0.05

**Community Trust (0.2):**

- High external link count: +0.10
- Top 10 search ranking: +0.05
- Cited by peers: +0.05

**Technical Markers (0.1):**

- Structured data (schema.org): +0.03
- Proper meta tags: +0.04
- Consistent formatting: +0.03

### 8.3 Thresholds

| Threshold         | Value     | Rationale                           |
| ----------------- | --------- | ----------------------------------- |
| Min reliability   | 0.7       | Balance quality with availability   |
| Min content depth | 500 words | Ensure substantive content          |
| Max duplicate     | 25%       | Allow some overlap, catch egregious |

### 8.4 Quality Assessment for Refined Output

```yaml
quality_assessment:
  content_depth:
    weight: 0.3
    thresholds: { excellent: 0.9, good: 0.7, acceptable: 0.5 }

  source_diversity:
    weight: 0.2
    min_sources: 3

  coherence:
    weight: 0.25
    checks: [logical_flow, consistent_terminology, clear_transitions]

  completeness:
    weight: 0.25
    checks: [topic_coverage, question_answered, gaps_identified]
```

---

## 9. Error Handling & Recovery

### 9.1 Error Types and Recovery

| Error Type                 | Recovery Behavior                                    |
| -------------------------- | ---------------------------------------------------- |
| Source unavailable         | Skip with warning, continue to next source           |
| Rate limiting              | Exponential backoff (1s→2s→4s→8s), max 3 retries     |
| Content extraction failure | Log failure, skip source, flag at quality checkpoint |
| Quality threshold not met  | Flag at checkpoint, let user decide include/exclude  |
| Network timeout            | Retry once after 5s, then skip                       |
| Invalid robots.txt         | Assume disallow, skip source                         |
| State file corruption      | Offer to restart or recover partial data             |

### 9.2 Exponential Backoff

```python
def backoff(attempt):
    delay = min(1 * (2 ** attempt), 8)  # 1s, 2s, 4s, 8s max
    sleep(delay)
```

### 9.3 Graceful Degradation Pattern

```
1. Attempt operation
2. On failure:
   a. Log warning with details
   b. Attempt recovery/retry if applicable
   c. If unrecoverable, skip with notification
   d. Continue to next item
3. Aggregate failures for checkpoint review
4. Let user decide at checkpoint (include/exclude/retry)
```

---

## 10. User Experience Patterns

### 10.1 Progress Display Format

```
[Web Scraper] Analyzing sources... ████████░░ 8/12 sources
              Quality: 8.2/10 | Results: 47 items | ETA: ~2 min
              Current: arxiv.org → Fetching machine learning papers...
```

### 10.2 Checkpoint Display Format

```
═══════════════════════════════════════════════════════════
  CHECKPOINT 2: Source List
═══════════════════════════════════════════════════════════

| # | Source              | Reliability | Status   |
|---|---------------------|-------------|----------|
| 1 | arxiv.org           | 0.95        | ✓ Ready  |
| 2 | scholar.google.com  | 0.92        | ✓ Ready  |
| 3 | medium.com          | 0.68        | ✗ Below threshold |

Please choose:
  [A] Approve All - Proceed with listed sources
  [R] Remove     - Remove specific sources (enter numbers)
  [+] Add        - Add a specific source URL
  [C] Cancel     - Abort research

Your choice: _
```

### 10.3 Interrupt Commands

| Command  | Action                                        |
| -------- | --------------------------------------------- |
| `pause`  | Pause at next safe point, preserve state      |
| `stop`   | Stop immediately, save progress, offer resume |
| `skip`   | Skip current source, continue to next         |
| `resume` | Resume from last checkpoint                   |

### 10.4 Completion Message Format

```
═══════════════════════════════════════════════════════════
  ✨ Research Complete!
═══════════════════════════════════════════════════════════

Saved to: .research/research-ml-transformers-2025-12-03.md

Summary:
  • Topic: Machine Learning Transformers
  • Sources: 8 high-quality sources
  • Output: 2,847 words with 23 citations
  • Quality Score: 8.4/10

Thank you for using the General Research Module!
═══════════════════════════════════════════════════════════
```

---

## 11. Installation & Deployment

### 11.1 Prerequisites

- BMAD Core installed
- Node.js (for Playwright scraper)
- Playwright browser binaries

### 11.2 Installation Steps

```bash
# 1. Run BMAD installer
bmad install

# 2. Select "General Research Module"

# 3. Answer configuration questions:
#    - Output path (.research)
#    - Default topic type
#    - Detail level
#    - Auto-approve setting

# 4. Compile agents
# (Installer handles this automatically)
```

### 11.3 Post-Installation Structure

```
{project-root}/
├── .bmad/
│   └── general-research/
│       ├── agents/
│       │   ├── research-master.md    # Compiled
│       │   ├── web-scraper.md        # Compiled
│       │   └── knowledge-refiner.md  # Compiled
│       ├── workflows/
│       │   ├── research/
│       │   ├── scrape/
│       │   └── refine/
│       ├── data/
│       │   └── _default-sources/
│       └── config.yaml
├── .general-research/
│   ├── topics/                       # User configs
│   └── state/                        # Session state
└── .research/                        # Output directory
```

### 11.4 Usage

```bash
# Load the Research Master
/bmad:general-research:agents:research-master

# Or load specific agents
/bmad:general-research:agents:web-scraper
/bmad:general-research:agents:knowledge-refiner

# Run workflows directly
/bmad:general-research:workflows:research
```

---

## 12. Extension Guidelines

### 12.1 Adding New Agents

1. Create `agents/[agent-name].md`
2. Follow persona structure from existing agents
3. Define menu items and handlers
4. Update Research Master menu if needed
5. Document in README.md

### 12.2 Adding New Workflows

1. Create `workflows/[workflow-name]/` directory
2. Add `workflow.yaml` with configuration
3. Add `instructions.md` with step-by-step logic
4. Add `template.md` if document output
5. Reference from agent menus
6. Document in README.md

### 12.3 Adding New Source Types

1. Create `data/_default-sources/[type].yaml`
2. Follow existing structure:
   - topic_type
   - sources (priority_1, priority_2, priority_3)
   - blacklist
   - quality_indicators
3. Update topic_types list in agents
4. Test with sample queries

### 12.4 Phase 2 Features (Planned)

- **Config Creator Agent** - Interactive config creation
- **Create-Config Workflow** - YAML generation
- **Validate-Config Workflow** - Config testing
- **Custom reliability weights** - User-defined scoring

### 12.5 Phase 3 Features (Planned)

- Multiple export formats (PDF, JSON, HTML)
- Source reliability learning
- Template library expansion
- Batch research capability

---

## Appendix A: Complete File Listing

| File                                                 | Purpose                       |
| ---------------------------------------------------- | ----------------------------- |
| `agents/research-master.md`                          | Primary orchestrator agent    |
| `agents/web-scraper.md`                              | Source selection and scraping |
| `agents/knowledge-refiner.md`                        | Content refinement            |
| `workflows/research/workflow.yaml`                   | Research workflow config      |
| `workflows/research/instructions.md`                 | Research workflow steps       |
| `workflows/research/template.md`                     | Research output template      |
| `workflows/scrape/workflow.yaml`                     | Scrape workflow config        |
| `workflows/scrape/instructions.md`                   | Scrape workflow steps         |
| `workflows/refine/workflow.yaml`                     | Refine workflow config        |
| `workflows/refine/instructions.md`                   | Refine workflow steps         |
| `workflows/refine/template.md`                       | Refine output template        |
| `data/_default-sources/academic-research.yaml`       | Academic sources              |
| `data/_default-sources/technical-documentation.yaml` | Tech sources                  |
| `data/_default-sources/general-knowledge.yaml`       | General sources               |
| `data/_default-sources/recipes-lifestyle.yaml`       | Lifestyle sources             |
| `_module-installer/install-config.yaml`              | Installation config           |
| `README.md`                                          | Module documentation          |
| `TODO.md`                                            | Development roadmap           |
| `docs/research-module-design-specification.md`       | This document                 |

---

## Appendix B: Version History

| Version | Date       | Author | Changes               |
| ------- | ---------- | ------ | --------------------- |
| 1.0.0   | 2025-12-03 | Zee    | Initial specification |

---

_This document serves as the complete blueprint for recreating the Research Module from scratch. All design decisions, agent specifications, workflow logic, and configuration systems are documented here for future reference and implementation._
