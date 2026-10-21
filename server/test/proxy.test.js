// @vitest-environment node
import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../proxy.js';

const app = createApp();

describe('GET /api/news', () => {
  afterEach(() => {
    delete process.env.CURRENTS_API_KEY;
  });

  it('returns 500 when the API key is missing', async () => {
    delete process.env.CURRENTS_API_KEY;
    const res = await request(app).get('/api/news');

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch(/key/i);
  });
});