# Analyze Source - Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>Communicate in {communication_language} throughout the analysis process</critical>

<workflow>

<step n="1" goal="Locate and validate source submodule">
<action>Check if submodule_path is configured</action>
<check if="submodule_path not configured">
  <ask>Please provide the path to your AI-generated source code (e.g., ./ui-prototype or ./submodules/lovable-app)</ask>
  <action>Store the provided path as submodule_path</action>
</check>

<action>Validate the source path exists and contains code</action>
<check if="path does not exist or is empty">
<action>Report error: Source path not found or empty</action>
<action>Provide guidance on adding source as git submodule</action>
<goto step="1">Retry path input</goto>
</check>

<action>Identify the framework/technology stack from package.json or file patterns</action>
<action>Report: Source located at {submodule_path}, detected stack: {detected_stack}</action>
</step>

<step n="2" goal="Analyze project structure">
<action>Scan source directory structure</action>
<action>Identify key directories:</action>
  - Components location (src/components, components/, app/components)
  - Pages/routes location (src/pages, pages/, app/)
  - Utilities/hooks location (src/utils, src/hooks, lib/)
  - Styles location (styles/, src/styles)
  - Types location (types/, src/types)
  - Tests location if present

<action>Count files by type:</action>

- Total component files (.tsx, .jsx)
- Style files (.css, .scss, .module.css)
- Test files (.test.tsx, .spec.tsx)
- Type definition files (.d.ts)

<action>Generate directory tree visualization</action>

<template-output section="project-structure">
## Project Structure

### Directory Layout

{directory_tree}

### File Statistics

| Type             | Count             |
| ---------------- | ----------------- |
| Components       | {component_count} |
| Style files      | {style_count}     |
| Test files       | {test_count}      |
| Type definitions | {type_count}      |

### Key Locations

- Components: {components_path}
- Pages/Routes: {pages_path}
- Utilities: {utils_path}
- Styles: {styles_path}
  </template-output>
  </step>

<step n="3" goal="Catalog all components">
<action>Scan all component files</action>
<action>For each component, extract:</action>
  - Component name
  - File path
  - Export type (default/named)
  - Props interface/type
  - Dependencies (imports)
  - Child components used
  - Hooks used
  - Is it a page or reusable component

<action>Categorize components:</action>

- Layout components (Header, Footer, Sidebar, Layout)
- Page components (routes/pages)
- Feature components (complex, domain-specific)
- UI primitives (Button, Input, Card, etc.)
- Utility components (Provider, ErrorBoundary)

<template-output section="component-inventory">
## Component Inventory

### Summary

- Total components: {total_components}
- Layout components: {layout_count}
- Page components: {page_count}
- Feature components: {feature_count}
- UI primitives: {primitive_count}
- Utility components: {utility_count}

### Component Catalog

#### Layout Components

{layout_components_table}

#### Page Components

{page_components_table}

#### Feature Components

{feature_components_table}

#### UI Primitives

{primitive_components_table}

#### Utility Components

{utility_components_table}
</template-output>
</step>

<step n="4" goal="Map component dependencies">
<action>Build dependency graph for all components</action>
<action>Identify:</action>
  - Which components depend on which
  - Shared utilities and hooks
  - External library dependencies
  - Circular dependencies (flag as warnings)

<action>Determine migration order based on dependencies</action>

- Components with no internal dependencies first
- Then components that depend only on already-listed components
- Continue until all components ordered

<template-output section="dependency-map">
## Dependency Analysis

### Dependency Graph

{dependency_graph_ascii}

### Migration Order (recommended)

{migration_order_list}

### External Dependencies

| Package | Version | Purpose |
| ------- | ------- | ------- |

{external_deps_table}

### Shared Utilities

{shared_utilities_list}

### Shared Hooks

{shared_hooks_list}

### Warnings

{dependency_warnings}
</template-output>
</step>

<step n="5" goal="Map component relationships and data flow">
<action>Analyze component hierarchy and relationships:</action>

**Parent-Child Hierarchies:**

- Trace component tree from root (App/Layout) down
- Identify wrapper/container components
- Map which components render which children
- Note conditional rendering patterns

**Data Flow Patterns:**

- Props drilling chains (identify deep prop passing)
- Context providers and consumers
- Callback propagation (child-to-parent communication)
- Shared state connections

**Component Composition:**

- Higher-order components (HOCs)
- Render props patterns
- Compound component patterns
- Slot/children patterns

<action>Create visual relationship diagrams:</action>

- Component tree structure
- Data flow arrows (props down, callbacks up)
- Context boundaries
- State management boundaries

<template-output section="component-relationships">
## Component Relationships

### Component Hierarchy Tree

```
{{component_tree_ascii}}
```

### Data Flow Map

