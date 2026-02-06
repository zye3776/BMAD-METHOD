# Create Migration Plan - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>Communicate in {communication_language} throughout the planning process</critical>
<critical>Phase 1 Visual Migration: PRESERVE source HTML and CSS EXACTLY - perform minimal code changes</critical>
<critical>Phase 3 Standards Migration: Gradual human-in-loop transformation to target conventions</critical>

<workflow>

<step n="0" goal="Load required context">
<invoke-protocol name="discover_inputs" />
<action>Verify source architecture document is loaded</action>
<check if="source_architecture_content is empty">
  <action>ERROR: Source analysis required before planning</action>
  <action>Instruct user to run analyze-source workflow first</action>
  <goto step="end">Exit workflow</goto>
</check>

<action>Load target project coding standards from {coding_standards_path}</action>
<check if="coding standards not found">
<ask>Coding standards document not found at {coding_standards_path}. Please provide the path to your project's coding standards document:</ask>
<action>Load coding standards from provided path</action>
</check>
</step>

<step n="1" goal="Analyze target project structure">
<action>Scan target project (excluding submodule) for:</action>
  - Existing components location and structure
  - Current styling approach
  - State management patterns
  - TypeScript conventions
  - Test file conventions
  - File naming patterns

<action>Document target project patterns</action>

<template-output section="target-analysis">
## Target Project Analysis

### Structure

- **Components Location:** {{target_components_path}}
- **Styles Location:** {{target_styles_path}}
- **Tests Location:** {{target_tests_pattern}}

### Conventions

- **Component Style:** {{target_component_style}}
- **Styling Method:** {{target_styling_method}}
- **State Management:** {{target_state_management}}
- **TypeScript Style:** {{target_ts_style}}
- **File Naming:** {{target_file_naming}}
- **Test Naming:** {{target_test_naming}}
  </template-output>
  </step>

<step n="2" goal="Select migration scope">
<action>Present migration mode options based on source analysis:</action>

<ask>
Select your migration mode:

**[R] Refresh** - Update existing UI visuals

- Use when: You have existing components you want to redesign
- Effect: Creates new versions of existing components

**[A] Addition** - Add new UI elements

- Use when: Adding new pages, panels, or features
- Effect: Creates entirely new components in target

**[E] Extraction** - Cherry-pick specific components

- Use when: You only need certain pieces from source
- Effect: Migrates only selected components

Which mode? [R/A/E]
</ask>

<action>Store selected migration_mode</action>

<check if="migration_mode is Extraction">
  <action>Display component inventory from source analysis</action>
  <ask>Which components do you want to extract? (comma-separated list or "all" for full list to select from)</ask>
  <action>Store selected_components list</action>
</check>

<check if="migration_mode is Refresh">
  <ask>Which existing components should be refreshed? (provide paths or patterns)</ask>
  <action>Map source components to target components for refresh</action>
  <action>Store refresh_mapping</action>
</check>

<template-output section="scope">
## Migration Scope

### Mode: {{migration_mode}}

### Components in Scope

{{components_in_scope_list}}

### Out of Scope

{{components_out_of_scope}}
</template-output>
</step>

<step n="3" goal="Define three-phase migration strategy">
<critical>Migration follows a THREE-PHASE approach: Visual Preservation → Logic Integration → Gradual Standards Migration</critical>

<action>Explain the three-phase strategy to the user:</action>

**PHASE 1: VISUAL MIGRATION (EXACT PRESERVATION)**
<critical>This phase performs AS LITTLE CODE CHANGES AS POSSIBLE</critical>

- Transfer HTML elements EXACTLY as they appear in source - no restructuring
- Preserve ALL CSS classes and Tailwind styling VERBATIM from source
- Keep ALL hardcoded/mock data from source as-is
- Create ISOLATED Tailwind configuration to sandbox source styling
- No styling transformations to match target conventions
- Goal: Pixel-perfect visual match to source UI
- Validation: Visual approval from stakeholders

**Why Exact Preservation Matters:**

- Minor styling changes accumulate into hard-to-debug visual bugs
- Wrong fonts, missing elements, broken layouts are VERY difficult to fix later
- Styling conflicts between source and target Tailwind configs cause subtle issues
- Human eyes catch visual regressions that automated tests miss

**PHASE 2: LOGIC INTEGRATION (Real Data)**

- Connect migrated components to real data sources
- Replace hardcoded data with API calls, database queries, file reads
- Integrate with target project's state management
- Wire up business logic, validation, and handlers
- Validation: Functional testing with real data

**PHASE 3: STANDARDS MIGRATION (Human-in-Loop)**
<critical>This phase is GRADUAL and requires human validation at each step</critical>

