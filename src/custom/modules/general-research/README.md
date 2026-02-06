# General Research Module

A powerful single-user research tool that intelligently collects, refines, and organizes knowledge from the web using smart source selection and BMad-powered workflows.

## Overview

This module provides:

- **3 Specialized Agents** for research orchestration, web scraping, and content refinement
- **3 Core Workflows** for end-to-end research, scraping, and refinement operations
- **4 Source Hierarchies** for intelligent source selection across different topic types
- **5 Approval Checkpoints** for human-in-the-loop control throughout research

## Installation

```bash
bmad install general-research
```

## Components

### Agents (3)

| Agent                 | Role         | Description                                                                               |
| --------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| **Research Master**   | Orchestrator | Primary interface for the module. Manages research operations and orchestrates workflows. |
| **Web Scraper**       | Specialist   | Handles topic analysis, source selection, reliability scoring, and content extraction.    |
| **Knowledge Refiner** | Specialist   | Transforms raw scraped content into polished, organized research documents.               |

### Workflows (3)

| Workflow     | Type     | Description                                              |
| ------------ | -------- | -------------------------------------------------------- |
| **research** | Document | End-to-end research pipeline with 5 approval checkpoints |
| **scrape**   | Action   | Web scraping with intelligent source selection           |
| **refine**   | Document | Content refinement, deduplication, and organization      |

### Source Hierarchies (4)

| Type                      | Best For                                | Top Sources                                |
| ------------------------- | --------------------------------------- | ------------------------------------------ |
| `academic_research`       | Scholarly papers, peer-reviewed content | Google Scholar, PubMed, arXiv, IEEE        |
| `technical_documentation` | Software docs, tutorials, guides        | MDN, Official docs, GitHub, Stack Overflow |
| `general_knowledge`       | Encyclopedic content, broad research    | Wikipedia, Britannica, News outlets        |
| `recipes_lifestyle`       | Recipes, cooking, how-tos               | Serious Eats, Bon Appétit, Food Network    |

## Quick Start

1. **Load the Research Master agent:**

   ```
   /bmad:general-research:agents:research-master
   ```

2. **View available commands:**

   ```
   *help
   ```

3. **Start interactive research:**
   ```
   *research
   ```

## Module Structure

```
general-research/
├── agents/
│   ├── research-master.agent.yaml    # Primary orchestrator
│   ├── web-scraper.agent.yaml        # Source selection & scraping
│   └── knowledge-refiner.agent.yaml  # Content refinement
├── workflows/
│   ├── research/                     # End-to-end pipeline
│   │   ├── workflow.yaml
│   │   ├── instructions.md
│   │   └── template.md
│   ├── scrape/                       # Scraping execution
│   │   ├── workflow.yaml
│   │   └── instructions.md
│   └── refine/                       # Content refinement
│       ├── workflow.yaml
│       ├── instructions.md
│       └── template.md
├── data/
│   └── _default-sources/             # Source hierarchies
│       ├── academic-research.yaml
│       ├── technical-documentation.yaml
│       ├── general-knowledge.yaml
│       └── recipes-lifestyle.yaml
├── _module-installer/
│   └── install-config.yaml           # Installation configuration
├── README.md
└── TODO.md
```

## Configuration

After installation, the module is configured at `_bmad/general-research/config.yaml`

### Key Settings

| Setting                         | Default                   | Description                                     |
| ------------------------------- | ------------------------- | ----------------------------------------------- |
| `research_output_path`          | `.research`               | Where research outputs are saved                |
| `default_topic_type`            | `technical_documentation` | Default research topic type                     |
| `detail_level`                  | `standard`                | Output detail level (minimal/standard/detailed) |
| `auto_approve_high_reliability` | `false`                   | Auto-approve sources with >0.9 reliability      |
| `min_reliability_score`         | `0.7`                     | Minimum source reliability threshold            |

## Approval Checkpoints

The research workflow includes 5 mandatory checkpoints for human control:

| #   | Checkpoint          | User Can                              |
| --- | ------------------- | ------------------------------------- |
| 1   | **Research Plan**   | Approve, Modify, Cancel               |
| 2   | **Source List**     | Approve All, Remove, Add, Cancel      |
| 3   | **Quality Check**   | Continue, Adjust, Discard             |
| 4   | **Refinement Plan** | Approve, Modify, Skip                 |
| 5   | **Final Review**    | Save, View Full, Refine More, Discard |

## Reliability Scoring

Sources are scored using a 4-factor weighted formula:

```
reliability_score =
  (domain_authority × 0.3) +
  (content_quality × 0.4) +
  (community_trust × 0.2) +
  (technical_markers × 0.1)
```

## Examples

### Example 1: Technical Documentation Research

```
*research
> What topic? "React Server Components best practices"
> [Approves plan]
> [Approves sources: react.dev, MDN, GitHub discussions]
> [Quality check passes]
> [Approves refinement]
> [Saves final document]

Output: .research/research-react-server-components-2025-12-04.md
```

### Example 2: Academic Research

```
*research
> What topic? "Machine learning transformer architectures"
> [Modifies plan to narrow scope]
> [Adds arXiv source, removes blog]
> [Adjusts quality - re-scrape one source]
> [Modifies refinement for detailed output]
> [Views full document, then saves]

Output: .research/research-ml-transformers-2025-12-04.md
```

## Custom Source Configurations

Create custom topic configurations at `.general-research/topics/[topic-name].yaml`:

```yaml
topic: machine_learning_research
description: 'Custom config for ML/AI research'

sources:
  priority_1: [arxiv.org, papers.nips.cc]
  priority_2: [github.com/papers-with-code]
  blacklist: [reddit.com]

quality_indicators:
  required: [citations, peer_review]
  preferred: [code_availability]

output_preferences:
  format: markdown
  detail_level: detailed
```

## Development Roadmap

See [TODO.md](TODO.md) for planned features and development phases.

## Contributing

To extend this module:

1. Add new agents using `create-agent` workflow
2. Add new workflows using `create-workflow` workflow
3. Add new source hierarchies in `data/_default-sources/`
4. Submit improvements via pull request

## Author

Created by Zee on 2025-12-04

## Version

1.0.0
