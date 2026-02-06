# Research Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>This workflow implements 5 mandatory approval checkpoints for human-in-the-loop control</critical>
<critical>Communicate in {communication_language} throughout the research process</critical>

<workflow>

<step n="1" goal="Gather research query and analyze topic">

<action>Ask user for their research topic/query</action>

<ask>What topic would you like to research? Please provide your research question or topic.</ask>

<action>Analyze the query to determine:</action>

**Topic Analysis:**

1. **Topic Type** - Classify as one of:
   - `academic_research` - Scholarly papers, peer-reviewed content
   - `technical_documentation` - Software docs, tutorials, technical guides
   - `general_knowledge` - Wikipedia-style broad information
   - `recipes_lifestyle` - Recipes, how-tos, lifestyle content

2. **Scope** - Narrow, medium, or broad coverage needed
3. **Depth** - Surface overview vs deep dive
4. **Key Terms** - Extract searchable keywords
5. **topic_slug** - Generate URL-safe slug for file naming (e.g., "machine-learning-transformers")

<action>Store analysis results for use in subsequent steps</action>

<template-output>topic_analysis</template-output>
</step>

<step n="2" goal="CHECKPOINT 1 - Present Research Plan">

<action>Generate comprehensive research plan based on topic analysis</action>

**Research Plan Contents:**

```
═══════════════════════════════════════════════════════════
  CHECKPOINT 1: Research Plan
═══════════════════════════════════════════════════════════

Topic: {{topic}}
Type: {{topic_type}}
Scope: {{scope}}
Depth: {{depth}}

Estimated Sources: {{estimated_source_count}}
Expected Output: {{expected_output_description}}

Key Search Terms:
{{key_terms_list}}

Research Strategy:
{{strategy_description}}
```

<ask>Please choose:
[A] Approve - Proceed with this plan
[M] Modify - Adjust the research plan
[C] Cancel - Abort research

Your choice: </ask>

<check if="user selects Modify">
  <action>Ask user what aspects to modify</action>
  <action>Update plan accordingly</action>
  <action>Re-present for approval</action>
</check>

<check if="user selects Cancel">
  <action>Confirm cancellation and exit workflow</action>
</check>

<action>Save checkpoint state to {state_path}/{{session_id}}.json</action>

<template-output>research_plan</template-output>
</step>

<step n="3" goal="Select and rank sources">

<action>Load source hierarchies based on topic_type from {source_hierarchies}</action>

<action>For each potential source, calculate reliability score using weighted formula:</action>

```
reliability_score =
  (domain_authority × 0.3) +
  (content_quality × 0.4) +
  (community_trust × 0.2) +
  (technical_markers × 0.1)
```

**Domain Authority Factors (0.3):**

- .edu/.gov domain: +0.15
- SSL certificate: +0.05
- Domain age > 5 years: +0.10

**Content Quality Factors (0.4):**

- Has citations: +0.15
- Has author credentials: +0.10
- Published within 2 years: +0.10
- Regular updates: +0.05

**Community Trust Factors (0.2):**

- High external link count: +0.10
- Top 10 search ranking: +0.05
- Cited by peers: +0.05

**Technical Markers (0.1):**

- Structured data (schema.org): +0.03
- Proper meta tags: +0.04
- Consistent formatting: +0.03

<action>Filter sources below {min_reliability_score} threshold</action>
<action>Apply any blacklist filters from source hierarchy</action>
<action>Sort remaining sources by reliability score descending</action>

<template-output>source_ranking</template-output>
</step>

<step n="4" goal="CHECKPOINT 2 - Present Source List">

<action>Display ranked sources with reliability scores</action>

```
═══════════════════════════════════════════════════════════
  CHECKPOINT 2: Source List
═══════════════════════════════════════════════════════════

| # | Source              | Reliability | Status   |
|---|---------------------|-------------|----------|
| 1 | {{source_1}}        | {{score_1}} | ✓ Ready  |
| 2 | {{source_2}}        | {{score_2}} | ✓ Ready  |
...

Total Sources: {{total_count}}
Average Reliability: {{avg_reliability}}
```

