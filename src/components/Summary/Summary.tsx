import type { Status } from '@/types';
import styles from './Summary.module.css';
import { Newsletter } from '@icons/Newsletter';
import { Markdown } from '@components/Markdown';
import Sparkles from '@components/icons/Sparkles';

interface SummaryProps {
  text: string;
  status: Status;
}

export function Summary ({ text, status }: SummaryProps) {
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
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (status === 'error' || text.length === 0) {
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
    <div className={styles['summary']}>
      <div className={styles['summary--label-container']}>
        <Sparkles />
        <span className={styles['summary--label']}>
          AI summary
        </span>
      </div>
      <h2>Here's what happened today, in a nutshell.</h2>
      <Markdown text={text}></Markdown>
    </div>
  );
}
