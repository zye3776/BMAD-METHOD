# Source Architecture Analysis

**Generated:** {{date}}
**Source Path:** {{submodule_path}}
**Analyzed By:** Source Analyst (Dr. Scout)

---

## Project Structure

### Directory Layout

{{directory_tree}}

### File Statistics

| Type             | Count               |
| ---------------- | ------------------- |
| Components       | {{component_count}} |
| Style files      | {{style_count}}     |
| Test files       | {{test_count}}      |
| Type definitions | {{type_count}}      |

### Key Locations

- Components: {{components_path}}
- Pages/Routes: {{pages_path}}
- Utilities: {{utils_path}}
- Styles: {{styles_path}}

---

## Component Inventory

### Summary

- Total components: {{total_components}}
- Layout components: {{layout_count}}
- Page components: {{page_count}}
- Feature components: {{feature_count}}
- UI primitives: {{primitive_count}}
- Utility components: {{utility_count}}

### Component Catalog

#### Layout Components

| Component | Path | Props | Dependencies |
| --------- | ---- | ----- | ------------ |

{{layout_components_table}}

#### Page Components

| Component | Path | Route | Dependencies |
| --------- | ---- | ----- | ------------ |

{{page_components_table}}

#### Feature Components

| Component | Path | Props | Dependencies |
| --------- | ---- | ----- | ------------ |

{{feature_components_table}}

#### UI Primitives

| Component | Path | Props | Dependencies |
| --------- | ---- | ----- | ------------ |

{{primitive_components_table}}

#### Utility Components

| Component | Path | Purpose | Dependencies |
| --------- | ---- | ------- | ------------ |

{{utility_components_table}}

---

## Dependency Analysis

### Dependency Graph

```
{{dependency_graph_ascii}}
```

### Migration Order (recommended)

{{migration_order_list}}

### External Dependencies

| Package | Version | Purpose |
| ------- | ------- | ------- |

{{external_deps_table}}

### Shared Utilities

{{shared_utilities_list}}

### Shared Hooks

{{shared_hooks_list}}

### Warnings

{{dependency_warnings}}

---

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

---

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

---

## User Action Flows

### Flow Summary

| Flow Name | Entry Point | Steps | Complexity |
| --------- | ----------- | ----- | ---------- |

{{flow_summary_table}}

### Detailed Click Paths

{{detailed_click_paths}}

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

---

## User Stories (Gherkin Format)

### Story Summary

| Feature | Scenarios | Priority | Migration Impact |
| ------- | --------- | -------- | ---------------- |

{{story_summary_table}}

### Feature Stories

{{feature_stories_gherkin}}

### Edge Cases & Error Scenarios

```gherkin
{{edge_case_scenarios}}
```

### Story Coverage Matrix

| UI Component | Stories Covering | Gaps Identified |
| ------------ | ---------------- | --------------- |

{{coverage_matrix}}

---

## Coding Patterns Analysis

### Component Patterns

- **Component Type:** {{component_type}}
- **Declaration Style:** {{declaration_style}}
- **Props Handling:** {{props_style}}

### Styling Approach

- **Primary Method:** {{styling_method}}
- **Class Naming:** {{class_naming_convention}}
- **Theme System:** {{theme_system}}

### State Management

- **Local State:** {{local_state_approach}}
- **Global State:** {{global_state_approach}}
- **Data Fetching:** {{data_fetching_pattern}}

### TypeScript Conventions

- **Type vs Interface:** {{type_preference}}
- **Props Naming:** {{props_naming}}
- **Strictness Level:** {{ts_strictness}}

### File Organization

- **Naming Convention:** {{file_naming}}
- **Barrel Exports:** {{barrel_usage}}
- **Co-location:** {{colocation_pattern}}

---

## UI System Analysis

### Component Library

- **Primary Library:** {{ui_library}}
- **Version:** {{ui_library_version}}
- **Custom Components:** {{custom_component_count}}

### Design Tokens

{{design_tokens_summary}}

### Theme Configuration

{{theme_config_summary}}

### Icon System

- **Icon Library:** {{icon_library}}
- **Custom Icons:** {{custom_icons}}

---

## Executive Summary

### Source Overview

- **Framework:** {{framework}}
- **Total Components:** {{total_components}}
- **Complexity Level:** {{complexity_assessment}}

### Key Findings

{{key_findings_list}}

### Migration Considerations

{{migration_considerations}}

### Recommended Migration Mode

Based on analysis, the recommended migration mode is: **{{recommended_mode}}**

Rationale: {{mode_rationale}}

### Next Steps

1. Review this analysis with stakeholders
2. Load Migration Architect agent
3. Run `*compare` to map against target project
4. Run `*plan` to generate migration strategy

---

_Generated by UI Migration Toolkit - Source Analyst_
