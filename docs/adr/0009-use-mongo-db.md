---
status: accepted
date: 2026-10-31
---

# Store ingested news in MongoDB

## Context and Problem Statement
In 0008 I decided to store API responses in a database and serve the feed from there, rather than fetching live on every request. 

Now I need to choose a database solution. The data comes straight out of Currents as JSON. The volume is small, 5 to 10 articles per fetch after filtering. I want a rolling 24 to 48 hour window, not a permanent archive, so old articles should drop off on their own. The same article will show up across runs, so it needs deduping. And it has to persist on a free hosting tier without losing data on restart.

## Considered Options
* In-memory store in the Express process
* SQLite (local file via better-sqlite3, or Turso when hosted)
* PostgreSQL (Neon)
* MongoDB (Atlas)

## Decision Outcome
Chosen option: "MongoDB (Atlas)"

Reasoning: the articles are already JSON, so they drop straight into documents with no mapping and no migration when the source changes a field. A TTL index expires articles after the window on its own, removing the need for separate cleanup job. The Atlas free tier persists, so there's no data loss on restart.

In-memory was rejected because it is wiped on every restart or spin-down.

### Consequences
* The TTL index expires articles automatically, so the retention cleanup job from 0008 isn't needed.
* Flexible schema, so if Currents changes its fields I don't need a migration.
* I'll need an Atlas account and to manage a connection string