- Slowly, bit-by-bit transform to target project conventions
- Real users validate each visual change before proceeding
- Merge isolated Tailwind config into target config incrementally
- Update CSS classes one component at a time
- Refactor component structure to match target patterns
- Goal: Eventually match target project's coding and UI/UX standards
- Validation: Human approval at EVERY significant change

<action>Document benefits of this approach:</action>

- Reduces risk by isolating visual, logic, and standards concerns
- Enables early visual validation before ANY transformations
- Exact preservation catches styling issues immediately
- Makes debugging trivial (source styling works → only our changes break things)
- Human-in-loop prevents accumulated visual regressions
- Provides rollback points at each phase

<template-output section="migration-strategy">
## Three-Phase Migration Strategy

### Why Three Phases?

Migrating UI components in three distinct phases dramatically reduces risk and ensures quality:

| Phase       | Focus               | Changes                         | Validation             |
| ----------- | ------------------- | ------------------------------- | ---------------------- |
| **Phase 1** | Visual preservation | MINIMAL - exact source transfer | Visual approval        |
| **Phase 2** | Logic integration   | Data connections only           | Functional testing     |
| **Phase 3** | Standards migration | Gradual, human-validated        | Human-in-loop approval |

### Phase 1: Visual Migration (EXACT PRESERVATION)

<critical>PERFORM AS LITTLE CODE CHANGES AS POSSIBLE</critical>

**Objective:** Transfer components with EXACT visual fidelity - no styling transformations.

**Core Principle:**
Minor styling issues (wrong fonts, missing elements, broken CSS classes) are EXTREMELY hard to debug if introduced during migration. By preserving source styling exactly, we ensure any visual bugs are immediately attributable to our changes, not accumulated transformation errors.

**What Gets Transferred EXACTLY:**

- HTML/JSX structure - VERBATIM, no restructuring
- ALL CSS classes - copied exactly as-is
- ALL Tailwind classes - preserved without modification
- Inline styles - kept unchanged
- Static assets (images, icons, fonts)
- Hardcoded display data (exactly as in source)

**Isolated Tailwind Configuration:**
To prevent styling conflicts between source and target projects:

1. Create temporary Tailwind config file (e.g., `tailwind.source.config.js`)
2. Copy source project's Tailwind configuration
3. Scope source styles to migrated components using CSS layers or prefixes
4. Keep source and target Tailwind configs completely isolated
5. This sandbox ensures source styling renders correctly

**What Gets Preserved From Source:**

- Mock data arrays and objects
- Placeholder text and values
- Static configuration
- Default prop values
- ALL styling decisions (colors, fonts, spacing, etc.)

**What Does NOT Get Changed:**

- NO naming transformations (keep source names temporarily)
- NO styling transformations (keep source CSS/Tailwind exactly)
- NO TypeScript refactoring (minimal type adjustments only)
- NO structure changes (preserve source file organization)

**What Does NOT Get Migrated Yet:**

- API calls and data fetching
- Database connections
- Real authentication/authorization
- Complex business logic
- Form submission handlers (beyond visual)
- Real-time data updates

**Phase 1 Exit Criteria:**

- [ ] All components render visually IDENTICAL to source
- [ ] Hardcoded data displays correctly
- [ ] Styling matches source EXACTLY (pixel-perfect)
- [ ] Fonts, colors, spacing all correct
- [ ] No missing HTML elements or CSS classes
- [ ] Layout is responsive (if source was responsive)
- [ ] Isolated Tailwind config working without conflicts
- [ ] **VISUAL APPROVAL CHECKPOINT** - Stakeholder sign-off required

### Phase 2: Logic Integration

**Objective:** Connect migrated components to real data sources and business logic.

**What Gets Integrated:**

- API endpoints and data fetching
- Database queries and mutations
- Authentication and authorization checks
- Form validation and submission
- State management connections
- Event handlers and callbacks
- Real-time data subscriptions
- Error handling for real scenarios

**Phase 2 Exit Criteria:**

- [ ] All data sources connected
- [ ] Business logic implemented
- [ ] Forms submit to real endpoints
- [ ] Error states handle real errors
- [ ] Functional testing complete
- [ ] Integration tests passing
- [ ] **FUNCTIONAL APPROVAL CHECKPOINT** - Full testing complete

### Phase 3: Standards Migration (Human-in-Loop)

<critical>THIS PHASE IS GRADUAL AND REQUIRES HUMAN VALIDATION AT EACH STEP</critical>

**Objective:** Incrementally transform migrated components to match target project conventions.

**Core Principle:**
With real users validating each change, we catch visual regressions immediately. This human-in-loop approach prevents the accumulated styling bugs that automated transformations cause.

**Gradual Transformation Process:**

