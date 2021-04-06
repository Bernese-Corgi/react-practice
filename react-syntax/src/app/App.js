import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from 'components/UserList';
import CreateUser from 'components/CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  // active가 true인 것들만 filter한 후 배열의 길이를 세기
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });

  const { username, email } = inputs;

  // useCallback
  const onChange = useCallback(
    // 첫번째 매개변수 : 생성하고 싶은 함수
    (e) => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    },
    // 두번째 매개변수 : deps
    // [inputs] - inputs가 변경될 때만 함수가 새로 생성된다.
    // 빈 배열인 경우 - 컴포넌트가 렌더링될 때 한 번만 함수가 생성
    [inputs]
  );

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

  // useCallback
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };

    // 기존 배열을 복사하고, 새로운 항목을 뒤에 추가한다.
    setUsers((users) => [...users, user]);
    // 같은 문법
    // setUsers(users.concat(user))

    setInputs({
      username: '',
      email: '',
    });
    // console.log(nextId.current); // 4
    nextId.current += 1;
    // username, email은 input에서 밖으로 빼준 값 -> 이런 값도 결국 상태이므로 deps 배열에 넣어야한다.
  }, [email, username, users]);

  const onRemove = useCallback(
    (id) => {
      // user의 id가 일치하는
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  // 특정 값만 업데이트
  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          // 인수로 받은 user의 id가 일치하는 요소를 클릭하면 활성화 상태 변경
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );

  // 아래와 같이 useMemo를 사용하지 않으면 input의 value값이 수정될 때마다 컴포넌트가 리렌더링된다 => 리렌더링될때마다 활성 사용자 수를 센다.
  // const count = countActiveUsers(users);

  // useMemo: 이전에 연산된 값을 재사용, 성능 최적화 측면
  // useMemo는 특정 값이 바뀌었을 때만 특정 함수를 실행해서 연산을 처리한다.
  // 원하는 값이 바뀌지 않았다면 리렌더링할 때 이전에 만들어놨던 값을 재사용할 수 있게 한다.
  const count = React.useMemo(
    // 첫번째 매개변수 : 함수형태
    () => countActiveUsers(users),
    // deps 설정 : deps 배열 안의 값이 변경될 때에만 콜백함수를 실행한다.
    [users]
  );

  return (
    <>
      {/* 이벤트 핸들러 함수 onChange, onCreate, onToggle은 컴포넌트가 리렌더링될때마다 함수가 생성된다. */}
      {/* 이런 방식이 대체로 별로 문제가 없지만. 컴포넌트의 렌더링이 자주 발생하거나 렌더링할 컴포넌트가 많아지면 최적화해주는 것이 좋다. */}
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 {count}</div>
    </>
  );
}

export default App;
