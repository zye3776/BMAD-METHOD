# Validate Migration - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>Communicate in {communication_language} throughout the validation process</critical>
<critical>Four-layer validation: Visual + Functional + Unit Tests + Standards Compliance</critical>

<workflow>

<step n="0" goal="Load migration context">
<invoke-protocol name="discover_inputs" />

<action>Load migration status from status tracker</action>
<action>Identify all completed migration tasks</action>
<action>Load coding standards for compliance checking</action>

<check if="no completed tasks">
  <action>Report: No completed migrations to validate</action>
  <action>Suggest running execute-migration first</action>
  <goto step="end">Exit workflow</goto>
</check>

<action>Report: Found {{completed_count}} completed migrations to validate</action>
</step>

<step n="1" goal="Layer 1 - Unit Test Validation">
<action>For each migrated component, verify unit tests:</action>

<substep n="1a" goal="Check test file existence">
  <action>For each component, verify co-located test file exists</action>
  <action>Check file naming: {{ComponentName}}.test.tsx</action>
  <action>Report missing test files</action>
</substep>

<substep n="1b" goal="Run all unit tests">
  <action>Execute test runner on all migrated component tests</action>
  <action>Capture results: passed, failed, skipped</action>
  <action>For failures, capture error messages</action>
</substep>

<substep n="1c" goal="Analyze test coverage">
  <action>Check if tests cover:</action>
    - Component renders without crashing
    - Props are handled correctly
    - User interactions work (if applicable)
    - Edge cases are covered
</substep>

<template-output section="unit-tests">
## Layer 1: Unit Test Validation

### Test File Status

| Component | Test File | Exists | Status |
| --------- | --------- | ------ | ------ |

{{test_file_status_table}}

### Test Results

- **Total Tests:** {{total_tests}}
- **Passing:** {{passing_tests}} ✅
- **Failing:** {{failing_tests}} ❌
- **Skipped:** {{skipped_tests}} ⏭️

### Failed Tests