1. **One component at a time** - never batch transform
2. **One aspect at a time** - naming OR styling OR structure, not all at once
3. **Human validates each change** - with clear change summary and expectations
4. **Rollback if issues detected** - preserve working state
5. **Document each transformation** - track what changed and why

**Human Validation Request Format:**
<critical>Every human validation request MUST include:</critical>

```
┌─────────────────────────────────────────────────────────────────┐
│ VALIDATION REQUEST: [Component Name] - [Change Type]           │
├─────────────────────────────────────────────────────────────────┤
│ WHAT CHANGED:                                                   │
│   • [Specific file(s) modified]                                 │
│   • [Exact change made, e.g., "class 'bg-blue-500' → 'bg-primary'"]│
│   • [Lines affected or diff summary]                            │
├─────────────────────────────────────────────────────────────────┤
│ EXPECTED BEHAVIOR:                                              │
│   • [What should look the same, e.g., "Button color unchanged"] │
│   • [What might look slightly different, e.g., "Hover state"]   │
│   • [Specific areas to inspect]                                 │
├─────────────────────────────────────────────────────────────────┤
│ REGRESSION WARNING SIGNS:                                       │
│   • [What would indicate failure, e.g., "Button turns gray"]    │
│   • [Layout issues to watch for]                                │
│   • [Spacing/alignment concerns]                                │
├─────────────────────────────────────────────────────────────────┤
│ ACTION: Compare before/after visually                           │
│   [ ] APPROVE - Looks correct, proceed                          │
│   [ ] REJECT - Regression detected, rollback                    │
└─────────────────────────────────────────────────────────────────┘
```

**What Gets Transformed (Incrementally):**

- Component naming → target conventions
- File naming → target patterns
- CSS classes → target styling approach
- Tailwind config → merge into target config
- TypeScript patterns → target conventions
- Folder structure → target organization

**Isolated Tailwind Config Migration:**

1. Identify unused source Tailwind utilities
2. Map source utilities to target equivalents
3. Migrate one component's styling at a time
4. Present clear validation request with expected color/spacing outcomes
5. Remove migrated utilities from source config after approval
6. Eventually retire source config entirely

**Phase 3 Exit Criteria:**

- [ ] All components follow target naming conventions
- [ ] All styling uses target Tailwind/CSS approach
- [ ] Source Tailwind config fully merged/retired
- [ ] All TypeScript follows target patterns
- [ ] Folder structure matches target organization
- [ ] Human approval obtained for EACH component with clear change documentation
- [ ] **STANDARDS APPROVAL CHECKPOINT** - Full compliance verified
      </template-output>
      </step>

<step n="4" goal="Analyze data sources for Phase 2 planning">
<action>Identify all data currently hardcoded in source components:</action>

**Data Inventory:**

- List items/arrays (product lists, user lists, menu items)
- Configuration objects (settings, options, themes)
- Form default values
- Display strings and labels
- Numeric values (counts, prices, quantities)
- Date/time values
- Status values and enums
- User/session data placeholders

<action>For each hardcoded data item, identify:</action>

- Where it's used (which components)
- What it represents (domain concept)
- Potential real data source in target project:
  - API endpoint
  - Database table/collection
  - Configuration file
  - Environment variable
  - State management store
  - Context provider
  - Props from parent

<action>Document data migration mapping for Phase 2:</action>

<template-output section="data-mapping">
## Data Source Mapping (Phase 2 Planning)

### Hardcoded Data Inventory

| Data Item | Current Location | Type | Used By Components |
| --------- | ---------------- | ---- | ------------------ |

{{hardcoded_data_inventory}}

### Target Data Source Mapping

| Data Item | Source (Hardcoded) | Target Source | Integration Method |
| --------- | ------------------ | ------------- | ------------------ |

{{data_source_mapping}}

### API Endpoints Required

{{required_api_endpoints}}

### Database Entities Involved

{{database_entities}}

### State Management Integration

{{state_management_integration}}

### Configuration Sources

{{configuration_sources}}
</template-output>
</step>

<step n="5" goal="Document source patterns and plan Phase 3 transformations">
<critical>Phase 1 does NOT apply transformations - this step documents them for Phase 3</critical>
<action>Compare source patterns to target standards</action>
<action>Document differences - these will be applied INCREMENTALLY in Phase 3 with human validation</action>

**Naming Differences (Phase 3):**

- Source component naming vs Target naming convention
- Source file naming vs Target file naming convention
- Source variable naming vs Target variable naming

**Structure Differences (Phase 3):**

- Source folder structure vs Target folder structure
- Source import patterns vs Target import patterns

