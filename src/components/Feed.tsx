import ArticleCard, { type ArticleCardProps } from '@components/ArticleCard';

interface FeedProps {
  data: ArticleCardProps[];
}

function Feed ({ data }: FeedProps) {
  return (
    <div>
      {data.map((entry) => (
        <ArticleCard key={entry.url} {...entry}></ArticleCard>
      ))}
    </div>
  );
}

export default Feed;
