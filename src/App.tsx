import Feed from '@components/Feed';
import mockResponse from 'src/data/mock-response.json';

const data = mockResponse.news;

function App() {
  return (
    <div>
      <Feed data={data}></Feed>
    </div>
  )
}

export default App