**Styling Differences (Phase 3):**
<critical>Styling transformations are DEFERRED to Phase 3 - Phase 1 preserves source styling exactly</critical>

- Source styling approach vs Target styling approach
- Source Tailwind config vs Target Tailwind config
- Source class naming vs Target class naming

**TypeScript Differences (Phase 3):**

- Source type patterns vs Target type patterns
- Source interface naming vs Target interface naming

**Test Transformations (Phase 1 - minimal):**

- Create co-located test files with source component names
- Keep test structure simple for Phase 1

<template-output section="transformation-rules">
## Transformation Rules (For Phase 3)

<critical>These transformations are DOCUMENTED here but APPLIED in Phase 3 with human-in-loop validation.
Phase 1 preserves source code exactly - no transformations applied.</critical>

### Naming Conventions (Phase 3)

| Category | Source Pattern | Target Pattern | Example |
| -------- | -------------- | -------------- | ------- |

{{naming_transformations_table}}

### File Structure (Phase 3)

| Source Location | Target Location |
| --------------- | --------------- |

{{structure_transformations_table}}

### Styling (Phase 3 - Human-in-Loop)

<critical>Styling changes require human validation for EACH component</critical>

| Source Approach | Target Approach | Migration Strategy |
| --------------- | --------------- | ------------------ |

{{styling_transformations_table}}

**Tailwind Config Migration Plan:**

- Source config location: {{source_tailwind_config}}
- Target config location: {{target_tailwind_config}}
- Isolation strategy: Create `tailwind.source.config.js` for Phase 1
- Merge strategy: Incremental migration in Phase 3

### TypeScript (Phase 3)

| Source Pattern | Target Pattern |
| -------------- | -------------- |

{{typescript_transformations_table}}

### Testing (Phase 1 - Minimal)

- **Test Location:** Co-located with component
- **Test Naming:** {{component_name}}.test.tsx
- **Test Framework:** {{target_test_framework}}
- **Phase 1 tests:** Render tests only (verify component mounts)
- **Phase 3 tests:** Full unit tests following target patterns
  </template-output>
  </step>

<step n="6" goal="Generate Phase 1 task list (Visual Migration - EXACT PRESERVATION)">
<critical>Phase 1 performs MINIMAL code changes - preserve source exactly</critical>
<action>Based on scope, generate ordered task list for VISUAL MIGRATION with EXACT PRESERVATION</action>
<action>Order tasks by component dependency (independent components first)</action>

<action>FIRST: Create Isolated Tailwind Config Task (P1-000)</action>

- Create `tailwind.source.config.js` from source project's Tailwind config
- Set up CSS scoping/layers to isolate source styles from target
- Ensure source styling works without affecting target project styles

<action>Each Phase 1 task includes:</action>

- Task ID (P1-XXX format)
- Component name (KEEP SOURCE NAME - no renaming)
- Source path
- Target path (temporary location for migrated components)
- What to copy EXACTLY (HTML, CSS classes, Tailwind classes)
- Component dependencies (other tasks that must complete first)
- Hardcoded data to preserve
- Estimated complexity (low/medium/high)

<critical>Phase 1 tasks do NOT include:</critical>

- NO data integration
- NO styling transformations
- NO naming changes
- NO structural refactoring
- NO TypeScript changes beyond making it compile

<template-output section="phase1-tasks">
## Phase 1: Visual Migration Tasks (EXACT PRESERVATION)

<critical>Phase 1 preserves source code EXACTLY - no transformations applied</critical>

### Task Summary

- **Total Phase 1 tasks:** {{phase1_total_tasks}}
- **Low complexity:** {{phase1_low_count}}
- **Medium complexity:** {{phase1_medium_count}}
- **High complexity:** {{phase1_high_count}}

### Migration Order

#### Stage P1-000: Isolated Tailwind Configuration Setup

<critical>MUST complete before any component migration</critical>

| Task ID | Description                     | Source                    | Target                          | Purpose                 |
| ------- | ------------------------------- | ------------------------- | ------------------------------- | ----------------------- |
| P1-000  | Create isolated Tailwind config | Source tailwind.config.js | tailwind.source.config.js       | Sandbox source styling  |
| P1-001  | Set up CSS layers/scoping       | Source globals.css        | src/styles/source-migration.css | Prevent style conflicts |

#### Stage 1A: Foundation Components (No Dependencies)

Components with no internal dependencies - can be migrated first.
**Preservation rule:** Copy HTML/JSX and all CSS classes EXACTLY.

| Task ID | Component | Source | Target | Preserved Exactly | Complexity |
| ------- | --------- | ------ | ------ | ----------------- | ---------- |

{{stage1a_tasks_table}}

#### Stage 1B: Building Block Components

Components that depend only on Stage 1A components.

