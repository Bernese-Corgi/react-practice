// import useState : useState 사용하기
import React, { useReducer } from 'react';

// reducer 함수
function reducer(state, action) {
  // state의 타입은 무엇이든 될 수 있다. 이 예제에서는 숫자.
  switch (action.type) {
    case 'INCREMENT':
      // 결과값은 다음에 올 상태값
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

export default function Counter() {
  // useReducer
  // dispatch : 액션을 발생시킨다.
  // useReducer의 매개변수
  // 1. reducer 함수
  // 2. 초기값
  const [number, dispatch] = useReducer(reducer, 0);

  // 버튼 클릭시 동작할 이벤트 함수 정의
  const onIncrease = () => {
    // dispatch로 액션의 type을 지정해서 액션을 발생시킨다.
    dispatch({
      type: 'INCREMENT',
    });
  };

  const onDecrease = () => {
    // dispatch로 액션의 type을 지정해서 액션을 발생시킨다.
    dispatch({
      type: 'DECREMENT',
    });
  };

  return (
    <div>
      {/* 현재 상태 값을 h1 요소에 렌더링 */}
      <h1>{number}</h1>
      {/* onClick={onIncrease()}로 함수호출하면, 렌더링될때 함수가 실행된다. 의도와 다르므로 적절치 않다. */}
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}
