import { describe, it, expect, afterEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../app.js';

const app = createApp();
const SECRET = process.env.REFRESH_SECRET;

describe('POST /api/refresh auth', () => {
  afterEach(() => { process.env.REFRESH_SECRET = SECRET; });

  it('401 when no header is sent', async () => {
    process.env.REFRESH_SECRET = 'secret';
    const res = await request(app).post('/api/refresh');
    expect(res.status).toBe(401);
  });

  it('401 when the header is wrong', async () => {
    process.env.REFRESH_SECRET = 'secret';
    const res = await request(app).post('/api/refresh').set('X-Refresh-Secret', 'not-secret');
    expect(res.status).toBe(401);
  });

  it('401 when no secret is configured', async () => {
    delete process.env.REFRESH_SECRET;
    const res = await request(app).post('/api/refresh').set('X-Refresh-Secret', 'anything');
    expect(res.status).toBe(401);
  });
});