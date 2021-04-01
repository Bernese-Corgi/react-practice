/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function User({ user, onRemove, onToggle /* props로 받아온 값들 */ }) {
  const { username, email, id, active } = user;

  React.useEffect(() => {
    // effect 함수 : 1. 마운트된 이후 실행 2. 상태가 업데이트된 이후 실행
    return () => {
      // cleanup 함수 : 업데이트되기 바로 직전에 호출된다.
    };
    // [   ] : 배열 안의 값이 변경될 경우에만 콜백함수를 실행한다.
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
