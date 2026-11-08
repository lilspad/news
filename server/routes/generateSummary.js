import express from 'express';
import { importSummary } from '../services/importSummary.js';
import { getArticles } from '../services/getArticles.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const headerSecret = req.get('X-Refresh-Secret');
  const envSecret = process.env.REFRESH_SECRET;

  if (!envSecret || headerSecret !== envSecret) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  try {
    const articles = await getArticles();

    const result = await importSummary(articles);
    res.json(result);
  } catch (err) {
    console.error('POST /api/generate-summary failed:', err);

    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

export default router;