<ask>Please choose:
[A] Approve All - Proceed with listed sources
[R] Remove - Remove specific sources (enter numbers)
[+] Add - Add a specific source URL
[C] Cancel - Abort research

Your choice: </ask>

<check if="user selects Remove">
  <ask>Enter source numbers to remove (comma-separated):</ask>
  <action>Remove specified sources from list</action>
  <action>Re-display updated list</action>
</check>

<check if="user selects Add">
  <ask>Enter URL to add:</ask>
  <action>Validate URL and calculate reliability score</action>
  <action>Add to source list if meets threshold</action>
  <action>Re-display updated list</action>
</check>

<check if="user selects Cancel">
  <action>Confirm cancellation and exit workflow</action>
</check>

<action>Save checkpoint state</action>

<template-output>approved_sources</template-output>
</step>

<step n="5" goal="Execute scraping with progress">

<action>Initialize scraping session</action>
<action>Create session state file at {state_path}/{{session_id}}.json</action>

<action>For each approved source, execute scraping:</action>

```
[Web Scraper] Analyzing sources... ████████░░ {{current}}/{{total}} sources
              Quality: {{avg_quality}}/10 | Results: {{item_count}} items | ETA: ~{{eta}}
              Current: {{current_source}} → {{current_action}}...
```

**Per-Source Process:**

1. Check robots.txt - Skip if disallowed
2. Apply rate limiting (default 2s delay)
3. Fetch content via Playwright
4. Extract: main content, metadata, citations
5. Calculate quality score for extracted content
6. Store result JSON
7. Update session state checkpoint

**Interrupt Handling:**

- `pause` → Pause at next safe point, preserve state
- `stop` → Stop immediately, save progress, offer resume
- `skip` → Skip current source, continue to next

**Error Recovery:**

- source_unavailable → skip with warning
- rate_limited → exponential backoff (1s→2s→4s→8s), max 3 retries
- extraction_failed → log, skip, flag for checkpoint review

<template-output>scrape_results</template-output>
</step>

<step n="6" goal="CHECKPOINT 3 - Quality Check">

<action>Aggregate scraping metrics</action>

```
═══════════════════════════════════════════════════════════
  CHECKPOINT 3: Quality Check
═══════════════════════════════════════════════════════════

Results Summary:
  • Sources Scraped: {{sources_scraped}}/{{sources_total}}
  • Content Items: {{item_count}}
  • Average Quality: {{avg_quality}}/10
  • Source Diversity: {{source_diversity}}

Issues Found:
{{issues_list}}

Sample High-Quality Result:
─────────────────────────────────────────────────────────────
{{sample_result_preview}}
─────────────────────────────────────────────────────────────
```

<ask>Please choose:
[C] Continue - Proceed to refinement
[A] Adjust - Re-scrape specific sources
[D] Discard - Discard results and start over

Your choice: </ask>

<check if="user selects Adjust">
  <ask>Which sources should be re-scraped? (enter numbers or 'failed'):</ask>
  <action>Re-scrape specified sources</action>
  <action>Update metrics and re-display</action>
</check>

<check if="user selects Discard">
  <action>Confirm discard, clean up state, exit workflow</action>
</check>

<action>Save checkpoint state</action>

<template-output>quality_check</template-output>
</step>

<step n="7" goal="Generate refinement plan">

<action>Analyze scraped content for:</action>

1. **Duplicates** - Content with >= 85% similarity
2. **Gaps** - Missing subtopics or coverage areas
3. **Contradictions** - Conflicting information between sources
4. **Organization** - Best structure based on content type

<action>Generate organization strategy based on {detail_level}:</action>

**Detail Levels:**

- `minimal` (max 1000 words): Brief summaries only
- `standard` (max 3000 words): Balanced detail with analysis
- `detailed` (max 10000 words): Comprehensive with excerpts

