import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { UserProfile } from '../components';

const Profiles = (props) => {
  console.log(props);

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
