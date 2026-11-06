import express from 'express';
import 'dotenv/config';
import { connectDB } from './db.js';
import newsRouter from './routes/news.js';
import refreshRouter from './routes/refresh.js';

await connectDB();

const PORT = process.env.SERVER_PORT || 3001;

export function createApp() {
  const app = express();

  app.use('/api/news', newsRouter);
  app.use('/api/refresh', refreshRouter);

  return app;
}

createApp().listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`);
  });
