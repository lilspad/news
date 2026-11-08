import { ImportLog } from '../models/importLog.js';

/**
 * Saves an import log entry to the database.
 * @param logInfo - The import meta
 * @returns {Promise<void>}
 */

export async function saveImportLog(logInfo) {
  try {
    await ImportLog.create(logInfo);
  } catch (e) {
    console.error('Import logs not saved: ', e);
  }
}