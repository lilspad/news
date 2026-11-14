import express from 'express';
import { Summary } from '../models/summary.js';
import { formatSummary } from '../services/formatSummary.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const summary = await Summary.findOne().sort({ generatedAt: -1 });
    res.json(formatSummary(summary));
  } catch (err) {
    console.error('GET /api/summary failed:', err);
    res.status(500).json({ error: 'Failed to load a summary' });
  }
});

export default router;