| Task ID | Component | Source | Target | Depends On | Preserved Exactly | Complexity |
| ------- | --------- | ------ | ------ | ---------- | ----------------- | ---------- |

{{stage1b_tasks_table}}

#### Stage 1C: Feature Components

Complex components that combine multiple building blocks.

| Task ID | Component | Source | Target | Depends On | Preserved Exactly | Complexity |
| ------- | --------- | ------ | ------ | ---------- | ----------------- | ---------- |

{{stage1c_tasks_table}}

#### Stage 1D: Page/Layout Components

Top-level page components and layouts.

| Task ID | Component | Source | Target | Depends On | Preserved Exactly | Complexity |
| ------- | --------- | ------ | ------ | ---------- | ----------------- | ---------- |

{{stage1d_tasks_table}}

### Phase 1 Completion Criteria

- [ ] Isolated Tailwind config created and working
- [ ] All visual components migrated with EXACT source code
- [ ] NO styling transformations applied
- [ ] All CSS classes preserved exactly as source
- [ ] All HTML elements preserved exactly as source
- [ ] All hardcoded data preserved and displaying
- [ ] Styling matches source EXACTLY (pixel-perfect)
- [ ] Fonts, colors, spacing all correct
- [ ] Component render tests pass
- [ ] **VISUAL APPROVAL CHECKPOINT** - Stakeholder sign-off required before Phase 2
      </template-output>
      </step>

<step n="7" goal="Generate Phase 2 task list (Logic Integration)">
<action>Based on data mapping from Step 4, generate task list for LOGIC INTEGRATION</action>
<action>Order tasks by data dependency and integration complexity</action>
<action>Each Phase 2 task includes:</action>
  - Task ID (P2-XXX format)
  - Component(s) affected
  - Data item being integrated
  - Source (hardcoded location)
  - Target data source (API, database, state, etc.)
  - Integration method (fetch, query, subscribe, etc.)
  - Dependencies (other P2 tasks, external APIs, etc.)
  - Estimated complexity (low/medium/high)

<critical>Phase 2 tasks are separate from Phase 1 - they modify already-migrated components</critical>

<template-output section="phase2-tasks">
## Phase 2: Logic Integration Tasks

### Task Summary

- **Total Phase 2 tasks:** {{phase2_total_tasks}}
- **Low complexity:** {{phase2_low_count}}
- **Medium complexity:** {{phase2_medium_count}}
- **High complexity:** {{phase2_high_count}}

### Integration Order

#### Stage 2A: Data Fetching Setup

Set up data fetching infrastructure, API clients, and base hooks.

| Task ID | Description | Components | Data Source | Method | Complexity |
| ------- | ----------- | ---------- | ----------- | ------ | ---------- |

{{stage2a_tasks_table}}

#### Stage 2B: Read Operations

Replace hardcoded display data with real data fetching.

| Task ID | Data Item | Components | Hardcoded → Real Source | Method | Complexity |
| ------- | --------- | ---------- | ----------------------- | ------ | ---------- |

{{stage2b_tasks_table}}

#### Stage 2C: Write Operations

Implement form submissions, mutations, and user actions.

| Task ID | Operation | Components | Endpoint/Handler | Validation | Complexity |
| ------- | --------- | ---------- | ---------------- | ---------- | ---------- |

{{stage2c_tasks_table}}

#### Stage 2D: State Management Integration

Connect components to global state, context, and real-time updates.

| Task ID | State Item | Components | State Source | Subscription | Complexity |
| ------- | ---------- | ---------- | ------------ | ------------ | ---------- |

{{stage2d_tasks_table}}

#### Stage 2E: Authentication & Authorization

Implement real auth checks and protected functionality.

| Task ID | Auth Feature | Components | Auth Method | Fallback | Complexity |
| ------- | ------------ | ---------- | ----------- | -------- | ---------- |

{{stage2e_tasks_table}}

### Phase 2 Completion Criteria

- [ ] All data sources connected
- [ ] All forms submit to real endpoints
- [ ] Authentication/authorization working
- [ ] Error states properly handled
- [ ] Loading states implemented
- [ ] Integration tests passing
- [ ] **FUNCTIONAL APPROVAL CHECKPOINT** - Full testing complete
      </template-output>
      </step>

<step n="7b" goal="Generate Phase 3 task list (Standards Migration - Human-in-Loop)">
<critical>Phase 3 is GRADUAL with human validation at EVERY step</critical>
<action>Based on transformation rules from Step 5, generate task list for STANDARDS MIGRATION</action>
<action>Order tasks to minimize visual disruption - one component at a time</action>

<action>Each Phase 3 task includes:</action>

