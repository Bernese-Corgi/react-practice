// 1. 액션 타입 선언
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

// 2-2 새로운 todo를 만들 때 필요한 id값을 변수로 선언한다.
let nextId = 1;

// 2. 액션 생성 함수
export const addTodo = (text) => ({
  type: ADD_TODO,
  // 2-1 새로운 todo 항목 만든다.
  todo: {
    // 2-3 id값으로 nextId를 가져와 한번 호출되고 난 후 1이 더해진다.
    id: nextId++,
    // 2-4 todo 객체 내부에 매개변수로 가져온 text를 넣는다.
    text,
  },
});

// 2. 액션 생성 함수
export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

// 3. 초기 상태 선언
const initialState = [
  /*
    {
      id: 1,
      text: '예시',
      done: false
    }, 
  */
];

// 4. reducer
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      // todo라는 객체를 action에 담아서 가져오게 된다.
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map((todo) =>
        // 특정 id를 가진 항목을 찾아서 done값을 반전시킨다.
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    // 처리할 수 없는 액션 타입인 경우 상태를 그대로 반환
    default:
      return state;
  }
}
