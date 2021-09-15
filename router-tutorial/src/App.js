import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { AboutPage, HomePage, ProfilesPage } from './page';

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
      </ul>
      <Route path="/" component={HomePage} exact={true} />
      <Route
        path={
          [
            '/about',
            '/info',
          ] /* path의 주소를 배열로 설정하면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다. */
        }
        component={AboutPage}
      />
      <Route path="/profiles" component={ProfilesPage} />
    </div>
  );
}

export default App;
