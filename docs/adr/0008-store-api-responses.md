---
status: proposed
date: 2026-10-21
---

# Display quality content in the feed pt 2

## Context and Problem Statement
In 0007 I proposed fetching multiple pages from the API to curate a quality list of articles to display on the feed. This proposal was a result of the API (free account) limit of 20 items per page, 1 page per request. While I've accepted and implemented the filtering service (filterArticles.js; it's there to stay) the multi-page fetch isn't enough to fill the feed with meaningful content at all times.

With some local testing with 5 pages of 20 (100 raw articles) I'm seeing a filtered result of 5 to 10 articles (5-10% return), and oldest articles are about 30 minutes old. It's not really "What happened _today_" but "What happened just _now", which is not what I'm trying to achieve.

It's also likely to be heavily dependant on time of day for regional source like BBC posting in peak UK times.

## Considered Options
* Multi-page requests (status quo)
* Increase the allowlist
* Switch API (articles provider)
* Store responses in a Database

## Decision Outcome
Chosen option: "Store responses"

Reasoning: Fetching the articles in regular intervals throughout the day and storing them in a Database that the front-end uses instead, not only fills the feed with more content, but it also removes the need for on-demand data fetching, traffic dependent requests and gives a broader input for the future LLM feature.

### Consequences
* Project scope increased; Database and a scheduling tool needed. Not an issue for a personal project, I'll learn more!
