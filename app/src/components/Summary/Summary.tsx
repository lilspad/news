import type { Status, Summary } from '@/types';
import styles from './Summary.module.css';
import { Newsletter } from '@icons/Newsletter';
import { Markdown } from '@components/Markdown';
import { Sparkles } from '@components/icons/Sparkles';
import { DownArrow } from '@components/icons/DownArrow';
import { useState } from 'react';

interface SummaryProps {
  summary: Summary | null;
  status: Status;
}

export function Summary ({ summary, status }: SummaryProps) {
  const [expand, setExpand] = useState(false);

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

  return (
    <div className={styles['summary--container'] + ' ' + styles[`summary--expand-${expand ? 'on' : 'off'}`]}>
      <div className={styles['summary']}>
        <div className={styles['summary--label-container']}>
          <Sparkles />
          <span className={styles['summary--label'] + ' type-meta'}>
            AI summary
          </span>
        </div>
        <h2>Here's what happened today, in a nutshell.</h2>
        <div>
          {summary.categories.map(c => (
            <div className={styles['summary--text']}>
              <h3>{c.category}</h3>
              <Markdown text={c.text}></Markdown>
            </div>
          ))}
        </div>
        <div className={styles['summary--expand-toggle-container']}>
          <button onClick={() => setExpand(!expand)} className={styles['summary--expand-toggle'] + ' type-meta'}>
            <span>View more</span>
            <DownArrow />
          </button>
        </div>
      </div>
    </div>
  );
}