```
{{data_flow_diagram}}
```

### Parent-Child Relationships

| Parent | Children | Data Passed | Callbacks |
| ------ | -------- | ----------- | --------- |

{{parent_child_table}}

### Context Providers

| Context | Provider Location | Consumers | Data Provided |
| ------- | ----------------- | --------- | ------------- |

{{context_providers_table}}

### Props Drilling Chains

{{props_drilling_analysis}}

### Component Composition Patterns

{{composition_patterns_list}}
</template-output>
</step>

<step n="6" goal="Map URL routes and navigation structure">
<action>Extract all route definitions:</action>
- Parse router configuration (React Router, Next.js pages/app, etc.)
- Identify route paths and their components
- Map dynamic route parameters
- Note route nesting and layouts

<action>Analyze route characteristics:</action>

**Route Types:**

- Public routes (accessible without auth)
- Protected routes (require authentication)
- Admin/role-restricted routes
- API routes (if applicable)

**Route Features:**

- Query parameter usage
- Route guards/middleware
- Redirects and fallbacks
- 404/error handling routes

<action>Map navigation components:</action>

- Navigation bars and menus
- Sidebar navigation
- Breadcrumbs
- Footer links
- In-page navigation (tabs, wizards)
- Programmatic navigation (useNavigate, router.push)

<action>Analyze deep linking:</action>

- Which routes support direct access
- State preservation on refresh
- URL-based filtering/sorting
- Shareable URLs

<template-output section="routes-navigation">
## URL Routes & Navigation

### Route Map

| Path | Component | Type | Auth | Parameters |
| ---- | --------- | ---- | ---- | ---------- |

{{route_map_table}}

### Route Hierarchy

```
{{route_hierarchy_tree}}
```

### Navigation Components

| Component | Location | Links To | Type |
| --------- | -------- | -------- | ---- |

{{navigation_components_table}}

### Protected Routes

| Route | Required Role | Redirect On Fail |
| ----- | ------------- | ---------------- |

{{protected_routes_table}}

### Dynamic Routes

| Pattern | Example | Parameters | Usage |
| ------- | ------- | ---------- | ----- |

{{dynamic_routes_table}}

### Deep Linking Support

{{deep_linking_analysis}}
</template-output>
</step>

<step n="7" goal="Document user action flows with detailed click paths">
<action>Identify primary user tasks the UI supports</action>
<action>For each major feature/flow, document the detailed click path:</action>

**Click Path Documentation Format:**

```
Flow: [Flow Name]
Entry Point: [Where user starts]
Goal: [What user wants to accomplish]

Steps:
1. [Location] → Click [Element] → [Result/Navigation]
2. [Location] → Enter [Data] in [Field] → [Validation/Feedback]
3. [Location] → Click [Element] → [Result/Navigation]
...
Exit Point: [Final state/page]
```

<action>Analyze interaction patterns:</action>

- Form submissions and their handlers
- Modal/dialog flows
- Multi-step wizards
- Search and filter interactions
- CRUD operations
- Confirmation dialogs
- Error handling flows
- Loading states and feedback

<action>Map user decision points:</action>

- Conditional paths based on user choices
- Branch points in flows
- Optional vs required steps
- Abort/cancel paths

<template-output section="user-action-flows">
## User Action Flows

### Flow Summary

| Flow Name | Entry Point | Steps | Complexity |
| --------- | ----------- | ----- | ---------- |

{{flow_summary_table}}

### Detailed Click Paths

