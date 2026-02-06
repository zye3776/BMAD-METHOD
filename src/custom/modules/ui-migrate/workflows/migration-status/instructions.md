# Migration Status - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>Communicate in {communication_language}</critical>

<workflow>

<step n="1" goal="Load and parse migration status">
<invoke-protocol name="discover_inputs" />

<check if="migration_status_content is empty">
  <action>Report: No active migration found</action>
  <action>Display: "No migration in progress. Run analyze-source to begin."</action>
  <goto step="end">Exit workflow</goto>
</check>

<action>Parse migration status JSON</action>
<action>Calculate summary statistics</action>
</step>

<step n="2" goal="Display migration overview">
<action>Display migration header:</action>

```
╔══════════════════════════════════════════════════════════════╗
║                    MIGRATION STATUS                          ║
╠══════════════════════════════════════════════════════════════╣
║  Migration ID: {{migration_id}}                              ║
║  Mode: {{migration_mode}}                                    ║
║  Started: {{started_at}}                                     ║
║  Last Updated: {{last_updated}}                              ║
╚══════════════════════════════════════════════════════════════╝
```

</step>

<step n="3" goal="Display progress summary">
<action>Calculate and display progress bar:</action>

```
Progress: [{{progress_bar}}] {{percentage}}%

┌─────────────────────────────────────────────────────────────┐
│  📊 TASK SUMMARY                                            │
├─────────────────────────────────────────────────────────────┤
│  ✅ Completed:      {{completed_count}} / {{total_count}}   │
│  🔄 In Progress:    {{in_progress_count}}                   │
│  ⚠️  Needs Attention: {{attention_count}}                   │
│  ⏸️  Pending:        {{pending_count}}                      │
│  🚫 Blocked:        {{blocked_count}}                       │
│  ⏭️  Skipped:        {{skipped_count}}                      │
└─────────────────────────────────────────────────────────────┘
```

</step>

<step n="4" goal="Display phase breakdown">
<action>Show tasks by phase:</action>

```
┌─────────────────────────────────────────────────────────────┐
│  📁 PHASE BREAKDOWN                                         │
├─────────────────────────────────────────────────────────────┤
│  Phase 1 (Foundation):     {{phase1_status}}                │
│  Phase 2 (Building Blocks): {{phase2_status}}               │
│  Phase 3 (Features):       {{phase3_status}}                │
│  Phase 4 (Pages):          {{phase4_status}}                │
└─────────────────────────────────────────────────────────────┘
```

</step>

<step n="5" goal="Display test status">
<action>Show test results summary:</action>

```
┌─────────────────────────────────────────────────────────────┐
│  🧪 TEST STATUS                                             │
├─────────────────────────────────────────────────────────────┤
│  Tests Passing:  {{passing_tests}}                          │
│  Tests Failing:  {{failing_tests}}                          │
│  Tests Pending:  {{pending_tests}}                          │
└─────────────────────────────────────────────────────────────┘
```

</step>

<step n="6" goal="Display issues if any">
<check if="has_issues">
<action>Show issues summary:</action>

```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️  ISSUES REQUIRING ATTENTION                             │
├─────────────────────────────────────────────────────────────┤
{{#each issues}}
│  • {{component}}: {{issue_summary}}                         │
{{/each}}
└─────────────────────────────────────────────────────────────┘
```

</check>
</step>

<step n="7" goal="Display recent activity">
<action>Show last 5 completed tasks:</action>

```
┌─────────────────────────────────────────────────────────────┐
│  📝 RECENT ACTIVITY                                         │
├─────────────────────────────────────────────────────────────┤
{{#each recent_tasks limit=5}}
│  {{timestamp}} - {{status_icon}} {{component}}              │
{{/each}}
└─────────────────────────────────────────────────────────────┘
```

</step>

<step n="8" goal="Display next actions">
<action>Determine and show recommended next actions:</action>

```
┌─────────────────────────────────────────────────────────────┐
│  🎯 NEXT ACTIONS                                            │
├─────────────────────────────────────────────────────────────┤
{{#if has_in_progress}}
│  Continue current task: {{current_task}}                    │
│  Command: *migrate-component {{current_task_id}}            │
{{else if has_pending}}
│  Start next task: {{next_task}}                             │
│  Command: *migrate                                          │
{{else if has_attention}}
│  Review issues: {{attention_tasks}}                         │
│  Command: *report-issue                                     │
{{else if all_complete}}
│  All tasks complete! Run validation:                        │
│  Command: validate-migration                                │
{{/if}}
└─────────────────────────────────────────────────────────────┘
```

</step>

<step n="9" goal="Offer detailed view options">
<action>Display options for more details:</action>

```
┌─────────────────────────────────────────────────────────────┐
│  📋 VIEW OPTIONS                                            │
├─────────────────────────────────────────────────────────────┤
│  [1] View all tasks                                         │
│  [2] View completed tasks                                   │
│  [3] View pending tasks                                     │
│  [4] View issues                                            │
│  [5] View test results                                      │
│  [Q] Exit status view                                       │
└─────────────────────────────────────────────────────────────┘
```

<check if="user selects option">
  <action>Display requested detailed view</action>
</check>
</step>

</workflow>

## Status Display Symbols

- ✅ Completed
- 🔄 In Progress
- ⚠️ Needs Attention
- ⏸️ Pending
- 🚫 Blocked
- ⏭️ Skipped
- 🧪 Tests
- 📊 Statistics
- 📁 Phase
- 📝 Activity
- 🎯 Actions
