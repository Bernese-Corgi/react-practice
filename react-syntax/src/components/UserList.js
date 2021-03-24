/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;
  React.useEffect(() => {
    // 이 함수가 호출되는 시점: UI가 화면에 나타난 상태 이후!
    console.log('컴포넌트가 화면에 나타남');
    // 컴포넌트가 마운트될 때 주로 추가하는 작업
    // 1. props로 받은 값을 컴포넌트의 state로 설정
    // 2. REST API : 외부 API 요청
    // 3. 라이브러리 사용 (ex. D3, Video.js)
    // 4. setInterval, setTimeout
    // 클린업 함수
    return () => {
      // 언마운트될 때 주로 하는 작업
      // 1. cleatInterval, clearTimeout
      // 2. 라이브러리 인스턴스 제거
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  return (
    <li>
      <b
        style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer',
        }}
        onClick={() => onToggle(id)}
      >
        {username}
      </b>
      <span
        style={{
          color: 'salmon',
        }}
      >
        ({email})
      </span>
      {/* 새로운 함수를 넣는 이유 : 파라미터를 직접 넣어주고 싶기 때문! */}
      <button onClick={() => onRemove(id)}>x</button>
      {/* 함수 호출문을 넣으면 ? 컴포넌트가 렌더링되는 시점에서 삭제가 된다. -> 의도하는 바와 다르다. */}
      {/* <button onClick={onRemove(user.id)}>x</button> */}
    </li>
  );
}

export default function UserList({ users, onRemove, onToggle }) {
  return (
    <ul>
      {users.map(
        // key는 고유한 값으로 넣어줘야 한다.
        (user) => (
          <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        )
      )}
    </ul>
  );
}
