import React, { useReducer, useCallback, useRef, useMemo } from 'react';
import UserList from 'components/UserList';
import CreateUser from 'components/CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  // active가 true인 것들만 filter한 후 배열의 길이를 세기
  return users.filter((user) => user.active).length;
}

// * useReducer
// 1. 초기값 선언
// App 컴포넌트에서 사용할 초기 상태를 App 컴포넌트 바깥에서 선언한다.
const initialState = {
  // * inputs
  // 🔻 const [inputs, setInputs] = useState({ username: '', email: '' })
  inputs: {
    username: '',
    email: '',
  },
  // * users
  // 🔻 const [users, setUsers] = useState([{...}, {...}, {...}])
  users: [
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
  ],
};

// 2. reducer 함수
function reducer(state, action) {
  switch (action.type) {
    // 4-2. 액션타입이 change inputs인 경우 input의 상태를 변경하여 반환
    case 'CHANGE_INPUT':
      // 현재 자신이 지니고 있는 상태에서 inputs안에 있는 특정 값을 바꾸는 액션 타입
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    // 5-4 액션타입이 create user인 경우 inputs를 초기화하고, users 배열에 dispatch로 전달받은 user의 정보들을 추가하여 반환
    case 'CREATE_USER':
      return {
        // useReducer를 사용하면 아래 두가지 행위를 동시에 진행할 수 있다.
        // inputs를 초기값으로 바꾼다.
        inputs: initialState.inputs,
        // action의 user를 state에 추가한다.
        users: state.users.concat(action.user),
      };
    // 6-2 액션 타입이 toggle user인 경우 해당하는 id의 action 값을 토글하여 반환
    case 'TOGGLE_USER':
      return {
        // 기존의 state 유지
        ...state,
        // users 배열을 업데이트
        users: state.users.map((user) =>
          // 각 user의 id와 action으로 가져온 id가 같은지 비교
          user.id === action.id
            ? // action과 user의 id가 같다면 새로운 객체를 생성해서 user 값을 넣고 active값을 반전
              { ...user, active: !user.active }
            : // action과 user의 id가 다르다면 user를 그대로 반환
              user
        ),
      };
    // 7-2 액션 타입이 remove user인 경우 user를 지운 상태로 변환하여 반환
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };

    default:
      throw new Error('Unhandled action');
  }
}

function App() {
  // 3. useReducer 호출
  const [state, dispatch] = useReducer(reducer, initialState);
  // state 안의 inputs와 users를 구조분해할당으로 가져온다.
  const { users } = state;
  const { username, email } = state.inputs;

  // 5-1 userRef로 다음 id 값 참조하기
  // 기존의 id 값이 3까지 있기 때문에 useRef의 괄호 내부에는 다음 id값인 4
  const nextId = useRef(4);

  // 4. change input : input의 변경된 값을 가져와서 상태에 넣는다.
  const onChange = useCallback((e) => {
    // e.target에서 name과 value값 가져오기
    // e.target은 inputs이고, 화면에 나타나는 2가지 input은 name props를 각각 username, email라는 값으로 가지고 있다.
    // <input name="username" /> , <input name="email"/>
    const { name, value } = e.target;
    // 4-1. dispatch
    dispatch({
      type: 'CHANGE_INPUT',
      // e.target에서 가져온 name과 value를 그대로 넣는다.
      name,
      value,
    });
  }, []);

  // 5. create user
  const onCreate = useCallback(
    () => {
      // 5-2 새로운 user를 전달
      dispatch({
        type: 'CREATE_USER',
        user: {
          // useRef로 참조한 nextId의 current
          id: nextId.current,
          username,
          email,
        },
      });
      // 5-3 nextId.current에 1을 더한다.
      nextId.current += 1;
    },
    // 함수에서 기존 상태(username, email)를 의존하고 있으므로 deps에 넣는다.
    [username, email]
  );

  // 6. toggle user : active 상태를 toggle
  const onToggle = useCallback(
    (id) => {
      // 6-1 액션 타입과 user의 id를 전달 (action.id가 된다)
      dispatch({
        type: 'TOGGLE_USER',
        id,
      });
    },
    // 컴포넌트 생성 시 onToggle 함수가 한번 만들어주고 계속 사용할 수 있기 때문에 빈배열을 넣는다.
    []
  );

  // 7. user를 지우는 함수
  const onRemove = useCallback((id) => {
    // 7-1 액션 타입과 user의 id를 전달 (action.id가 된다)
    dispatch({
      type: 'REMOVE_USER',
      id,
    });
    // 컴포넌트 생성 시 onToggle 함수가 한번 만들어주고 계속 사용할 수 있기 때문에 빈배열을 넣는다.
  }, []);

  // 8. 활성화된 사용자 수 세기
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성 사용자 수 {count}</div>
    </>
  );
}

export default App;
