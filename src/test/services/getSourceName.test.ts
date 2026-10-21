import { describe, it, expect } from 'vitest';
import { getSource, getSourceName } from '@services/getSourceName';

describe('getSource', () => {
  it('returns the hostname without www', () => {
    expect(getSource('https://www.bbc.co.uk/news/x')).toBe('bbc.co.uk');
  });

  it('keeps subdomains other than www', () => {
    expect(getSource('https://news.sky.com/story/x')).toBe('news.sky.com');
  });

  it('returns an empty string for a malformed url', () => {
    expect(getSource('not a url')).toBe('');
  });
});

describe('getSourceName', () => {
  it('maps a known domain to its display name', () => {
    expect(getSourceName('https://www.reuters.com/x')).toBe('Reuters');
  });

  it('maps a subdomain entry in the dictionary', () => {
    expect(getSourceName('https://news.sky.com/story/x')).toBe('Sky News');
  });

  it('falls back to the bare hostname for an unknown domain', () => {
    expect(getSourceName('https://www.someblog.com/x')).toBe('someblog.com');
  });

  it('returns an empty string for a malformed url', () => {
    expect(getSourceName('nope')).toBe('');
  });
});