import { Feed } from '@components/Feed';
import { useFetchArticles } from './hooks/useFetchArticles';

function App() {
  const { articles, status } = useFetchArticles();
  return (
    <div>
      <Feed status={status} data={articles}></Feed>
    </div>
  );
}

export default App;
