import { Feed } from '@components/Feed';
import { mapArticles } from '@services/mapArticle';
import mockResponse from 'src/data/mock-response.json';

const data = mapArticles(mockResponse.news);

function App() {
  return (
    <div>
      <Feed data={data}></Feed>
    </div>
  );
}

export default App;
