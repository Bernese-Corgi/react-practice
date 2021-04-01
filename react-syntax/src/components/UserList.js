/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function User({ user, onRemove, onToggle /* props로 받아온 값들 */ }) {
  const { username, email, id, active } = user;

  React.useEffect(() => {
    // * 의존성 배열이 없다면 *
    // 리액트에서 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링된다.
    // 가상돔 상에서는 모든 사항을 렌더링하고 나서 비교를 한 후 변경된 부분만 실제 돔에 적용한다.
    // 가상돔에서 모든 사항을 리렌더링 하는 것이 이 경우에서는 크게 느려지지는 않으나, 개수가 아주 많아진다면 영향을 미칠수 있다. (컴포넌트 리렌더링 성능 최적화)
    console.log(user);
  });

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