- Task ID (P3-XXX format)
- Component to transform
- Transformation type (naming/styling/structure/types)
- Current state (source pattern)
- Target state (target pattern)
- **What Changed** (specific files and modifications)
- **Expected Behavior** (what should look the same/different)
- **Regression Warning Signs** (what would indicate failure)
- Rollback plan
- Estimated complexity (low/medium/high)

<critical>Phase 3 rules:</critical>

- NEVER batch transform multiple components
- NEVER change multiple aspects at once (naming AND styling)
- Human validates BEFORE marking complete - with CLEAR change summary
- Present WHAT CHANGED, EXPECTED BEHAVIOR, and REGRESSION SIGNS for every validation
- Rollback immediately if visual regression detected

<template-output section="phase3-tasks">
## Phase 3: Standards Migration Tasks (Human-in-Loop)

<critical>This phase is GRADUAL - each task requires human visual validation before proceeding</critical>

### Human-in-Loop Validation Format

For EVERY task, present validation request in this format:

```
┌─────────────────────────────────────────────────────────────────┐
│ VALIDATION REQUEST: [Component] - [Change Type]                 │
├─────────────────────────────────────────────────────────────────┤
│ WHAT CHANGED:                                                   │
│   • File: [path/to/file.tsx]                                    │
│   • Change: [e.g., "class 'bg-blue-500' → 'bg-primary'"]        │
├─────────────────────────────────────────────────────────────────┤
│ EXPECTED BEHAVIOR:                                              │
│   • [e.g., "Button background color should remain blue (#3b82f6)"]│
│   • [e.g., "Hover state should still darken the button"]        │
├─────────────────────────────────────────────────────────────────┤
│ REGRESSION WARNING SIGNS:                                       │
│   • [e.g., "Button turns gray or white"]                        │
│   • [e.g., "Button disappears or loses padding"]                │
├─────────────────────────────────────────────────────────────────┤
│ ACTION: [ ] APPROVE   [ ] REJECT (rollback)                     │
└─────────────────────────────────────────────────────────────────┘
```

### Task Summary

- **Total Phase 3 tasks:** {{phase3_total_tasks}}
- **Naming tasks:** {{phase3_naming_count}}
- **Styling tasks:** {{phase3_styling_count}}
- **Structure tasks:** {{phase3_structure_count}}
- **TypeScript tasks:** {{phase3_types_count}}

### Standards Migration Order

#### Stage 3A: Tailwind Config Consolidation

Gradually merge source Tailwind config into target config.

| Task ID | Config Change | Expected Behavior | Regression Signs | Components |
| ------- | ------------- | ----------------- | ---------------- | ---------- |

{{stage3a_tailwind_tasks}}

#### Stage 3B: Naming Transformations

Rename components one at a time, update all references.

| Task ID | Component | Source → Target Name | Expected Behavior | Regression Signs |
| ------- | --------- | -------------------- | ----------------- | ---------------- |

{{stage3b_naming_tasks}}

#### Stage 3C: Styling Transformations

Transform CSS/Tailwind classes one component at a time.

| Task ID | Component | Class Changes | Expected Behavior | Regression Signs |
| ------- | --------- | ------------- | ----------------- | ---------------- |

{{stage3c_styling_tasks}}

#### Stage 3D: Structure Transformations

Reorganize file structure, update imports.

| Task ID | Component | Location Change | Expected Behavior | Regression Signs |
| ------- | --------- | --------------- | ----------------- | ---------------- |

{{stage3d_structure_tasks}}

#### Stage 3E: TypeScript Transformations

Update type patterns and interfaces.

| Task ID | Component | Type Changes | Expected Behavior | Regression Signs |
| ------- | --------- | ------------ | ----------------- | ---------------- |

{{stage3e_typescript_tasks}}

#### Stage 3F: Cleanup

Remove isolated source config and temporary files.

| Task ID    | Description                      | Expected Behavior                              | Regression Signs                                     |
| ---------- | -------------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| P3-FINAL   | Remove tailwind.source.config.js | All styles render correctly from target config | Any styling breaks, colors change, spacing shifts    |
| P3-FINAL+1 | Remove source-migration.css      | No visual changes from before removal          | Any layout shifts, missing styles, broken components |

### Phase 3 Completion Criteria

- [ ] All components follow target naming conventions
- [ ] All styling uses target Tailwind/CSS approach
- [ ] Source Tailwind config fully retired
- [ ] All TypeScript follows target patterns
- [ ] Folder structure matches target organization
- [ ] Human approval obtained for EACH transformation with clear documentation
- [ ] No visual regressions from source
- [ ] **STANDARDS APPROVAL CHECKPOINT** - Full compliance verified
      </template-output>
      </step>

