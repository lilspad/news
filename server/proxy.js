import express from 'express';

const PORT = 3001;

export function createApp() {
  const app = express();

  app.get('/api/news', async (req, res) => {
    const apiKey = process.env.CURRENTS_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing API key' });
    }

    const response = await fetch('https://api.currentsapi.services/v1/latest-news', {
      headers: {
        Authorization: apiKey,
      },
    });
    const data = await response.json();
    res.json(data);
  });

  return app;
}

createApp().listen(PORT, () => {
    console.log(`Proxy listening on http://localhost:${PORT}`);
  });
