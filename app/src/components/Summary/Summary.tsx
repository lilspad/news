import type { Status, Summary } from '@/types';
import styles from './Summary.module.css';
import { Newsletter } from '@icons/Newsletter';
import { Markdown } from '@components/Markdown';
import { Sparkles } from '@components/icons/Sparkles';
import { useState } from 'react';

interface SummaryProps {
  summary: Summary | null;
  status: Status;
}

export function Summary ({ summary, status }: SummaryProps) {
  const [active, setActive] = useState(0);

  if ( status === 'loading' ) {
    return (
      <div className={styles['summary--skeleton']}>
        <div className={styles['summary--label-container']}>
          <Sparkles />
          <span className={styles['summary--label']}>
            AI summary
          </span>
        </div>
        <h2>Here's what happened today, in a nutshell.</h2>
        <div className={styles['summary--text']}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (status === 'error' || !summary) {
    return (
      <div className={styles['summary--error']}>
        <div className={styles['summary--icon']}>
          <Newsletter />
        </div>
        <h2>Something went wrong.</h2>
      </div>
    );
  }

  if (!!summary && summary.categories.length > 0) {
    return (
      <div className={styles['summary--container']}>
        <div className={styles['summary']}>
          <div className={styles['summary--label-container']}>
            <Sparkles />
            <span className={styles['summary--label'] + ' type-meta'}>
              AI summary
            </span>
          </div>
          <h2>Here's what happened today, in a nutshell.</h2>
          <div className={styles['summary--tabs']} role='tablist'>
            {summary.categories.map((c, i) => (
              <button
                id={`tab-${i}`}
                key={i}
                onClick={() => setActive(i)}
                className={`${styles['summary--tab']} ${active === i ? styles['tab-active'] : ''}`}
                aria-selected={active === i}
                aria-controls='summary-content'
                role="tab"
              >
                {c.category}
              </button>
            ))}
          </div>
          <div
            className={styles['summary--text']}
            id='summary-content'
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
          >
            <Markdown text={summary.categories[active].text}></Markdown>
          </div>
        </div>
      </div>
    );
  }
}
