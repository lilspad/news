import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Summary } from '@components/Summary';
import type { Summary as SummaryType } from '@/types';

const summary: SummaryType = {
  categories: [
    { category: 'World', text: 'World news body' },
    { category: 'Tech', text: 'Tech news body' },
  ],
};

describe('Summary', () => {
  it('shows the skeleton while loading', () => {
    render(<Summary summary={null} status="loading" />);
    expect(screen.getByText('AI summary')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /in a nutshell/i })
    ).toBeInTheDocument();
  });

  it('shows the error state on error', () => {
    render(<Summary summary={null} status="error" />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('shows the error state when summary is null but status is ready', () => {
    render(<Summary summary={null} status="ready" />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('renders a tab per category and the first tab active by default', () => {
    render(<Summary summary={summary} status="ready" />);
    expect(screen.getByRole('button', { name: 'World' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByText('World news body')).toBeInTheDocument();
  });

  it('switches content when another tab is clicked', () => {
    render(<Summary summary={summary} status="ready" />);
    fireEvent.click(screen.getByRole('button', { name: 'Tech' }));
    expect(screen.getByText('Tech news body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tech' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });
});