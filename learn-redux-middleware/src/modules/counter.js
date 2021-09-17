import { createAction, handleActions } from 'redux-actions';

/* 액션 타입 선언 -------------------------------- */
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성 함수 -------------------------------- */
export const increase = createAction(INCREASE); // createActions는 액션 객체를 자동으로 생성해준다.
export const decrease = createAction(DECREASE);

/* thunk --------------------------------- */
// 1초 뒤에 increase 함수 디스패치
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

// 1초 뒤에 decrease 함수 디스패치
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

/* 초기 상태 --------------------------------- */
const initialState = 0; // 초기 상태는 숫자도 가능하다.

/* 리듀서 ---------------------------------- */
// handleActions 함수 호출로 리듀서 생성하기
const counter = handleActions(
  // 첫번째 매개변수 : 각 액션에 대한 업데이트 함수
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  // 두번째 매개변수 : 초기 상태
  initialState
);

export default counter;

/* 기존 방식으로 리듀서 함수 정의 ---------------------------------------------------
export default function counter(state = initialState, action) {
  switch (action.type) {
    // 액션 타입이 INCREASE이면 state + 1
    case INCREASE:
      return state + 1;
    // 액션 타입이 DECREASE이면 state - 1
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
--------------------------------------------------- */
