import React, { useRef } from 'react';
import UserList from 'components/UserList';

function App() {
  const users = [
    {
      id: 1,
      username: 'Jinyoung',
      email: 'jy@gmail.com',
    },
    {
      id: 2,
      username: 'Jinjoo',
      email: 'jj@gmail.com',
    },
    {
      id: 3,
      username: 'Jinee',
      email: 'jn@gmail.com',
    },
  ];

  // nextId에 저장된 4라는 값을 기억하고 싶을때 useRef를 사용할 수 있다.
  const nextId = useRef(4);

  const onCreate = () => {
    console.log(nextId.current); // 4
    nextId.current += 1;
  };

  return (
    <>
      <UserList users={users} />
    </>
  );
}

export default App;
