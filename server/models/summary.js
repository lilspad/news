import mongoose from 'mongoose';

export const RETENTION_DAYS = 7;
const HOUR_MS = 1000 * 60 * 60;
const DAY_MS = HOUR_MS * 24;
const RETENTION_MS = RETENTION_DAYS * DAY_MS;

const summarySchema = mongoose.Schema({
  text: String,
  generatedAt: { type: Date, default: Date.now },
});

summarySchema.index({ generatedAt: 1 }, { expireAfterSeconds: RETENTION_MS });

export const Summary = mongoose.model('Summary', summarySchema);
