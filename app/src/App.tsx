import { Header } from '@components/Header';
import { Feed } from '@components/Feed';
import { useFetchArticles } from '@hooks/useFetchArticles';
import { Footer } from '@components/Footer';
import { Summary } from '@components/Summary';
import { useFetchSummary } from '@hooks/useFetchSummary';

function App() {
  const { articles, status: articleStatus } = useFetchArticles();
  const { summary, status: summaryStatus } = useFetchSummary();
  return (
    <>
      <Header />
      <main>
        <Summary status={summaryStatus} text={summary} />
        <Feed status={articleStatus} data={articles}></Feed>
      </main>
      <Footer />
    </>
  );
}

export default App;