<action>Create section outline for refined document</action>

<template-output>refinement_plan</template-output>
</step>

<step n="8" goal="CHECKPOINT 4 - Refinement Plan Approval">

```
═══════════════════════════════════════════════════════════
  CHECKPOINT 4: Refinement Plan
═══════════════════════════════════════════════════════════

Organization Strategy: {{strategy}}
Detail Level: {{detail_level}}
Target Length: ~{{target_words}} words

Proposed Structure:
{{section_outline}}

Refinement Actions:
  • Remove {{duplicate_count}} duplicate sections
  • Merge {{merge_count}} similar content blocks
  • Flag {{contradiction_count}} contradictions for review
```

<ask>Please choose:
[A] Approve - Proceed with refinement
[M] Modify - Adjust the plan
[S] Skip - Keep raw content, skip refinement

Your choice: </ask>

<check if="user selects Modify">
  <ask>What would you like to change? (structure/detail level/specific sections):</ask>
  <action>Update refinement plan accordingly</action>
  <action>Re-present for approval</action>
</check>

<check if="user selects Skip">
  <action>Skip refinement, proceed directly to final review with raw content</action>
  <goto step="10"/>
</check>

<action>Save checkpoint state</action>

<template-output>refinement_plan_approved</template-output>
</step>

<step n="9" goal="Execute content refinement">

<action>Invoke refine workflow: {refine_workflow}</action>

<action>Pass to refine workflow:</action>

- Scraped content from step 5
- Approved refinement plan from step 8
- Detail level setting
- Organization strategy

<action>Refine workflow executes:</action>

1. Remove duplicates (similarity >= 85%)
2. Filter low-quality content (< 500 words)
3. Organize by approved structure
4. Generate section summaries
5. Create cross-references
6. Format citations consistently
7. Generate executive summary

<action>Receive refined content back</action>

<template-output>refined_content</template-output>
</step>

<step n="10" goal="CHECKPOINT 5 - Final Review">

<action>Generate document preview</action>

```
═══════════════════════════════════════════════════════════
  CHECKPOINT 5: Final Review
═══════════════════════════════════════════════════════════

Document Preview:
─────────────────────────────────────────────────────────────
{{executive_summary}}

Table of Contents:
{{toc_preview}}
─────────────────────────────────────────────────────────────

Document Statistics:
  • Total Words: {{word_count}}
  • Sections: {{section_count}}
  • Citations: {{citation_count}}
  • Quality Score: {{quality_score}}/10

Output File: {{output_file_path}}
```

<ask>Please choose:
[S] Save - Save document to file
[V] View Full - Display complete document
[R] Refine More - Apply additional refinement
[D] Discard - Discard and exit

Your choice: </ask>

<check if="user selects View Full">
  <action>Display complete document content</action>
  <action>Return to this checkpoint for final decision</action>
</check>

<check if="user selects Refine More">
  <ask>What additional refinement is needed?</ask>
  <action>Apply requested changes</action>
  <action>Re-display preview</action>
</check>

<check if="user selects Discard">
  <action>Confirm discard, clean up state, exit workflow</action>
</check>

<template-output>final_document</template-output>
</step>

<step n="11" goal="Save and complete">

<action>Save final document to {research_output_path}/research-{{topic_slug}}-{{date}}.md</action>
<action>Clean up session state files</action>

```
═══════════════════════════════════════════════════════════
  ✨ Research Complete!
═══════════════════════════════════════════════════════════

Saved to: {{output_file_path}}

Summary:
  • Topic: {{topic}}
  • Sources: {{source_count}} high-quality sources
  • Output: {{word_count}} words with {{citation_count}} citations
  • Quality Score: {{quality_score}}/10

Thank you for using the General Research Module!
═══════════════════════════════════════════════════════════
```

<template-output>completion</template-output>
</step>

</workflow>
