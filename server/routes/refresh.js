import express from 'express';
import { importArticles } from '../services/importArticles.js';
import { saveImportLog } from '../services/saveImportLog.js';
import { importSummary } from '../services/importSummary.js';

const router = express.Router();

const REBUILD_INTERVAL_HOURS = 6;

function isRebuildHour(d = new Date()) {
  return d.getUTCMinutes() === 0 && d.getUTCHours() % REBUILD_INTERVAL_HOURS === 0;
}

router.post('/', async (req, res) => {
  const headerSecret = req.get('X-Refresh-Secret');
  const envSecret = process.env.REFRESH_SECRET;

  if (!envSecret || headerSecret !== envSecret) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  try {
    const result = await importArticles();
    const {
      logs, newArticles
    } = result;

    await saveImportLog({
      ...logs,
      status: 'success',
    });

    if (newArticles && !isRebuildHour()) {
      await importSummary(newArticles, true);
    }

    res.json(logs);
  } catch (err) {
    console.error('POST /api/refresh failed:', err);

    await saveImportLog({
      status: 'error',
      errorMsg: err.message,
    });

    res.status(500).json({ error: 'Failed to refresh news and/or summary' });
  }
});

export default router;