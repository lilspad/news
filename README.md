# Nutshell

A simple latest news feed with an AI overview of the day.

## Overview

TBD

## Features

- Live feed
- AI summary generated with every new post

## Tech Stack

- React + TypeScript + Vite
- CSS modules
- Express.js + Currents API + GenAI
- MongoDB

## Getting Started

### Prerequisites

- Node.js 20.6+
- npm
- A MongoDB connection string (Atlas or local)
- A Currents API key
- A Google GenAI API key

### Installation

The frontend (`app/`) and backend (`server/`) are separate packages. Install each one:

\`\`\`bash
gh repo clone lilspad/news
cd news
cd app && npm install
cd ../server && npm install
\`\`\`

### Running Locally

Vite app:
\`\`\`bash
cd app
npm run dev
\`\`\`

Runs at http://localhost:5173

Server:
\`\`\`bash
cd server
npm run dev
\`\`\`

Runs at http://localhost:3001

## Environment Variables

### Frontend (`app/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | URL of the Express proxy, e.g. `http://localhost:3001` |


### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Port the Express proxy listens on, e.g. `3001` |
| `FRONTEND_URL` | Allowed CORS origin, e.g. `http://localhost:5173` |
| `CURRENTS_API_KEY` | API key for the Currents news API |
| `MONGODB_API_KEY` | MongoDB Atlas connection string |
| `MONGODB_NAME` | Database name, e.g. `test` |
| `REFRESH_SECRET` | Secret for the scheduled ingestion/refresh endpoint |
| `GEMINI_API_KEY` | API key for Google GenAI (Gemini) |

## Project Structure

\`\`\`
news/
├── docs/adr/         # architecture decision records
├── app/              # Vite + React frontend
│   ├── public/       # static assets
│   ├── src/
│   │   ├── assets/   # styles + design tokens
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── data/
│   │   └── test/
│   ├── index.html
│   └── package.json
└── server/           # Express proxy + scheduled ingestion
    ├── data/         # allowed news sources
    ├── models/       # Mongoose schemas
    ├── routes/       # API endpoints
    ├── services/
    ├── test/
    └── package.json
\`\`\`

## Scripts

### Frontend (`app/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the codebase |
| `npm run fix` | Lint and auto-fix |

### Server (`server/`)

| Command | Description |
|---------|-------------|
| `npm start` | Run the Express proxy server |
| `npm run dev` | Run the server and restart on file changes |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint the codebase |
| `npm run fix` | Lint and auto-fix |

## Roadmap

Prospective features:

- [ ] Include reference links in the AI Summary
- [ ] Dark theme toggle
- [ ] "Slim" feed toggle (remove photos)
- [ ] Infinite scroll

Features in the backlog:

- [ ] Filtering/categorisation
- [ ] Search

Bugs to fix:

- [ ] Loading summary state is wider than ready
- [ ] 