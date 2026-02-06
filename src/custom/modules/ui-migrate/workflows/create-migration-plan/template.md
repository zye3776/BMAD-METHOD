# Migration Plan

**Generated:** {{date}}
**Source:** {{submodule_path}}
**Created By:** Migration Architect (Stratton)

---

## Target Project Analysis

### Structure

- **Components Location:** {{target_components_path}}
- **Styles Location:** {{target_styles_path}}
- **Tests Location:** Co-located ({{component_name}}.test.tsx)

### Conventions

- **Component Style:** {{target_component_style}}
- **Styling Method:** {{target_styling_method}}
- **State Management:** {{target_state_management}}
- **TypeScript Style:** {{target_ts_style}}
- **File Naming:** {{target_file_naming}}
- **Test Naming:** {{target_test_naming}}

---

## Migration Scope

### Mode: {{migration_mode}}

{{#if refresh_mode}}
**Refresh Migration** - Updating existing UI visuals while preserving functionality.
{{/if}}

{{#if addition_mode}}
**Addition Migration** - Adding new pages, components, and panels to the project.
{{/if}}

{{#if extraction_mode}}
**Extraction Migration** - Cherry-picking specific components from source.
{{/if}}

### Components in Scope

{{components_in_scope_list}}

### Out of Scope

{{components_out_of_scope}}

---

## Three-Phase Migration Strategy

### Why Three Phases?

Migrating UI components in three distinct phases dramatically reduces risk and ensures quality:

| Phase       | Focus               | Changes                         | Validation             |
| ----------- | ------------------- | ------------------------------- | ---------------------- |
| **Phase 1** | Visual preservation | MINIMAL - exact source transfer | Visual approval        |
| **Phase 2** | Logic integration   | Data connections only           | Functional testing     |
| **Phase 3** | Standards migration | Gradual, human-validated        | Human-in-loop approval |

> **CRITICAL:** Minor styling issues (wrong fonts, missing elements, broken CSS) are EXTREMELY hard to debug if introduced during migration. By preserving source styling exactly in Phase 1, any visual bug is immediately attributable to a specific change we made.

### Phase 1: Visual Migration (EXACT PRESERVATION)

**Objective:** Transfer components with EXACT visual fidelity - no styling transformations.

**Core Principle:**
Perform AS LITTLE CODE CHANGES AS POSSIBLE. Transfer HTML elements and CSS styling exactly as they appear in the source.

**Isolated Tailwind Configuration:**
To prevent styling conflicts between source and target projects:

1. Create `tailwind.source.config.js` from source Tailwind config
2. Set up CSS layers/scoping to isolate source styles
3. Keep source and target Tailwind configs completely separated

**What Gets Transferred EXACTLY:**

- HTML/JSX structure - VERBATIM, no restructuring
- ALL CSS classes - copied exactly as-is
- ALL Tailwind classes - preserved without modification
- Inline styles - kept unchanged
- Static assets (images, icons, fonts)
- Hardcoded display data (exactly as in source)

**What Does NOT Get Changed:**

- NO naming transformations (keep source names)
- NO styling transformations (keep source CSS/Tailwind exactly)
- NO TypeScript refactoring (minimal type adjustments only)
- NO structure changes (preserve source file organization)

**Phase 1 Exit Criteria:**

- [ ] Isolated Tailwind config working without conflicts
- [ ] All components render visually IDENTICAL to source
- [ ] Styling matches source EXACTLY (pixel-perfect)
- [ ] Fonts, colors, spacing all correct
- [ ] **VISUAL APPROVAL CHECKPOINT** - Stakeholder sign-off REQUIRED

### Phase 2: Logic Integration

**Objective:** Connect migrated components to real data sources and business logic.

**What Gets Integrated:**

- API endpoints and data fetching
- Database queries and mutations
- Authentication and authorization checks
- Form validation and submission
- State management connections
- Event handlers and callbacks
- Error handling for real scenarios

**Phase 2 Exit Criteria:**

- [ ] All data sources connected
- [ ] Business logic implemented
- [ ] Functional testing complete
- [ ] Visual appearance STILL matches source (no regressions)
- [ ] **FUNCTIONAL APPROVAL CHECKPOINT** - Testing complete

### Phase 3: Standards Migration (Human-in-Loop)

**Objective:** Incrementally transform migrated components to match target project conventions.

**Core Principle:**
GRADUAL transformation with human validation at EVERY step. This prevents accumulated visual regressions.

**Human-in-Loop Process:**

```
For EACH transformation:
1. Make single, focused change (one component, one aspect)
2. Run component in isolation
3. Human compares before/after visually
4. IF visual regression → ROLLBACK immediately
5. IF approved → Mark complete, proceed to next
```

**What Gets Transformed (Incrementally):**

- Component naming → target conventions
- File naming → target patterns
- CSS classes → target styling approach
- Tailwind config → merge into target config
- TypeScript patterns → target conventions
- Folder structure → target organization

**Phase 3 Exit Criteria:**

- [ ] All components follow target naming conventions
- [ ] All styling uses target Tailwind/CSS approach
- [ ] Source Tailwind config fully retired
- [ ] Human approval obtained for EACH transformation
- [ ] **STANDARDS APPROVAL CHECKPOINT** - Full compliance verified

---

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

---

## Transformation Rules (For Phase 3)

> **Note:** These transformations are DOCUMENTED here but APPLIED in Phase 3 with human-in-loop validation. Phase 1 preserves source code exactly - no transformations applied.

### Naming Conventions (Phase 3)

| Category | Source Pattern | Target Pattern | Example |
| -------- | -------------- | -------------- | ------- |

{{naming_transformations_table}}

### File Structure (Phase 3)

| Source Location | Target Location |
| --------------- | --------------- |

{{structure_transformations_table}}

### Styling (Phase 3 - Human-in-Loop Required)

> **CRITICAL:** Styling changes require human validation for EACH component to prevent visual regressions.

| Source Approach | Target Approach | Migration Strategy |
| --------------- | --------------- | ------------------ |

{{styling_transformations_table}}

**Tailwind Config Migration Plan:**

- Source config: {{source_tailwind_config}}
- Target config: {{target_tailwind_config}}
- Isolation: Create `tailwind.source.config.js` for Phase 1
- Merge strategy: Incremental migration in Phase 3

### TypeScript (Phase 3)

| Source Pattern | Target Pattern |
| -------------- | -------------- |

{{typescript_transformations_table}}

### Testing

- **Test Location:** Co-located with component
- **Test Naming:** `{{component_name}}.test.tsx`
- **Test Framework:** {{target_test_framework}}
- **Phase 1 tests:** Render tests only (verify component mounts)
- **Phase 3 tests:** Full unit tests following target patterns

---

## Phase 1: Visual Migration Tasks (EXACT PRESERVATION)

> **CRITICAL:** Phase 1 preserves source code EXACTLY - no transformations applied.

### Task Summary

- **Total Phase 1 tasks:** {{phase1_total_tasks}}
- **Low complexity:** {{phase1_low_count}}
- **Medium complexity:** {{phase1_medium_count}}
- **High complexity:** {{phase1_high_count}}

### Migration Order

#### Stage P1-000: Isolated Tailwind Configuration Setup

> **MUST complete before any component migration**

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

---

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
- [ ] Visual appearance STILL matches source (no regressions)
- [ ] **FUNCTIONAL APPROVAL CHECKPOINT** - Full testing complete

---

## Phase 3: Standards Migration Tasks (Human-in-Loop)

> **CRITICAL:** This phase is GRADUAL - each task requires human visual validation before proceeding.

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
│ EXPECTED RESULT:                                                │
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

| Task ID | Config Change | Expected Result | Regression Signs | Components |
| ------- | ------------- | --------------- | ---------------- | ---------- |

{{stage3a_tailwind_tasks}}

#### Stage 3B: Naming Transformations

Rename components one at a time, update all references.

| Task ID | Component | Source → Target Name | Expected Result | Regression Signs |
| ------- | --------- | -------------------- | --------------- | ---------------- |

{{stage3b_naming_tasks}}

#### Stage 3C: Styling Transformations

Transform CSS/Tailwind classes one component at a time.

| Task ID | Component | Class Changes | Expected Result | Regression Signs |
| ------- | --------- | ------------- | --------------- | ---------------- |

{{stage3c_styling_tasks}}

#### Stage 3D: Structure Transformations

Reorganize file structure, update imports.

| Task ID | Component | Location Change | Expected Result | Regression Signs |
| ------- | --------- | --------------- | --------------- | ---------------- |

{{stage3d_structure_tasks}}

#### Stage 3E: TypeScript Transformations

Update type patterns and interfaces.

| Task ID | Component | Type Changes | Expected Result | Regression Signs |
| ------- | --------- | ------------ | --------------- | ---------------- |

{{stage3e_typescript_tasks}}

#### Stage 3F: Cleanup

Remove isolated source config and temporary files.

| Task ID    | Description                      | Expected Result                                | Regression Signs                                     |
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

---

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

---

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

---

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

> **CRITICAL:** Minor styling issues (wrong fonts, missing elements, broken CSS) are EXTREMELY hard to debug if introduced during migration.

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

---

_Generated by UI Migration Toolkit - Migration Architect_
