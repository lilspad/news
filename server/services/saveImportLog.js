import { ImportLog } from '../models/importLog.js';

export async function saveImportLog(logInfo) {
  try {
    await ImportLog.create(logInfo);
  } catch (e) {
    console.error('Import logs not saved: ', e);
  }
}