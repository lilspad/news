import express from 'express';
import { getArticles } from '../services/getArticles.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const articles = await getArticles();
    res.json(articles);
  } catch (err) {
    console.error('GET /api/news failed:', err);
    res.status(500).json({ error: 'Failed to load news' });
  }
});

export default router;