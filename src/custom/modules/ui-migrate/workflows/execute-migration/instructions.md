# Execute Migration - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>Communicate in {communication_language} throughout the execution process</critical>
<critical>Every component MUST have a co-located test file</critical>
<critical>All components MUST comply with target project coding standards</critical>

<workflow>

<step n="0" goal="Load required context and initialize status">
<invoke-protocol name="discover_inputs" />

<action>Verify migration plan is loaded</action>
<check if="migration_plan_content is empty">
<action>ERROR: Migration plan required before execution</action>
<action>Instruct user to run create-migration-plan workflow first</action>
<goto step="end">Exit workflow</goto>
</check>

<action>Load target project coding standards from {coding_standards_path}</action>
<action>Parse migration tasks from migration plan</action>
<action>Initialize or load migration status tracker</action>

<action>Report: Loaded {{task_count}} migration tasks across {{phase_count}} phases</action>
</step>

<step n="1" goal="Present execution options">
<ask>
Migration Execution Options:

**[A] All** - Execute all pending tasks in order
**[P] Phase** - Execute a specific phase (1-4)
**[T] Task** - Execute a specific task by ID
**[R] Resume** - Continue from last incomplete task
**[S] Status** - Show current migration status

Select option:
</ask>

<check if="option is Status">
  <action>Display current migration status</action>
  <goto step="1">Return to options</goto>
</check>

<check if="option is Task">
  <ask>Enter task ID to execute:</ask>
  <action>Execute single task</action>
  <goto step="2">Execute task</goto>
</check>

<check if="option is Phase">
  <ask>Enter phase number (1-4):</ask>
  <action>Filter tasks to selected phase</action>
</check>

<check if="option is Resume">
  <action>Find first incomplete task</action>
  <action>Continue from that task</action>
</check>

<action>Prepare task queue for execution</action>
</step>

<step n="2" goal="Execute migration task" for-each="task in task_queue">
<action>Mark task as in_progress in status tracker</action>
<action>Report: Starting task {{task.id}} - {{task.component}}</action>

<substep n="2a" goal="Read source component">
  <action>Load source component from {{task.source_path}}</action>
  <action>Parse component structure:</action>
    - Component name and type
    - Props interface
    - Imports and dependencies
    - Internal logic
    - Styling approach
    - Any hooks used
</substep>

<substep n="2b" goal="Apply transformations">
  <action>Apply transformation rules from migration plan:</action>

**Naming Transformations:**
<action>Transform component name to target convention</action>
<action>Transform file name to target convention</action>
<action>Transform prop names if needed</action>
<action>Transform internal variable names</action>

**Import Transformations:**
<action>Update import paths for target structure</action>
<action>Replace library imports if needed (e.g., UI library)</action>
<action>Add any required new imports</action>

**Styling Transformations:**
<action>Convert styling approach to target method</action>
<action>Transform class names to target convention</action>
<action>Migrate style values</action>

**TypeScript Transformations:**
<action>Apply target type conventions</action>
<action>Update interface/type naming</action>
<action>Ensure strict compliance if required</action>
</substep>

<substep n="2c" goal="Create target component file">
  <action>Determine target file path: {{task.target_path}}</action>
  <action>Create parent directories if needed</action>
  <action>Write transformed component to target path</action>
  <action>Report: Created {{task.target_path}}</action>
</substep>

<substep n="2d" goal="Create co-located test file">
  <action>Determine test file path: {{task.target_path_without_ext}}{{test_file_suffix}}</action>

<action>Generate test file with:</action>

```typescript
import { render, screen } from '@testing-library/react';
import { {{component_name}} } from './{{component_name}}';

describe('{{component_name}}', () => {
  it('renders without crashing', () => {
    render(<{{component_name}} {{default_props}} />);
  });

  {{#each testable_props}}
  it('handles {{prop_name}} prop correctly', () => {
    render(<{{component_name}} {{prop_name}}={{test_value}} />);
    // Assert expected behavior
  });
  {{/each}}

  {{#if has_interactions}}
  it('handles user interactions', () => {
    render(<{{component_name}} {{interaction_props}} />);
    // Test click, input, etc.
  });
  {{/if}}
});
```

