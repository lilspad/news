interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
}

function ArticleCard ({ title, description, url }: ArticleCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={url}>
        Read more
      </a>
    </article>
  );
}

export default ArticleCard;