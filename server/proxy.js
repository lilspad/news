import express from 'express';

const app = express();
const PORT = 3001;

app.get('/api/news', async (req, res) => {
  const response = await fetch('https://api.currentsapi.services/v1/latest-news', {
    headers: {
      Authorization: process.env.CURRENTS_API_KEY,
    },
  });
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT}`);
});
