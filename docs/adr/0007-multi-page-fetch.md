---
status: superseded by 0008
date: 2026-10-21
---

# Display quality content in the feed

## Context and Problem Statement
The free news API returns mixed-quality articles (junk sources, missing fields) and its free tier caps results at 20 per page, one page per request. The app should show a clean, reputable feed with enough articles to fill it.

## Considered Options
* Use the raw API data as-is
* Switch to a paid API with better built-in filtering
* Filter server-side in our own layer, and fetch multiple pages to keep enough results after filtering

## Decision Outcome
Chosen option: "filter server-side plus multi-page fetch"

Reasoning: A filter layer in the proxy drops articles with no content or a non-allowlisted source and removes duplicates. Several pages are fetched in parallel to fill the feed, server-side. This is free, works with any API in theory, and keeps me accountable for quality instead of a vendor. Use the existing source dictionary as allowlist, curate if necessary.

### Consequences
* More API requests per refresh (one per page), which might require response caching if free limit is reached on a daily basis.
* The allowlist now controls the feed directly, editing it changes the content.
