import { Summary } from '../models/summary.js';
import { generateSummary, refreshSummary } from './generateSummary.js';

/**
 * Generates a summary and saves it to the database.
 * @param {Array<Object>} articles - Articles list to include in the summary.
 * @returns {Promise<void>}
 */
export async function importSummary(articles, incremental = false) {
  const prevSummary = await Summary.findOne().sort({ generatedAt: -1 });
  let result;
  if (incremental) {
    result = await refreshSummary(prevSummary.categories, articles);
  } else {
    result = await generateSummary(articles);
  }
  try {
    const parsedResult = JSON.parse(result);
    await Summary.create({ categories: parsedResult, incremental });
  } catch (e) {
    console.error('Could not import summary: ', e);
  }
}
