import React, { useRef, useState } from 'react';
import UserList from 'components/UserList';
import CreateUser from 'components/CreateUser';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });

  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'Jinyoung',
      email: 'jy@gmail.com',
      active: false,
    },
    {
      id: 2,
      username: 'Jinjoo',
      email: 'jj@gmail.com',
      active: false,
    },
    {
      id: 3,
      username: 'Jinee',
      email: 'jn@gmail.com',
      active: false,
    },
  ]);

  // nextId에 저장된 4라는 값을 기억하고 싶을때 useRef를 사용할 수 있다.
  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    // 기존 배열을 복사하고, 새로운 항목을 뒤에 추가한다.
    setUsers([...users, user]);
    // 같은 문법
    // setUsers(users.concat(user))

    setInputs({
      username: '',
      email: '',
    });
    console.log(nextId.current); // 4
    nextId.current += 1;
  };

  const onRemove = (id) => {
    // user의 id가 일치하는
    setUsers(users.filter((user) => user.id !== id));
  };

  // 특정 값만 업데이트
  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        // 인수로 받은 user의 id가 일치하는 요소를 클릭하면 활성화 상태 변경
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;
