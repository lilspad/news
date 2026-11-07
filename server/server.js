import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './db.js';
import newsRouter from './routes/news.js';
import refreshRouter from './routes/refresh.js';

await connectDB();

const PORT = process.env.PORT || 3001;

export function createApp() {
  const app = express();

  app.use(cors({origin: process.env.FRONTEND_URL}));

  app.get('/healthz', (req, res) => res.send('ok'));

  app.use('/api/news', newsRouter);
  app.use('/api/refresh', refreshRouter);

  return app;
}

createApp().listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`);
  });
