// @vitest-environment node
import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../app.js';
import { Article } from '../../models/articles.js';

vi.mock('../../models/articles.js', () => ({
  Article: { find: vi.fn() },
}));

const app = createApp();

describe('GET /api/news', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 200 with the articles', async () => {
    const articles = [{ title: 'a' }, { title: 'b' }];
    Article.find.mockReturnValue({
      sort: vi.fn().mockResolvedValue(articles),
    });

    const res = await request(app).get('/api/news');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(articles);
  });

  it('returns 500 when the database query fails', async () => {
    Article.find.mockReturnValue({
      sort: vi.fn().mockRejectedValue(new Error('db down')),
    });

    const res = await request(app).get('/api/news');

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/load/i);
  });
});