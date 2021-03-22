import React from 'react';

function User({ user }) {
  return (
    <li>
      <b>{user.username}</b>
      <span
        style={{
          color: 'salmon',
        }}
      >
        ({user.email})
      </span>
    </li>
  );
}

export default function UserList({ users }) {
  return (
    <ul>
      {users.map(
        // key는 고유한 값으로 넣어줘야 한다.
        (user) => (
          <User user={user} key={user.id} />
        )
      )}
    </ul>
  );
}
