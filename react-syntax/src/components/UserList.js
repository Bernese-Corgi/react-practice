/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

function User({ user, onRemove, onToggle /* props로 받아온 값들 */ }) {
  const { username, email, id, active } = user;

  React.useEffect(() => {
    // 내부의 콜백함수는 특정 값이 업데이트된 직후에 실행된다.
    console.log('user 값이 설정됨🔻 ', user);
    return () => {
      // cleanup
      console.log('user 값이 바뀌기 전🔻 ', user);
    };
    // [user] : 의존성 배열
    // 1. props로 받아온 값들이나 useState로 상태를 관리중인 것들을 넣어주게 되면 의존배열에 넣어 설정해야한다.
    //    의존성 배열에 넣어야 최신의 상태를 참조할 수 있다.
    //    이러한 값들을 의존배열에 넣지 않는다면?
    //    -> 이전의 user 상태를 가리키고, 마운트, 언마운트 시에만 실행된다.
    // 2. user 정보가 설정되거나 바뀔때마다 내부의 콜백함수가 호출된다.
    //    마운트될때도 내부의 콜백함수가 호출된다.
  }, [user]);

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
