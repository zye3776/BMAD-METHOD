# Refine Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>This workflow transforms raw scraped content into polished, organized research</critical>
<critical>Communicate in {communication_language} throughout the refinement process</critical>

<workflow>

<step n="1" goal="Load and analyze content">

<check if="standalone">
  <ask>Please provide the path to scraped content file or paste content directly:</ask>
  <action>Load content from specified source</action>
</check>

<check if="invoked from research workflow">
  <action>Use scraped content passed from parent workflow</action>
</check>

<action>Analyze loaded content:</action>

**Content Analysis Metrics:**

- Total content items: {{item_count}}
- Total word count: {{word_count}}
- Unique sources: {{source_count}}
- Themes detected: {{theme_list}}
- Potential duplicates: {{duplicate_clusters}}
- Quality distribution: {{quality_histogram}}

<action>Map source diversity across content</action>

</step>

<step n="2" goal="Remove duplicates and filter">

<action>Identify duplicate clusters using similarity threshold (>= 85%)</action>

**Duplicate Detection Algorithm:**

1. Calculate text fingerprints for each content item
2. Compare fingerprints pairwise
3. Group items with >= 85% similarity into clusters
4. For each cluster, select highest quality version

**Selection Criteria for Duplicates:**

- Prefer higher reliability source
- Prefer more recent publication date
- Prefer content with citations
- Prefer longer, more detailed version

<action>Filter low-quality content:</action>

- Remove items < 500 words (unless highly reliable source)
- Remove items without clear attribution
- Flag items with extraction errors

<action>Generate filtering report:</action>

```
Filtering Results:
  • Duplicate clusters found: {{cluster_count}}
  • Items removed as duplicates: {{duplicate_removed}}
  • Items filtered for quality: {{quality_filtered}}
  • Items retained: {{retained_count}}
```

</step>

<step n="3" goal="Organize by structure">

<action>Determine organization strategy based on content type and user preference</action>

**Organization Methods:**

1. **by_theme** (default for most topics)
   - Identify major themes/subtopics
   - Group related content under themes
   - Order themes by relevance to main topic

2. **by_chronology** (for historical/timeline topics)
   - Order content by publication date
   - Group by time periods
   - Highlight evolution of information

3. **by_importance** (for comprehensive overviews)
   - Rank content by relevance score
   - Most important findings first
   - Supporting details follow

4. **by_source_type** (for source comparison)
   - Group by source category (academic, news, docs)
   - Compare perspectives across source types
   - Highlight agreements/disagreements

<action>Create section outline:</action>

```
Document Structure:
├── Executive Summary
├── Key Findings
├── {{section_1}}
│   ├── {{subsection_1a}}
│   └── {{subsection_1b}}
├── {{section_2}}
│   ├── {{subsection_2a}}
│   └── {{subsection_2b}}
├── Source Analysis
├── Methodology
└── Citations
```

<action>Assign content items to sections</action>
<action>Order items within sections by quality and relevance</action>

</step>

<step n="4" goal="Generate content by detail level">

<action>Apply detail level settings from {detail_level}</action>

**Minimal (max 1000 words):**

- Brief summaries only
- Key points per section
- Essential citations
- No analysis or excerpts

**Standard (max 3000 words):**

- Balanced narrative
- Section summaries with key details
- Analysis of findings
- Full citations
- No lengthy excerpts

**Detailed (max 10000 words):**

- Comprehensive coverage
- Full analysis with supporting evidence
- Direct excerpts from sources
- Extended citations with context
- Appendices with raw data

<action>For each section, synthesize content:</action>

1. Combine related findings into coherent narrative
2. Highlight points of agreement across sources
3. Note contradictions and conflicting information
4. Add section summaries

</step>

<step n="5" goal="Generate cross-references">

<action>Link related concepts across sections</action>

**Cross-Reference Types:**

- Internal links (between document sections)
- Concept index entries
- Glossary terms
- Source relationship map

<action>Create concept index:</action>

```
Index:
  {{concept_1}}: See sections {{section_refs}}
  {{concept_2}}: See sections {{section_refs}}
  ...
```

<action>Generate glossary for technical terms</action>

<action>Map source relationships:</action>

- Which sources cite each other
- Which sources cover similar ground
- Where sources disagree

</step>

<step n="6" goal="Format citations">

<action>Apply consistent citation format throughout</action>

**Citation Format:**

```
[Author, "Title", Source, Date] - Reliability: X.XX
```

<action>Generate in-text citation links</action>
<action>Add source reliability notes where relevant</action>

<action>Compile full citation list:</action>

```
Citations:
[1] Author. "Title." Source (Date). URL. Reliability: X.XX
[2] Author. "Title." Source (Date). URL. Reliability: X.XX
...
```

</step>

<step n="7" goal="Generate executive summary">

<action>Create executive summary answering the research question</action>

**Executive Summary Components:**

1. **Direct Answer** (2-3 sentences) - Clear response to research question
2. **Key Discoveries** - Top 3-5 findings
3. **Confidence Level** - Based on source reliability and agreement
4. **Gaps/Limitations** - What couldn't be determined

**Confidence Calculation:**

- High (>0.8): Multiple reliable sources agree
- Medium (0.6-0.8): Some agreement, minor contradictions
- Low (<0.6): Significant disagreements or limited sources

</step>

<step n="8" goal="Quality check">

<action>Verify quality requirements are met:</action>

**Quality Checklist:**

- [ ] Source diversity >= 3 unique sources
- [ ] Duplicate content <= 25%
- [ ] All claims have citations
- [ ] Logical flow maintained
- [ ] Consistent terminology used
- [ ] Topic adequately covered

<action>Calculate final quality score:</action>

```
Quality Assessment:
  Content Depth:     {{depth_score}}/10 (weight: 0.30)
  Source Diversity:  {{diversity_score}}/10 (weight: 0.20)
  Coherence:         {{coherence_score}}/10 (weight: 0.25)
  Completeness:      {{completeness_score}}/10 (weight: 0.25)
  ─────────────────────────────────────────────────
  Final Score:       {{final_score}}/10
```

<action>Flag any unmet requirements for user review</action>

</step>

<step n="9" goal="Output refined document">

<action>Compile final document using template</action>

<action>Apply template with all generated content:</action>

- Executive summary
- Table of contents
- Key findings
- Detailed sections
- Source analysis
- Methodology
- Citations
- Appendices

<check if="standalone">
  <ask>Save refined document to file? [Y/n]</ask>
  <action if="yes">Save to {research_output_path}/refined-{{topic_slug}}-{{date}}.md</action>
</check>

<check if="invoked from research workflow">
  <action>Return refined content to parent workflow</action>
</check>

<action>Display completion summary:</action>

```
═══════════════════════════════════════════════════════════
  Refinement Complete
═══════════════════════════════════════════════════════════

Document Statistics:
  • Final Word Count: {{word_count}}
  • Sections: {{section_count}}
  • Citations: {{citation_count}}
  • Quality Score: {{final_score}}/10

Refinement Actions:
  • Duplicates Removed: {{duplicate_count}}
  • Content Filtered: {{filtered_count}}
  • Cross-References: {{xref_count}}
═══════════════════════════════════════════════════════════
```

</step>

</workflow>
