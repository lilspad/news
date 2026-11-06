import mongoose from 'mongoose';

export const RETENTION_HOURS = 48;
const HOUR_MS = 1000 * 60 * 60;
const RETENTION_MS = RETENTION_HOURS * HOUR_MS;

const articleSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  url: String,
  imageUrl: String,
  author: String,
  source: String,
  category: [String],
  publishedAt: Date,
  // for observability
  fetchedAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: () => new Date(Date.now() + RETENTION_MS) },
});

// delete a document once expireAt is in the past
articleSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// newest first
articleSchema.index({ publishedAt: -1 });

// schema for the front end
articleSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.fetchedAt;
    delete ret.expireAt;
    return ret;
  },
});

export const Article = mongoose.model('Article', articleSchema);