<action>Write test file</action>
<action>Report: Created {{test_file_path}}</action>
</substep>

<substep n="2e" goal="Validate standards compliance">
  <action>Check component against coding standards:</action>

**Naming Check:**

- [ ] Component name follows convention
- [ ] File name follows convention
- [ ] Props interface named correctly

**Structure Check:**

- [ ] File in correct location
- [ ] Imports ordered correctly
- [ ] Exports follow pattern

**Style Check:**

- [ ] Styling approach matches target
- [ ] Class names follow convention

**TypeScript Check:**

- [ ] Types properly defined
- [ ] No any types (unless justified)
- [ ] Props interface complete

**Test Check:**

- [ ] Test file co-located
- [ ] Test file named correctly
- [ ] Basic tests present

  <check if="violations found">
    <action>Auto-fix violations where possible</action>
    <action>Report remaining violations requiring manual fix</action>
  </check>
</substep>

<substep n="2f" goal="Run tests">
  <action>Execute test file</action>
  <check if="tests fail">
    <action>Report test failures</action>
    <action>Attempt to fix obvious issues</action>
    <action>Re-run tests</action>
    <check if="still failing">
      <action>Mark task as needs_attention</action>
      <action>Log issue to issues-log.md</action>
    </check>
  </check>
  <check if="tests pass">
    <action>Report: Tests passing for {{task.component}}</action>
  </check>
</substep>

<substep n="2g" goal="Update status">
  <check if="task completed successfully">
    <action>Mark task as completed in status tracker</action>
    <action>Record completion timestamp</action>
    <action>Report: ✅ Task {{task.id}} completed - {{task.component}}</action>
  </check>
  <check if="task needs attention">
    <action>Mark task as needs_attention in status tracker</action>
    <action>Record issues encountered</action>
    <action>Report: ⚠️ Task {{task.id}} needs attention - {{task.component}}</action>
  </check>
</substep>
</step>

<step n="3" goal="Report execution summary">
<action>Compile execution summary:</action>

**Execution Summary:**

- Tasks attempted: {{attempted_count}}
- Tasks completed: {{completed_count}}
- Tasks needing attention: {{attention_count}}
- Tasks remaining: {{remaining_count}}

**Files Created:**
{{created_files_list}}

**Tests Status:**

- Passing: {{passing_tests}}
- Failing: {{failing_tests}}

**Issues Encountered:**
{{issues_summary}}

<check if="all tasks completed">
  <action>Report: 🎉 All migration tasks completed!</action>
  <action>Recommend running validate-migration workflow</action>
</check>

<check if="tasks need attention">
  <action>Report: ⚠️ Some tasks need attention</action>
  <action>List tasks requiring manual intervention</action>
  <action>Suggest running *report-issue for each</action>
</check>

<check if="tasks remaining">
  <action>Report: Migration in progress</action>
  <action>Show next tasks to execute</action>
  <action>Suggest running *migrate to continue</action>
</check>
</step>

</workflow>

## Task Status Values

- `pending` - Not yet started
- `in_progress` - Currently being executed
- `completed` - Successfully migrated with passing tests
- `needs_attention` - Completed but has issues requiring manual review
- `blocked` - Cannot proceed due to dependency or error
- `skipped` - Intentionally skipped by user

## Status Tracker Schema

```json
{
  "migration_id": "{{date}}-{{mode}}",
  "started_at": "timestamp",
  "last_updated": "timestamp",
  "mode": "refresh|addition|extraction",
  "tasks": [
    {
      "id": "task-001",
      "component": "ComponentName",
      "source": "source/path",
      "target": "target/path",
      "test_file": "target/path.test.tsx",
      "status": "pending|in_progress|completed|needs_attention|blocked|skipped",
      "started_at": "timestamp",
      "completed_at": "timestamp",
      "issues": [],
      "test_status": "pending|passing|failing"
    }
  ],
  "summary": {
    "total": 0,
    "completed": 0,
    "needs_attention": 0,
    "remaining": 0
  }
}
```
