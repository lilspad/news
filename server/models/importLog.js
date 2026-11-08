import mongoose from 'mongoose';

const importLogSchema = new mongoose.Schema({
  status: { type: String, enum: ['success', 'error'] },
  importTime: { type: Date, default: Date.now },
  itemsReceived: Number,
  itemsKept: Number,
  itemsInserted: Number,
  newestPostAgeMinutes: Number,
  oldestPostAgeMinutes: Number, 
  errorMsg: String
});

export const ImportLog = mongoose.model('ImportLog', importLogSchema);
