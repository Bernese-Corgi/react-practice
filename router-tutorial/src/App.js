import { Route } from "react-router";
import { Link } from "react-router-dom";
import { Profiles } from "./components";
import { AboutPage, HomePage } from "./page";

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
          <Link to="/profile/userA">userA 프로필</Link>
        </li>
        <li>
          <Link to="/profile/userB">userB 프로필</Link>
        </li>
      </ul>
      <Route path="/" component={HomePage} exact={true} />
      <Route path={["/about", "/info"]/* path의 주소를 배열로 설정하면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다. */} component={AboutPage} />
      <Route path="/profile/:username"/* match.params.username 값을 통해 현재 username 값을 조회할 수 있습니다. */ component={Profiles} />
    </div>
  );
}

export default App;
