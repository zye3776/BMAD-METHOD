# Scrape Workflow Instructions

<critical>The workflow execution engine is governed by: {project-root}/\_bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {installed_path}/workflow.yaml</critical>
<critical>This workflow handles web scraping with intelligent source selection</critical>
<critical>Communicate in {communication_language} throughout the scraping process</critical>

<workflow>

<step n="1" goal="Initialize scraping session">

<action>Check if running standalone or invoked from research workflow</action>

<check if="standalone">
  <ask>What topic would you like to scrape content for?</ask>
  <action>Analyze topic to determine topic_type</action>
  <action>Load default source hierarchies from {source_hierarchies}</action>
</check>

<check if="invoked from research workflow">
  <action>Use topic, topic_type, and approved sources from parent workflow</action>
</check>

<action>Generate unique session_id</action>
<action>Create state file at {state_path}/{{session_id}}.json</action>

**Session State Structure:**

```json
{
  "session_id": "{{session_id}}",
  "topic": "{{topic}}",
  "topic_type": "{{topic_type}}",
  "started_at": "{{timestamp}}",
  "current_source": 0,
  "sources": [],
  "results": [],
  "errors": []
}
```

</step>

<step n="2" goal="Load and rank sources">

<action>Load source hierarchy file for {{topic_type}} from {source_hierarchies}</action>

**Source Hierarchy Format:**

```yaml
topic_type: { { topic_type } }
sources:
  priority_1: [high reliability sources]
  priority_2: [medium reliability sources]
  priority_3: [lower reliability sources]
blacklist: [never use]
quality_indicators:
  required: [must have]
  preferred: [nice to have]
```

<action>For each source in hierarchy, calculate reliability score:</action>

**Reliability Calculation:**

```
reliability_score =
  (domain_authority × 0.3) +
  (content_quality × 0.4) +
  (community_trust × 0.2) +
  (technical_markers × 0.1)
```

<action>Filter sources with score below {min_reliability_score}</action>
<action>Apply blacklist filtering</action>
<action>Sort by reliability score descending</action>

<check if="standalone">
  <action>Display ranked sources for user approval</action>
  <ask>Proceed with these sources? [Y/n/edit]</ask>
</check>

</step>

<step n="3" goal="Execute scraping for each source">

<action>Display progress indicator:</action>

```
[Web Scraper] Analyzing sources... ░░░░░░░░░░ 0/{{total}} sources
              Quality: --/10 | Results: 0 items | ETA: calculating...
```

<action>For each approved source, execute scraping sequence:</action>

**3a. Check robots.txt**

- Fetch robots.txt from source domain
- Parse for user-agent rules
- If disallowed: skip source, log warning
- If invalid robots.txt: assume disallow, skip

**3b. Apply rate limiting**

- Default delay: 2000ms between requests
- If rate limited response (429): apply exponential backoff
  - Attempt 1: wait 1s
  - Attempt 2: wait 2s
  - Attempt 3: wait 4s
  - Attempt 4: wait 8s (max)
  - After 3 retries: skip source, log error

**3c. Fetch content**

- Use Playwright for JavaScript-rendered content
- Apply timeout: 30000ms
- Capture: HTML content, response headers, status code

**3d. Extract content**

- Extract main content (article body, documentation)
- Extract metadata: title, author, date, description
- Extract citations/references if present
- Remove boilerplate: nav, footer, ads, sidebars

**3e. Calculate quality score**

- Content length (normalized 0-1)
- Has citations (+0.2)
- Has author (+0.1)
- Recent publication date (+0.1)
- Structured headings (+0.1)
- Clean extraction (+0.1)

**3f. Store result**

```json
{
  "source_url": "{{url}}",
  "source_domain": "{{domain}}",
  "reliability_score": {{reliability}},
  "quality_score": {{quality}},
  "title": "{{title}}",
  "author": "{{author}}",
  "date": "{{date}}",
  "content": "{{extracted_content}}",
  "word_count": {{word_count}},
  "citations": [],
  "metadata": {}
}
```

**3g. Update progress**

```
[Web Scraper] Analyzing sources... ████░░░░░░ {{current}}/{{total}} sources
              Quality: {{avg_quality}}/10 | Results: {{item_count}} items | ETA: ~{{eta}}
              Current: {{current_domain}} → {{status}}
```

**3h. Handle interrupts**

- `pause`: Save state, wait for resume command
- `stop`: Save state, return partial results
- `skip`: Skip current source, continue to next

</step>

<step n="4" goal="Handle errors and recovery">

**Error Types and Recovery:**

| Error Type         | Recovery Action                    |
| ------------------ | ---------------------------------- |
| source_unavailable | Skip with warning, continue        |
| rate_limited       | Exponential backoff, max 3 retries |
| extraction_failed  | Log, skip, flag for review         |
| network_timeout    | Retry once after 5s, then skip     |
| invalid_robots_txt | Assume disallow, skip              |

<action>For each error, log to session state:</action>

```json
{
  "error_type": "{{type}}",
  "source": "{{url}}",
  "timestamp": "{{time}}",
  "message": "{{details}}",
  "recovered": {{boolean}}
}
```

</step>

<step n="5" goal="Aggregate and summarize results">

<action>Compile all successful results</action>

<action>Calculate aggregate metrics:</action>

- Total sources attempted
- Sources successfully scraped
- Sources skipped (with reasons)
- Total content items extracted
- Average quality score
- Average reliability score
- Total word count
- Source diversity score

<action>Generate summary report:</action>

```
═══════════════════════════════════════════════════════════
  Scraping Complete
═══════════════════════════════════════════════════════════

Results:
  • Sources Scraped: {{success_count}}/{{total_count}}
  • Content Items: {{item_count}}
  • Total Words: {{word_count}}
  • Average Quality: {{avg_quality}}/10

Skipped Sources:
{{skipped_list}}

Errors Encountered:
{{error_summary}}
═══════════════════════════════════════════════════════════
```

<action>Save final results to output</action>
<action>Clean up intermediate state (keep session state for resume capability)</action>

<check if="standalone">
  <ask>Would you like to:
  [S] Save results to file
  [R] Refine the content now
  [V] View detailed results
  [E] Exit

Your choice: </ask>
</check>

<check if="invoked from research workflow">
  <action>Return results to parent workflow</action>
</check>

</step>

</workflow>
