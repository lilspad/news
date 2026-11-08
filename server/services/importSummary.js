import { Summary } from '../models/summary.js';
import { generateSummary } from './generateSummary.js';

/**
 * Generates a summary and saves it to the database.
 * @param {Array<Object>} articles - Articles list to include in the summary.
 * @returns {Promise<void>}
 */
export async function importSummary(articles) {
  const summary = await generateSummary(articles);
  try {
    await Summary.create({ text: summary });
  } catch (e) {
    console.error('Could not import summary: ', e);
  }
}
