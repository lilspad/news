import express from 'express';
import { importArticles } from '../services/importArticles.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const headerSecret = req.get('X-Refresh-Secret');
  const envSecret = process.env.REFRESH_SECRET;

  if (!envSecret || headerSecret !== envSecret) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  try {
    const result = await importArticles();
    res.json(result);
  } catch (err) {
    console.error('POST /api/refresh failed:', err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;