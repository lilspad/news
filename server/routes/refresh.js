import express from 'express';
import { importArticles } from '../services/importArticles.js';
import { saveImportLog } from '../services/saveImportLog.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const headerSecret = req.get('X-Refresh-Secret');
  const envSecret = process.env.REFRESH_SECRET;

  if (!envSecret || headerSecret !== envSecret) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  try {
    const result = await importArticles();
    const {
      itemsReceived,
      itemsKept,
      itemsInserted,
      newestPostAgeMinutes,
      oldestPostAgeMinutes
    } = result;

    await saveImportLog({
      itemsReceived,
      itemsKept,
      itemsInserted,
      newestPostAgeMinutes,
      oldestPostAgeMinutes,
      status: 'success',
    });

    res.json(result);
  } catch (err) {
    console.error('POST /api/refresh failed:', err);

    await saveImportLog({
      status: 'error',
      errorMsg: err.message,
    });

    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;