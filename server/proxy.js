import express from 'express';
import { filterArticles } from './services/filterArticles.js';

const PORT = 3001;

export function createApp() {
  const app = express();

  app.get('/api/news', async (req, res) => {
    const apiKey = process.env.CURRENTS_API_KEY;
    const url = 'https://api.currentsapi.services/v1/latest-news';
    const params = new URLSearchParams({
      page_size: 20,
      page_number: 1,
    })
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing API key' });
    }

    const response = await fetch(`${url}?${params}`, {
      headers: {
        Authorization: apiKey,
      },
    });
    const data = await response.json();
    const articles = filterArticles(data.news);
    res.json(articles);
  });

  return app;
}

createApp().listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`);
  });
