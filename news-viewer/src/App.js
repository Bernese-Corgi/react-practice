import { Route } from 'react-router';
import { NewsPage } from './page';

function App() {
  return (
    <div>
      {/* "/:category?" 의 '?'는 category 값이 선택적이라는 의미 */}
      {/* category URL */}
      <Route path="/:category?" component={NewsPage} />
    </div>
  );
}

export default App;
