import styles from './ArticleCard.module.css';
import { OpenInNew } from '@components/icons/OpenInNew';
import { RelativeTime } from '@components/RelativeTime';
import type { Article } from '@/types';

export function ArticleCard ({
  title,
  description,
  url,
  source,
  sourceName,
  publishedAt,
  category,
  imageUrl,
}: Article) {
  return (
    <article className={styles['article-card']}>
      {imageUrl &&
      <div className={styles['article-card--image-container']}>
        <img src={imageUrl} />
      </div>
      }
      <div className={styles['article-card--body']}>
        <div>
          <span className={styles['article-card--category'] + ' type-meta'}>
            {category ? category.length > 0 && category.join('︱') : ''}
          </span>
        </div>
        <h3><a href={url} className={styles['article-card--link']}>{title}</a></h3>
        <p>{description}</p>
        <div className={styles['article-card--meta'] + ' type-meta'}>
          <span className={styles['article-card--time']}>
            <RelativeTime date={publishedAt} />
          </span>
          <span className={styles['article-card--source']}>{sourceName ?? source}<OpenInNew /></span>
        </div>
      </div>
    </article>
  );
}
