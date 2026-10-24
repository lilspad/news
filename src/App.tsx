import { Header } from '@components/Header';
import { Feed } from '@components/Feed';
import { useFetchArticles } from './hooks/useFetchArticles';

function App() {
  const { articles, status } = useFetchArticles();
  return (
    <body>
      <Header />
      <main>
        <Feed status={status} data={articles}></Feed>
      </main>
    </body>
  );
}

export default App;
