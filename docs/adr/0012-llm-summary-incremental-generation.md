---
status: accepted
date: 2026-11-07
---

# Generate the news summary incrementally, tied to ingestion

## Context and Problem Statement
I'm adding a "what happened today" summary to the news app. The feed is served from the rolling MongoDB dataset, refreshed by a scheduled job.

The summary must never disagree with the feed: a user who reads a summary about regional elections and a football, then scrolls to a headline about a major global event, has been given a bad summary.

So I need to decide when the summary is generated and how. Generating on a fixed schedule risks the summary going stale with high-value articles coming between runs. Generating per request makes cost scale with traffic and gives different users different summaries.

## Considered Options
* Generate per user request
* Generate the whole dataset on a schedule (e.g. 3x/day)
* Generate from the whole dataset on every non-empty ingest
* Incremental update on every non-empty ingest
* Incremental update on every non-empty ingest, plus a scheduled generation from the full dataset

## Decision Outcome
Chosen option: "Incremental update on every non-empty ingest, plus a scheduled generation from the full dataset." The summary is stored in a collection and the frontend reads the stored copy.

Reasoning: tying generation to refresh means the summary and the feed move together, so they cannot disagree. The incremental update uses only the previous summary plus the new articles from this batch, so each run is small, which keeps cost, energy and latency low.

The less-frequent, scheduled full rebuild prevents the summary from iterating too many times on little data and drifting away from quality.

### Consequences
* A `summaries` collection is needed, holding the text and some meta. Keep a short history for observability and QA.
* The rebuild interval can be changed. Start at 6 hours and use observability to adjust
