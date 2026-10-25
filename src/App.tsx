import { Header } from '@components/Header';
import { Feed } from '@components/Feed';
import { useFetchArticles } from './hooks/useFetchArticles';
import { Footer } from '@components/Footer';

function App() {
  const { articles, status } = useFetchArticles();
  return (
    <>
      <Header />
      <main>
        <Feed status={status} data={articles}></Feed>
      </main>
      <Footer />
    </>
  );
}

export default App;
