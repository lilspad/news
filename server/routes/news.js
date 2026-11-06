import express from 'express';
import { Article } from '../models/articles.js';

const router = express.Router();

const HOUR_MS = 1000 * 60 * 60;
const WINDOW_HOURS = 24;

router.get('/', async (req, res) => {
  try {
    const last24Hours = new Date(Date.now() - WINDOW_HOURS * HOUR_MS);
    const articles = await Article.find({ publishedAt: { $gte: last24Hours } })
      .sort({ publishedAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error('GET /api/news failed:', err);
    res.status(500).json({ error: 'Failed to load news' });
  }
});

export default router;