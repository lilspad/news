import express from 'express';
import { Summary } from '../models/summary.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const summary = await Summary.findOne().sort({ generateAt: -1 });
    res.json(summary);
  } catch (err) {
    console.error('GET /api/summary failed:', err);
    res.status(500).json({ error: 'Failed to load a summary' });
  }
});

export default router;
