/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function User({ user, onRemove, onToggle }) {
  const { username, email, id, active } = user;

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