{{#each user_flows}}

#### {{flow_name}}

**Entry Point:** {{entry_point}}
**Goal:** {{goal}}
**Complexity:** {{complexity}}

**Click Path:**

```
{{click_path_steps}}
```

**Decision Points:**
{{decision_points}}

**Error Handling:**
{{error_handling}}

---

{{/each}}

### Interaction Patterns

| Pattern | Components | Frequency |
| ------- | ---------- | --------- |

{{interaction_patterns_table}}

### Form Flows

| Form | Location | Fields | Submission Handler | Validation |
| ---- | -------- | ------ | ------------------ | ---------- |

{{form_flows_table}}

### Modal/Dialog Flows

| Trigger | Modal | Purpose | Actions Available |
| ------- | ----- | ------- | ----------------- |

{{modal_flows_table}}
</template-output>
</step>

<step n="8" goal="Generate user stories in Gherkin format">
<action>Derive user stories from analyzed flows and UI structure</action>
<action>Format each story using Gherkin syntax:</action>

**Gherkin Format:**

```gherkin
Feature: [Feature Name]
  As a [user role]
  I want to [action]
  So that [benefit]

  Background:
    Given [precondition]

  Scenario: [Scenario Name]
    Given [initial context]
    When [action taken]
    And [additional action]
    Then [expected outcome]
    And [additional outcome]

  Scenario Outline: [Parameterized Scenario]
    Given [context with <parameter>]
    When [action with <parameter>]
    Then [outcome with <parameter>]

    Examples:
      | parameter | expected |
      | value1    | result1  |
      | value2    | result2  |
```

<action>Organize stories by feature area:</action>

- Authentication & Authorization
- Navigation & Routing
- Data Display & Listing
- Data Entry & Forms
- Search & Filtering
- User Settings & Preferences
- Error Handling & Edge Cases

<action>Include both happy paths and edge cases</action>

<template-output section="user-stories">
## User Stories (Gherkin Format)

### Story Summary

| Feature | Scenarios | Priority | Migration Impact |
| ------- | --------- | -------- | ---------------- |

{{story_summary_table}}

### Feature Stories

{{#each features}}

### {{feature_name}}

```gherkin
Feature: {{feature_name}}
  As a {{user_role}}
  I want to {{user_action}}
  So that {{user_benefit}}

{{#if background}}
  Background:
{{background}}
{{/if}}

{{#each scenarios}}
  Scenario: {{scenario_name}}
{{scenario_steps}}

{{/each}}
```

**Migration Notes:** {{migration_notes}}

---

{{/each}}

### Edge Cases & Error Scenarios

```gherkin
{{edge_case_scenarios}}
```

### Story Coverage Matrix

| UI Component | Stories Covering | Gaps Identified |
| ------------ | ---------------- | --------------- |

{{coverage_matrix}}
</template-output>
</step>

<step n="9" goal="Identify coding patterns and conventions">
<action>Analyze source code patterns:</action>

**Component Patterns:**

- Function components vs class components
- Arrow functions vs function declarations
- Props destructuring style
- Default props handling

**Styling Approach:**

- CSS Modules
- Styled-components / Emotion
- Tailwind CSS
- Inline styles
- Global CSS

**State Management:**

- React useState/useReducer
- Context API usage
- External state libraries (Redux, Zustand, Jotai)

**TypeScript Conventions:**

- Interface vs type usage
- Props type naming ({Component}Props)
- Generic patterns
- Strict mode indicators

**File Naming:**

- PascalCase vs kebab-case
- Index file usage
- Barrel exports

<template-output section="coding-patterns">
## Coding Patterns Analysis

### Component Patterns

- **Component Type:** {component_type} (FC/class/mixed)
- **Declaration Style:** {declaration_style}
- **Props Handling:** {props_style}

### Styling Approach

- **Primary Method:** {styling_method}
- **Class Naming:** {class_naming_convention}
- **Theme System:** {theme_system}

### State Management

- **Local State:** {local_state_approach}
- **Global State:** {global_state_approach}
- **Data Fetching:** {data_fetching_pattern}

### TypeScript Conventions

- **Type vs Interface:** {type_preference}
- **Props Naming:** {props_naming}
- **Strictness Level:** {ts_strictness}

### File Organization

- **Naming Convention:** {file_naming}
- **Barrel Exports:** {barrel_usage}
- **Co-location:** {colocation_pattern}
  </template-output>
  </step>

<step n="10" goal="Assess UI library and design system">
<action>Identify UI component libraries used:</action>
  - shadcn/ui
  - Material UI
  - Chakra UI
  - Ant Design
  - Radix UI primitives
  - Custom components only

<action>Document design tokens if present:</action>

- Colors
- Typography
- Spacing
- Breakpoints

<action>Note any theme configuration</action>

<template-output section="ui-system">
## UI System Analysis

### Component Library

- **Primary Library:** {ui_library}
- **Version:** {ui_library_version}
- **Custom Components:** {custom_component_count}

### Design Tokens

{design_tokens_summary}

### Theme Configuration

{theme_config_summary}

### Icon System

- **Icon Library:** {icon_library}
- **Custom Icons:** {custom_icons}
  </template-output>
  </step>

<step n="11" goal="Generate analysis summary and recommendations">
<action>Compile all findings into executive summary</action>
<action>Provide migration complexity assessment</action>
<action>List key considerations for migration planning</action>

<template-output section="summary">
## Executive Summary

### Source Overview

- **Framework:** {framework}
- **Total Components:** {total_components}
- **Complexity Level:** {complexity_assessment}

### Key Findings

{key_findings_list}

### Migration Considerations

{migration_considerations}

### Recommended Migration Mode

Based on analysis, the recommended migration mode is: **{recommended_mode}**

Rationale: {mode_rationale}

### Next Steps

1. Review this analysis with stakeholders
2. Load Migration Architect agent
3. Run `*compare` to map against target project
4. Run `*plan` to generate migration strategy
   </template-output>
   </step>

</workflow>
