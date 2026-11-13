import { render, screen } from '@testing-library/react';
import { Feed } from '@components/Feed';

describe('Feed', () => {
  it('handles loading state correctly', () => {
    const { container } = render(<Feed status="loading" data={[]} />);
    const items = container.querySelectorAll('[class*="skeleton-card_');
    expect(items).toHaveLength(6);
  });

  it('shows an empty message on error', () => {
    render(<Feed status="error" data={[]} />);
    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
  });

  it('renders a card per article when ready', () => {
    const articles = [
      {
        id: '1',
        title: 'article 1',
        description: 'article description',
        url: 'example.com',
        publishedAt: new Date(),
      },
      {
        id: '2',
        title: 'article 2',
        description: 'article description',
        url: 'example.com',
        publishedAt: new Date(),
      }
    ];
    render(<Feed status="ready" data={articles} />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});