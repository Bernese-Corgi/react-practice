import { Route } from "react-router";
import { AboutPage, HomePage } from "./page";

function App() {
  return (
    <div>
      <Route path="/" component={HomePage} exact={true} />
      <Route path="/about" component={AboutPage} />
    </div>
  );
}

export default App;
