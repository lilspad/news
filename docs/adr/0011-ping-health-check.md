---
status: accepted
date: 2026-11-07
---

# Keep the backend service awake with a healthz ping

## Context and Problem Statement
In 0010 I chose an external cron to call POST /api/refresh every 30 minutes. The backend runs on Render's free tier, which spins the service down after about 15 minutes idle. So the cron always arrives at a sleeping service.

The cold start is slower than cron-job.org's request timeout, and during spin-up Render returns its own no-deploy HTML page, which is larger than cron-job's response limit, so the run fails with "output too large." The same spin-down also makes the first feed load slow for users after a quiet spell.

## Considered Options
* Accept cold starts and raise cron-job.org's request timeout
* Keep the service warm with a healthz ping
* Move to a paid Render tier that does not sleep

## Decision Outcome
Chosen option: "Keep the service warm with a healthz ping"

Reasoning: I added a trivial unauthenticated GET /healthz that returns ok and does no database or API work, and a second cron-job that pings it every 10 minutes. This keeps the service up, so the refresh cron lands on a warm service and user feed loads are fast, all on the free tier.

Raising the timeout was infeasible, as cronjob's mac timeout is 30s.

A paid tier was rejected for now because a personal project does not justify the cost.

### Consequences
* Keeping it warm runs the service near 24/7, so I'll need to monitor the Render instance limits.
* A second cron job to maintain.
* /healthz is deliberately simple so the ping cannot fail or do work. A real readiness check would be a separate endpoint.
