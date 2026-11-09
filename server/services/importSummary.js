import { Summary } from '../models/summary.js';
import { generateSummary, refreshSummary } from './generateSummary.js';

/**
 * Generates a summary and saves it to the database.
 * @param {Array<Object>} articles - Articles list to include in the summary.
 * @returns {Promise<void>}
 */
export async function importSummary(articles, incremental = false) {
  const prevSummary = await Summary.findOne().sort({ generatedAt: -1 });
  let summary;
  if (incremental) {
    summary = await refreshSummary(prevSummary.text, articles);
    console.log('summary: ', summary);
  } else {
    summary = await generateSummary(articles);
  }
  try {
    await Summary.create({ text: summary, incremental });
  } catch (e) {
    console.error('Could not import summary: ', e);
  }
}
