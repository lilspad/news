import express from 'express';
import 'dotenv/config';
import { connectDB } from './db.js';
import newsRouter from './routes/news.js';

await connectDB();

const PORT = 3001;

export function createApp() {
  const app = express();

  app.use('/api/news', newsRouter);

  return app;
}

createApp().listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`);
  });