{{#if has_failures}}
{{failed_tests_details}}
{{else}}
No test failures! 🎉
{{/if}}

### Coverage Assessment

{{coverage_assessment}}
</template-output>
</step>

<step n="2" goal="Layer 2 - Standards Compliance Validation">
<action>Load target project coding standards</action>
<action>For each migrated component, check compliance:</action>

<substep n="2a" goal="Naming compliance">
  <action>Check component naming (PascalCase)</action>
  <action>Check file naming convention</action>
  <action>Check variable/function naming (camelCase)</action>
  <action>Check props interface naming</action>
</substep>

<substep n="2b" goal="Structure compliance">
  <action>Check file location matches target structure</action>
  <action>Check import ordering</action>
  <action>Check export pattern</action>
</substep>

<substep n="2c" goal="Style compliance">
  <action>Check styling approach matches target</action>
  <action>Check class naming convention</action>
</substep>

<substep n="2d" goal="TypeScript compliance">
  <action>Check type definitions are complete</action>
  <action>Check no implicit any</action>
  <action>Check interface/type usage matches convention</action>
</substep>

<substep n="2e" goal="Run linter">
  <action>Execute project linter on migrated files</action>
  <action>Capture lint errors and warnings</action>
</substep>

<template-output section="standards">
## Layer 2: Standards Compliance Validation

### Compliance Summary

| Component | Naming | Structure | Style | TypeScript | Lint |
| --------- | ------ | --------- | ----- | ---------- | ---- |

{{compliance_summary_table}}

### Violations Found

{{#if has_violations}}
{{violations_details}}
{{else}}
No standards violations! 🎉
{{/if}}

### Lint Results

- **Errors:** {{lint_errors}}
- **Warnings:** {{lint_warnings}}

{{lint_details}}
</template-output>
</step>

<step n="3" goal="Layer 3 - Visual Validation">
<action>Guide user through visual comparison</action>

<substep n="3a" goal="Prepare visual comparison">
  <action>List all migrated components with their source counterparts</action>
  <action>Provide instructions for visual comparison:</action>

**Visual Comparison Checklist:**

1. Render source component in isolation (Storybook or test page)
2. Render migrated component in isolation
3. Compare side-by-side for: - Layout and spacing - Colors and typography - Icons and images - Responsive behavior - Hover/focus states
   </substep>

<substep n="3b" goal="Collect visual validation results">
  <ask>
For each component, rate visual fidelity:
- ✅ Matches source exactly
- ⚠️ Minor differences (acceptable)
- ❌ Significant differences (needs fix)

Enter results as: ComponentName:status (e.g., Button:✅, Card:⚠️)
</ask>
<action>Parse and store visual validation results</action>
</substep>

<template-output section="visual">
## Layer 3: Visual Validation

### Visual Comparison Results

| Component | Source | Migrated | Visual Match |
| --------- | ------ | -------- | ------------ |

{{visual_comparison_table}}

### Components Needing Visual Fixes

{{#if has_visual_issues}}
{{visual_issues_list}}
{{else}}
All components visually match! 🎉
{{/if}}

### Visual Validation Notes

{{visual_notes}}
</template-output>
</step>

<step n="4" goal="Layer 4 - Functional Validation">
<action>Guide user through functional testing</action>

<substep n="4a" goal="Prepare functional test checklist">
  <action>For each component, generate functional test items based on:</action>
    - Props and their expected behavior
    - User interactions (clicks, inputs, etc.)
    - State changes
    - Event handlers
    - API calls if any
</substep>

<substep n="4b" goal="Execute functional tests">
  <ask>
For each component, verify functional behavior:

{{functional_checklist}}

Mark each item as:

- ✅ Working as expected
- ⚠️ Works with minor issues
- ❌ Not working correctly

Enter results:
</ask>
<action>Parse and store functional validation results</action>
</substep>

<template-output section="functional">
## Layer 4: Functional Validation

### Functional Test Results

| Component | Interactions | State | Events | Overall |
| --------- | ------------ | ----- | ------ | ------- |

{{functional_results_table}}

### Components with Functional Issues

{{#if has_functional_issues}}
{{functional_issues_list}}
{{else}}
All components functioning correctly! 🎉
{{/if}}

### Functional Validation Notes

{{functional_notes}}
</template-output>
</step>

<step n="5" goal="Generate validation summary">
<action>Compile all validation results</action>
<action>Calculate overall validation score</action>
<action>Determine migration readiness</action>

<template-output section="summary">
## Validation Summary

### Overall Results

| Validation Layer | Pass          | Warn          | Fail          | Score                  |
| ---------------- | ------------- | ------------- | ------------- | ---------------------- |
| Unit Tests       | {{ut_pass}}   | {{ut_warn}}   | {{ut_fail}}   | {{ut_score}}%          |
| Standards        | {{std_pass}}  | {{std_warn}}  | {{std_fail}}  | {{std_score}}%         |
| Visual           | {{vis_pass}}  | {{vis_warn}}  | {{vis_fail}}  | {{vis_score}}%         |
| Functional       | {{func_pass}} | {{func_warn}} | {{func_fail}} | {{func_score}}%        |
| **Overall**      |               |               |               | **{{overall_score}}%** |

### Migration Readiness

{{#if ready_for_production}}
✅ **READY FOR PRODUCTION**
All validation layers passed. Migration can be considered complete.
{{else if ready_with_warnings}}
⚠️ **READY WITH CAVEATS**
Migration functional but has warnings that should be addressed:
{{warnings_summary}}
{{else}}
❌ **NOT READY**
Critical issues must be resolved before migration is complete:
{{critical_issues}}
{{/if}}

### Recommended Actions

{{recommended_actions}}

### Next Steps

{{#if ready_for_production}}

1. Migration validation complete!
2. Consider running cleanup workflow to remove deprecated components
3. Update documentation as needed
   {{else}}
4. Address failing validations
5. Re-run validate-migration
6. Repeat until all layers pass
   {{/if}}
   </template-output>
   </step>

</workflow>
