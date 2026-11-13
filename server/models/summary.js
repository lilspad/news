import mongoose from 'mongoose';

export const RETENTION_DAYS = 7;
const HOUR_S = 60 * 60;
const DAY_S = HOUR_S * 24;
const RETENTION_S = RETENTION_DAYS * DAY_S;

const summarySchema = mongoose.Schema({
  category: String,
  text: String,
});

const summaryListSchema = mongoose.Schema({
  categories: [summarySchema],
  generatedAt: { type: Date, default: Date.now },
  incremental: Boolean
});

summaryListSchema.index({ generatedAt: 1 }, { expireAfterSeconds: RETENTION_S });

export const Summary = mongoose.model('Summary', summaryListSchema);
