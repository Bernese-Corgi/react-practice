import { Route } from "react-router";
import { Link } from "react-router-dom";
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
      </ul>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/about" component={AboutPage} />
    </div>
  );
}

export default App;
