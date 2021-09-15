# router-tutorial

- [router-tutorial](#router-tutorial)
  - [라우터 라이브러리 설치](#라우터-라이브러리-설치)
  - [프로젝트에 라우터 적용](#프로젝트에-라우터-적용)
  - [Route 컴포넌트](#route-컴포넌트)
    - [Route 컴포넌트로 특정 주소에 컴포넌트 연결](#route-컴포넌트로-특정-주소에-컴포넌트-연결)
    - [exact](#exact)
    - [Route 하나에 여러 개의 path 설정하기](#route-하나에-여러-개의-path-설정하기)
  - [Link 컴포넌트를 사용하여 다른 주소로 이동하기](#link-컴포넌트를-사용하여-다른-주소로-이동하기)
  - [URL 파라미터와 쿼리](#url-파라미터와-쿼리)
    - [URL 파라미터](#url-파라미터)
    - [URL 쿼리](#url-쿼리)
  - [서브라우트](#서브라우트)
    - [render](#render)
  - [history](#history)
  - [withRouter](#withrouter)
  - [Switch](#switch)
  - [NavLink](#navlink)

## 라우터 라이브러리 설치

```bash
$ npm install react-router-dom
```

## 프로젝트에 라우터 적용

`BrowserRouter` 컴포넌트로 `App` 컴포넌트를 감싸서 프로젝트에 라우터를 적용한다.

`BrowserRouter` 컴포넌트

- 웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경
- 현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용할 수 있도록 한다.

<span style="color: #a3a8a5">▾ src/index.js</span>

```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Route 컴포넌트

### Route 컴포넌트로 특정 주소에 컴포넌트 연결

`Route` 컴포넌트

- 사용자의 현재 경로에 따라 다른 컴포넌트를 보여줄 수 있다.
- 어떤 규칙을 가진 경로에 어떤 컴포넌트를 보여줄지 정의할 수 있다.

<span style="color: #a3a8a5">▾ 예시</span>

```jsx
<Route path="주소규칙" component={컴포넌트} />
```

### exact

<!-- TODO exact 보충하기 -->

보통 홈페이지에는 경로의 주소규칙에 `/`를 지정하고, 다른 페에지의 경우 `/otherPage` 이런 식으로 설정해서 경로가 중복되는 경우가 있다.

Home을 위한 Route 컴포넌트를 사용할 때 `exact`라는 props를 `true`로 설정한다.

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
<Route path="/" component={Home} exact={true} />
```

### Route 하나에 여러 개의 path 설정하기

- Route 하나에 여러 개의 path를 지정하는 것은 최신 버전의 리액트 라우터 v5부터 적용된 기능
- path의 주소를 배열로 설정하면 여러 경로에서 같은 컴포넌트를 보여줄 수 있다.

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
<Route path={['/about', '/info']} component={AboutPage} />
```

## Link 컴포넌트를 사용하여 다른 주소로 이동하기

`Link` 컴포넌트

- 클릭하면 다른 주소로 이동시켜 주는 컴포넌트
- 리액트 라우터를 사용하면 `a` 태그를 직접 사용하면 안된다.
  - `a` 태그는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태들이 모두 사라지게 된다.
  - 렌더링된 컴포넌트들도 모두 사라지고 처음부터 렌더링한다.
- `Link` 컴포넌트를 사용해 페이지를 전환하면, 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 HTML HistoryAPI를 사용해 페이지의 주소만 변경한다.
- `Link` 컴포넌트 자체는 `a` 태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어 있다.

<span style="color: #a3a8a5">▾ 예시</span>

```jsx
<Link to="주소">내용</Link>
```

## URL 파라미터와 쿼리

페이지 주소를 정의할 때 가끔은 유동적인 값을 전달해야할 때도 있다. 이는 파라미터와 쿼리로 나눌 수 있다.

유동적인 값을 사용해야 하는 상황에서 파라미터를 쓸지 쿼리를 쓸지 결정할 때 무조건 따라야하는 규칙은 없다.

- 파라미터 : `/profiles/userA`
  특정 아이디 or 이름을 사용해 조회할 때 사용
- 쿼리 : `/about?details=true`
  우리가 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용한다.

### URL 파라미터

URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아오는 `match` 객체 안의 `params` 값을 참조한다.

<!-- TODO match 객체 설명 추가 -->

`match` 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있다.

라우트를 정의하고 나서 상단에 각 프로필 페이지로 이동하는 링크도 추가하세요.

<span style="color: #a3a8a5">▾ src/components/Profiles.js</span>

```jsx
import React from 'react';

const data = {
  userA /* match.params 안의 username과 일치하는 프로퍼티 키 */: {
    name: 'Name A',
    description: 'A입니다.',
  },
  userB: {
    name: 'Name B',
    description: 'B입니다.',
  },
};

const Profiles = ({ match }) => {
  const { username } = match.params;
  // data에서 match.params.username과 해당하는 프로퍼티 키에 해당하는 값을 변수 profile에 저장
  const profile = data[username];

  // username과 일치하는 사용자가 없으면 반환할 jsx
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profiles;
```

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Profiles } from './components';
import { AboutPage, HomePage } from './page';

function App() {
  return (
    <div>
      <ul>
        {/* ... */}
        <li>
          <Link to="/profile/userA">userA 프로필</Link>
        </li>
        <li>
          <Link to="/profile/userB">userB 프로필</Link>
        </li>
      </ul>
      {/* ... */}
      <Route
        path="/profile/:username"
        /* match.params.username 값을 통해 현재 username 값을 조회할 수 있다. */ component={
          Profiles
        }
      />
    </div>
  );
}

export default App;
```

**match 객체**

<img src="https://user-images.githubusercontent.com/72931773/133335222-61233cae-46b4-4c42-a08a-1af18896924f.png" width="60%" />

### URL 쿼리

쿼리 : `location` 객체에 들어 있는 `search` 값에서 조회할 수 있다.

`location` 객체

- 웹 애플리케이션의 현재 주소에 대한 정보를 가지고 있다.
  → 앱이 현재 있는 위치, 원하는 위치, 이전 위치를 나타낸다.
- 라우트로 사용된 컴포넌트에게 props로 전달된다.
- 절대 변경되지 않으므로 라이프사이클 훅에서 이를 사용해 탐색이 발생하는 시기를 결정할 수 있다.
- 데이터 가져오기, 애니메이션 등에 유용하다.
- 일반적으로 문자열만 사용하지만 앱이 특정 위치로 돌아올 때마다 사용할 수 있는 "위치 상태"를 추가해야 하는 경우, 대신 `location` 객체를 사용할 수 있다.
- 모달과 같은 `path` 대신 탐색 기록을 기반으로 UI를 분기하려는 경우에 유용하다.

`http://localhost:3000/about?detail=true` 주소로 들어갈 때 `location`의 형태 ▾

```json
{
  "pathname": "/about",
  "search": "?detail=true",
  "hash": ""
}
```

`search`

- `location` 객체가 가진 프로퍼티
- 값은 문자열 형태
- `search` 값에서 특정 값을 읽어오기 위해서는 이 문자열을 객체 형태로 변환한다.

쿼리 문자열을 객체로 변환하기 위해서는 qs 라이브러리를 사용한다.

```bash
$ npm install qs
```

**1. `location` 객체 블러오기**

<span style="color: #a3a8a5">▾ src/page/About.js</span>

```jsx
import QueryString from 'qs';
import React from 'react'

const About = ({ location }) => {
  console.log(location)

  return (
    // ...
  )
}

export default About
```

location 객체

<img src="https://user-images.githubusercontent.com/72931773/133339955-ece802e2-7b6a-4b60-83dd-3440c74b9fa5.png" width="40%" alt="location-false" />

**2. 쿼리 문자열을 객체로 파싱**

<span style="color: #a3a8a5">▾ src/page/About.js</span>

```jsx
import QueryString from 'qs';
import React from 'react'

const About = ({ location }) => {
  const query = QueryString.parse(location.search, {
    ignoreQueryPrefix: true, // 문자열 맨 앞의 ?를 생략
  });

  return (
    // ...
  )
}

export default About
```

**3. 객체로 파싱한 결과값을 원하는 타입으로 비교하기**

쿼리 문자열을 객체로 파싱한 결과값은 항상 문자열이다.

`?value=1` 또는 `?value=true`와 같이 숫자나 논리 자료형을 사용한다고 해서 해당 값이 원하는 형태로 변환되지 않고, <u style="text-decoration: underline #95aeaf;">문자열 형태</u>로 반환된다. (`"1"`, `"true"`)

- 숫자를 받아오려면 `parseInt` 함수를 통해 숫자로 변형한다.
- 논리 자료형 값을 사용하려면 `"true"` 문자열과 일치하는지 비교한다.
  ```js
  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열
  ```

<span style="color: #a3a8a5">▾ src/page/About.js</span>

```jsx
import QueryString from 'qs';
import React from 'react'

const About = ({ location }) => {
  const query = QueryString.parse(location.search, {
    ignoreQueryPrefix: true, // 문자열 맨 앞의 ?를 생략
  });

  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열

  return (
    // ...
  )
}

export default About
```

query.detail 값이 true이면 표시할 element 설정

<span style="color: #a3a8a5">▾ src/page/About.js</span>

```jsx
import QueryString from 'qs';
import React from 'react';

const About = ({ location }) => {
  const query = QueryString.parse(location.search, {
    ignoreQueryPrefix: true, // 문자열 맨 앞의 ?를 생략
  });

  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습하는 프로젝트입니다.</p>
      {showDetail && <p>detail 값이 true로 설정됨</p>}
    </div>
  );
};

export default About;
```

**4. `http://localhost:3000/about?detail=true` 주소로 접속해보기**

<span style="background-color: #dee6e2">접속하기 전</span>
<span style="background-color: #f1edef">1. location 객체</span>
<img src="https://user-images.githubusercontent.com/72931773/133339955-ece802e2-7b6a-4b60-83dd-3440c74b9fa5.png" width="40%" alt="location-false" />
<span style="background-color: #f1edef">2. query 객체</span>
<img src="https://user-images.githubusercontent.com/72931773/133339931-88bcdd1c-2c88-4106-8814-98210954057b.png" width="20%" alt="query-false" />

<span style="background-color: #f1edef">3. query.detail</span>
<img src="https://user-images.githubusercontent.com/72931773/133339884-9d2ba24c-6f62-443a-bfca-6812be4ee3de.png" width="25%" alt="query.detail-undefined" />

<span style="background-color: #f1edef">4. showDetail</span>
<img src="https://user-images.githubusercontent.com/72931773/133339869-153df096-d4d7-45cf-bfa6-e01e5086957c.png" width="20%" alt="showDetail-false" />

<span style="background-color: #dee6e2">접속 후</span>
<span style="background-color: #f1edef">1. location 객체</span>
<img src="https://user-images.githubusercontent.com/72931773/133340016-788d949e-0916-444e-a83e-50b084784b29.png" width="40%" alt="location-true" />
<span style="background-color: #f1edef">2. query 객체</span>
<img src="https://user-images.githubusercontent.com/72931773/133340006-89646821-8adb-4d8e-9653-0d410f81a5d7.png" width="30%" alt="query-true" />
<span style="background-color: #f1edef">3. query.detail</span>
<img src="https://user-images.githubusercontent.com/72931773/133339998-2a34f5c4-5f88-4e76-af3b-15cfd6c1b9a4.png" width="25%" alt="query.detail-true" />
<span style="background-color: #f1edef">4. showDetail</span>
<img src="https://user-images.githubusercontent.com/72931773/133339979-ac3cec0c-6874-4878-a606-bde1c0a6a249.png" width="20%" alt="showDetail-true" />

## 서브라우트

서브라우트 : 라우트 내부에 또 라우트를 정의하는 것

컴포넌트 내부에 `Route` 컴포넌트를 또 사용하면 된다.

### render

render : 컴포넌트 자체를 전달하는 것이 아닌, 보여주고 싶은 jsx를 넣는다.

따로 컴포넌트를 만들기 애매한 상황에 사용해도 되고, 컴포넌트에 props를 별도로 넣고 싶을 때도 사용할 수 있다.

App 컴포넌트에 지정했던 profiles Route를 다른 페이지로 옮긴다.

<span style="color: #a3a8a5">▾ src/page/Profiles.js</span>

```jsx
import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { UserProfile } from '../components';

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/userA">userA 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/userB">userB 프로필</Link>
        </li>
      </ul>
      <Route
        path="/profiles/"
        // exact={true}와 같은 의미이다.
        exact
        // render : 컴포넌트 자체를 전달하는 것이 아닌, 보여주고 싶은 jsx를 넣는다.
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route
        path="/profiles/:username"
        // match.params.username 값을 통해 현재 username 값을 조회할 수 있다.
        component={UserProfile}
      />
    </div>
  );
};

export default Profiles;
```

App 컴포넌트에서 Profile 페이지를 라우팅한다.

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
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
          {/* profiles 페이지로 가는 링크 생성 */}
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
      {/* profiles 페이지 라우팅 */}
      <Route path="/profiles" component={ProfilesPage} />
    </div>
  );
}

export default App;
```

구조를 그림으로 보면 다음과 같다.

![image](https://user-images.githubusercontent.com/72931773/133351512-cd63a512-8f3b-492e-8033-080429e59ef9.png)

---

## history

`history` 객체는 라우트로 사용된 컴포넌트에 `match`, `location` 과 함께 전달되는 props중 하나이다.

`history` 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있다.

예)

- 특정 버튼을 눌렀을 때 뒤로 가기
- 로그인 후 화면 전환
- 다른 페이지로 이탈하는 것을 방지

<span style="color: #a3a8a5">▾ src/components/History.js</span>

```jsx
import React, { Component } from 'react';

class History extends Component {
  // 뒤로 가기
  handleGoBack = () => {
    this.props.history.goBack();
  };

  // 홈으로 이동
  handleGoHome = () => {
    this.props.history.push('/');
  };

  componentDidMount() {
    // 페이지에 변화가 생기려고 할 때마다 나갈 것인지 질문
    this.unblock = this.props.history.block('정말 이 페이지를 나가시겠습니까?');
  }

  componentWillUnmount() {
    // 컴포넌트가 언마운트되면 질문을 멈춤
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.handleGoHome}>홈으로</button>
      </div>
    );
  }
}

export default History;
```

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { History } from './components';

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
      <Route path="/history" component={History} />
    </div>
  );
}

export default App;
```

## withRouter

`withRouter` 함수는 고차 컴포넌트(HOC)이다.

라우트로 사용된 컴포넌트가 아니어도 `match`, `location`, `history` 객체에 접근할 수 있다.

컴포넌트를 내보낼 때 함수로 감싼다.

```jsx
export default withRouter(Comp);
```

<span style="color: #a3a8a5">▾ src/components/WithRouterEX.js</span>

```jsx
import React from 'react';
import { withRouter } from 'react-router';

const WithRouterEX = ({ Comp, location, match, history }) => {
  return (
    <div>
      <h4>{Comp} location</h4>
      {/* JSON.strigfy(a, null, 2) : JSON에 들여쓰기가 적용된 상태로 문자열이 만들어진다. */}
      <textarea value={JSON.stringify(location, null, 2)} rows={7} readOnly />
      <h4>{Comp} match</h4>
      <textarea value={JSON.stringify(match, null, 2)} rows={7} readOnly />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

// 컴포넌트를 내보낼 때 함수로 감싼다.
export default withRouter(WithRouterEX);
```

withRouter를 사용하면 현재 자신이 보여주고 있는 라우트 컴포넌트를 기준으로 `match`가 전달된다.

그러므로 params의 `:username`의 파라미터를 제대로 읽으려면 URL 파라미터를 설정한 곳에서 컴포넌트를 불러와야한다.

<span style="color: #a3a8a5">▾ src/components/UserProfiles.js</span>

```jsx
import React from 'react';
import { WithRouterEX } from '.';

const data = {
  userA /* match.params 안의 username과 일치하는 프로퍼티 키 */: {
    name: 'Name A',
    description: 'A입니다.',
  },
  userB: {
    name: 'Name B',
    description: 'B입니다.',
  },
};

const UserProfile = ({ match }) => {
  const { username } = match.params;
  // data에서 match.params.username과 해당하는 프로퍼티 키에 해당하는 값을 변수 profile에 저장
  const profile = data[username];

  // username과 일치하는 사용자가 없으면 반환할 jsx
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      {/*...*/}
      {/* params의 username을 읽을 수 있다. */}
      <WithRouterEX Comp="src/components/UserProfile.js" />
    </div>
  );
};

export default UserProfile;
```

## Switch

`Switch` 컴포넌트는 여러 `Route`를 감싸서 그 중 일치하는 단 하나의 라우트만을 렌더링시킨다.

모든 규칙과 일치하지 않을 때 `Not Found` 페이지를 보여줄 수도 있다.

<span style="color: #a3a8a5">▾ src/App.js</span>

```jsx
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { History } from './components';
import { AboutPage, HomePage, NotFoundPage, ProfilesPage } from './page';

function App() {
  return (
    <div>
      {/* ... */}
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path={['/about', '/info']} component={AboutPage} />
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
```

<span style="color: #a3a8a5">▾ src/page/NotFound.js</span>

```jsx
import React from 'react';

const NotFound = ({ location }) => {
  return (
    <div>
      <h2>존재하지 않는 페이지입니다. 주소를 다시 확인해주세요.</h2>
      <p>{location.pathname}</p>
    </div>
  );
};

export default NotFound;
```

## NavLink

`NavLink`는 `Link`와 비슷하다.

현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 or CSS 클래스를 적용할 수 있다.

⎡ `NavLink`에서 링크가 활성화되었을 때 스타일 적용할 때 : `activeStyle` 값을 `props`로 받는다.
⎣ CSS 클래스를 적용할 때 : `activeClassName` 값을 `props`로 받는다.

<span style="color: #a3a8a5">▾ src/page/Profiles.js</span>

```jsx
import React from 'react';
import { Route } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { UserProfile, WithRouterEX } from '../components';

const Profiles = () => {
  const activeStyle = {
    background: 'olive',
    color: 'white',
  };

  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/userA">
            userA 프로필
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/userB">
            userB 프로필
          </NavLink>
        </li>
      </ul>
      {/* ... */}
      <Route path="/profiles/:username" component={UserProfile} />
    </div>
  );
};

export default Profiles;
```

활성화된 NavLink를 표시할 수 있다.

<img src="https://user-images.githubusercontent.com/72931773/133360040-47df8355-f03e-4a19-b080-071b4a869abf.png" width="50%" />
