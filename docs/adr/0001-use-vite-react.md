---
status: accepted
date: 2026-10-17
---

# Use Vite, React and TypeScript (plain, no React Compiler)

## Context and Problem Statement
As part of my learning journey, React is a strict requirement for this project. However, there are a few choices for the build tool and language setup.

## Considered Options
* Create React App
* Vite + JavaScript
* Vite + TypeScript
* Vite + TypeScript + React Compiler
* Next.js

## Decision Outcome
Chosen option: "Vite + TypeScript"

Reasoning: Vite is the current standard for a client-side SPA (Create React App is deprecated) and TypeScript catches errors at author time, which outweighs plain JavaScript. The project needs no server rendering or built-in routing, so Next.js's conventions would add complexity without benefit. Plain TypeScript (without the React Compiler) should be sufficient and if memoisation is needed (the main advantage of the compiler), implementing it manually will benefit me more from a learning perspective.