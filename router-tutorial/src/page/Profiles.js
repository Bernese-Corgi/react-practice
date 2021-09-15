import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { UserProfile, WithRouterEX } from '../components';

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
      {/* params에 username을 읽을 수 없는 상황이므로 match의 params 객체가 비어있다. */}
      <WithRouterEX Comp="src/container/Profiles.js" />
    </div>
  );
};

export default Profiles;