<step n="8" goal="Identify risks and considerations">
<action>Analyze potential migration risks for ALL THREE phases:</action>

**Phase 1 Risks (Visual Preservation):**

- Tailwind config isolation complexity
- CSS specificity conflicts between source and target
- Missing font files or icon libraries
- Asset path differences (images, icons)
- Component library version conflicts

**Phase 2 Risks (Logic Integration):**

- API contract mismatches
- Data shape differences
- Authentication integration complexity
- State management conflicts
- Real-time data requirements

**Phase 3 Risks (Standards Migration):**

- Accumulated visual regressions if human validation skipped
- Tailwind config merge conflicts
- Breaking changes during rename operations
- Lost styling during CSS transformation
- Import path breakage during restructure

**Cross-Phase Risks:**

- Complex component dependencies
- External library incompatibilities
- Test framework differences

<action>Document mitigation strategies for each risk</action>

<template-output section="risks">
## Risks and Considerations

### Phase 1 Risks (Visual Preservation)

| Risk                      | Likelihood | Impact | Mitigation                      |
| ------------------------- | ---------- | ------ | ------------------------------- |
| Tailwind config conflicts | High       | High   | Isolated config with CSS layers |
| Missing fonts/icons       | Medium     | High   | Copy all assets from source     |
| CSS specificity issues    | Medium     | Medium | CSS scoping/prefixing           |

{{phase1_risks_table}}

### Phase 2 Risks (Logic Integration)

| Risk | Likelihood | Impact | Mitigation |
| ---- | ---------- | ------ | ---------- |

{{phase2_risks_table}}

### Phase 3 Risks (Standards Migration)

| Risk                          | Likelihood | Impact | Mitigation                       |
| ----------------------------- | ---------- | ------ | -------------------------------- |
| Visual regression             | High       | High   | Human validation EVERY change    |
| Tailwind merge conflicts      | Medium     | Medium | Incremental merge, test each     |
| Broken imports after rename   | Medium     | Low    | Update all references atomically |
| Lost styling during transform | Medium     | High   | Visual comparison before/after   |

{{phase3_risks_table}}

### Cross-Phase Risks

| Risk | Likelihood | Impact | Mitigation |
| ---- | ---------- | ------ | ---------- |

{{cross_phase_risks_table}}

### Compatibility Warnings

{{compatibility_warnings}}

### Manual Intervention Required

{{manual_steps_list}}
</template-output>
</step>

<step n="9" goal="Create validation checklists for all three phases">
<action>Generate separate validation checklists for Phase 1, Phase 2, and Phase 3</action>

<template-output section="validation">
## Validation Checklists

### Phase 1 Validation (Visual Migration - EXACT PRESERVATION)

#### Per-Component Checks

- [ ] Component renders without errors
- [ ] Visual appearance matches source EXACTLY (pixel-perfect)
- [ ] ALL CSS classes preserved from source
- [ ] ALL HTML elements preserved from source
- [ ] Hardcoded data displays correctly
- [ ] Fonts, colors, spacing all match source
- [ ] Layout matches source (including responsive)
- [ ] No styling transformations applied
- [ ] Co-located render test file created
- [ ] Render tests pass

#### Phase 1 Overall Checks

- [ ] Isolated Tailwind config (tailwind.source.config.js) working
- [ ] CSS scoping preventing style conflicts
- [ ] All Phase 1 tasks completed
- [ ] All component render tests passing
- [ ] **Side-by-side visual comparison with source APPROVED**
- [ ] No console errors or warnings
- [ ] Build succeeds
- [ ] **CHECKPOINT: Visual approval from stakeholders REQUIRED before Phase 2**

### Phase 2 Validation (Logic Integration)

#### Per-Integration Checks

- [ ] Data fetching works correctly
- [ ] Loading states display properly
- [ ] Error states handle failures gracefully
- [ ] Forms submit successfully
- [ ] Validation messages appear correctly
- [ ] Authentication/authorization enforced
- [ ] Integration tests pass
- [ ] Visual appearance STILL matches source (no regressions from logic changes)

#### Phase 2 Overall Checks

- [ ] All Phase 2 tasks completed
- [ ] All data sources connected
- [ ] All integration tests passing
- [ ] Functional testing complete (all user flows work)
- [ ] Error handling verified
- [ ] Performance acceptable
- [ ] Security requirements met
- [ ] **CHECKPOINT: Functional approval REQUIRED before Phase 3**

### Phase 3 Validation (Standards Migration - Human-in-Loop)

#### Per-Transformation Checks (EVERY change requires these)

- [ ] Single, focused change made (not batched)
- [ ] Component runs in isolation
- [ ] Human visually compares before/after
- [ ] NO visual regression detected
- [ ] If regression detected → ROLLBACK immediately
- [ ] Human approval obtained for this specific change

