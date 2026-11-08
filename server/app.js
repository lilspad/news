import express from 'express';
import cors from 'cors';
import newsRouter from './routes/news.js';
import summaryRouter from './routes/summary.js';
import refreshRouter from './routes/refresh.js';
import generateSummaryRouter from './routes/generateSummary.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.FRONTEND_URL }));

  app.get('/healthz', (req, res) => res.send('ok'));

  app.use('/api/news', newsRouter);
  app.use('/api/summary', summaryRouter);
  app.use('/api/refresh', refreshRouter);
  app.use('/api/generate-summary', generateSummaryRouter);

  return app;
}