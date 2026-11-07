---
status: accepted
date: 2026-11-07
---

# Trigger scheduled imports with an external cron service

## Context and Problem Statement
The store only fills when the import runs, so running it by hand is too irregular for a reliable store. I need it to run on a schedule, so the feed builds up through the day.

## Considered Options
* In-process timer (node-cron or setInterval) inside the Express server
* GitHub Actions scheduled workflow
* External cron service (cron-job.org)

## Decision Outcome
Chosen option: "External cron service (cron-job.org)"

Reasoning: it sends POST /api/refresh every 30 minutes with the secret header, and there is nothing in my own code to keep alive. Runs and failures show up in its history and it can email me.

GitHub Actions was rejected because it disables scheduled workflows after 60 days without repo activity, so the feed would quietly stop once the project goes quiet.

In-process timer was rejected because it needs a long-running always-on process, which is the thing I would then have to keep alive, and on a free host that sleeps it would not fire reliably.

### Consequences
* The shared secret now also lives in cron-job.org's config.