#### Phase 3 Overall Checks

- [ ] All components follow target naming conventions
- [ ] All CSS/Tailwind uses target patterns
- [ ] Source Tailwind config (tailwind.source.config.js) fully retired
- [ ] Source migration CSS (source-migration.css) removed
- [ ] All TypeScript follows target patterns
- [ ] Folder structure matches target organization
- [ ] All component tests passing
- [ ] Human approval obtained for EVERY transformation
- [ ] No accumulated visual regressions
- [ ] **CHECKPOINT: Standards compliance fully verified**
      </template-output>
      </step>

<step n="10" goal="Generate executive summary">
<action>Compile migration plan summary</action>

<template-output section="summary">
## Executive Summary

### Migration Overview

- **Mode:** {{migration_mode}}
- **Total Components:** {{total_components}} to migrate
- **Phase 1 Tasks:** {{phase1_total_tasks}} visual preservation tasks
- **Phase 2 Tasks:** {{phase2_total_tasks}} logic integration tasks
- **Phase 3 Tasks:** {{phase3_total_tasks}} standards migration tasks (human-in-loop)
- **Overall Complexity:** {{overall_complexity}}

### Three-Phase Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: VISUAL MIGRATION (EXACT PRESERVATION)                 │
│  ─────────────────────────────────────────────────────────────  │
│  • Transfer HTML/CSS EXACTLY as-is from source                  │
│  • Create isolated Tailwind config (sandbox styling)            │
│  • MINIMAL code changes - preserve everything                   │
│  • Focus: Pixel-perfect visual match to source                  │
│  • Exit: Visual approval from stakeholders                      │
├─────────────────────────────────────────────────────────────────┤
│  ⬇️  CHECKPOINT: Visual Approval REQUIRED                        │
├─────────────────────────────────────────────────────────────────┤
│  PHASE 2: LOGIC INTEGRATION                                     │
│  ─────────────────────────────────────────────────────────────  │
│  • Connect to real data sources                                 │
│  • Replace hardcoded data with API calls                        │
│  • Focus: Full functionality with real data                     │
│  • Exit: Functional testing complete                            │
├─────────────────────────────────────────────────────────────────┤
│  ⬇️  CHECKPOINT: Functional Approval REQUIRED                    │
├─────────────────────────────────────────────────────────────────┤
│  PHASE 3: STANDARDS MIGRATION (HUMAN-IN-LOOP)                   │
│  ─────────────────────────────────────────────────────────────  │
│  • GRADUAL transformation to target conventions                 │
│  • ONE component, ONE change at a time                          │
│  • Human validates EVERY change before proceeding               │
│  • Merge isolated Tailwind config incrementally                 │
│  • Focus: Match target project standards                        │
│  • Exit: Full standards compliance                              │
└─────────────────────────────────────────────────────────────────┘
```

### Why This Approach?

<critical>Minor styling issues are EXTREMELY hard to debug if introduced during migration.</critical>

By preserving source styling EXACTLY in Phase 1:

- Any visual bug is immediately attributable to our specific change
- Human-in-loop in Phase 3 catches regressions before they accumulate
- Rollback is always possible at any point
- The source UI is always the reference point

### Key Transformation Rules (Applied in Phase 3)

{{key_transformations_summary}}

### Critical Path

{{critical_path_description}}

### Pre-Migration Checklist

- [ ] Source analysis reviewed and approved
- [ ] **Three-phase strategy understood**
- [ ] Target coding standards document available
- [ ] Transformation rules reviewed (for Phase 3)
- [ ] Phase 1 task breakdown approved
- [ ] Phase 2 data mapping reviewed
- [ ] Phase 3 standards migration plan reviewed
- [ ] Risk mitigations understood

### Next Steps

**Phase 1 Execution (Visual Preservation):**

1. Review and approve this migration plan
2. Load Integration Engineer agent
3. Run `*migrate --phase=1` to begin visual migration
4. Create isolated Tailwind config first
5. Migrate components with EXACT source code
6. Complete visual validation (side-by-side comparison)
7. **Obtain stakeholder visual approval**

**Phase 2 Execution (after Phase 1 approval):** 8. Run `*migrate --phase=2` to begin logic integration 9. Monitor progress with `*status` 10. Complete functional testing 11. **Obtain functional approval**

**Phase 3 Execution (after Phase 2 approval):** 12. Run `*migrate --phase=3` to begin standards migration 13. **Human validates EACH transformation** 14. Merge Tailwind configs incrementally 15. Transform components one at a time 16. Run `validate-migration` workflow for final validation
</template-output>
</step>

</workflow>
