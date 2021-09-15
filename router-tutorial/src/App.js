import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { History } from './components';
import { AboutPage, HomePage, NotFoundPage, ProfilesPage } from './page';

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route
          // path의 주소를 배열로 설정하면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다
          path={['/about', '/info']}
          component={AboutPage}
        />
        <Route path="/profiles" component={ProfilesPage} />
        <Route path="/history" component={History} />
        <Route
          // path를 설정하지 않으면 모든 상황에 렌더링된다
          component={NotFoundPage}
        />
      </Switch>
    </div>
  );
}

export default App;
