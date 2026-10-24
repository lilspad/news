import styles from './ArticleCard.module.css';
import OpenInNew from '@components/icons/OpenInNew';
import { formatTimestamp } from '@services/formatTimestamp';
import type { Article } from '@/types';

export function ArticleCard ({
  title,
  description,
  url,
  source,
  publishedAt,
  category
}: Article) {
  return (
    <article className={styles['article-card']}>
      <div className={styles['article-card--body']}>
        <div>
          <span className={styles['article-card--category']}>
            {category.length > 0 && category}
          </span>
        </div>
        <h2><a href={url} className={styles['article-card--link']}>{title}</a></h2>
        <p>{description}</p>
        <div className={styles['article-card--meta']}>
          <span className={styles['article-card--time']}>
            <time>{formatTimestamp(publishedAt)}</time>
          </span>
          <span className={styles['article-card--source']}>{source}<OpenInNew /></span>
        </div>
      </div>
    </article>
  );
}
