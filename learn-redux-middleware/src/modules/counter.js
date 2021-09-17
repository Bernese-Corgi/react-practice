import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

/* 액션 타입 선언 -------------------------------- */
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성 함수 -------------------------------- */
export const increase = createAction(INCREASE); // createActions는 액션 객체를 자동으로 생성해준다.
export const decrease = createAction(DECREASE);

/* thunk --------------------------------- 
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
*/

/* redux-saga 액션 타입 선언 -------------------------- */
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

/* redux-saga 액션 생성 함수 -------------------------- */
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

/* redux-saga 제너레이터 함수 -------------------------- */
function* increaseSaga() {
  yield delay(1000); // 1초를 기다림
  yield put(increase()); // 특정 액션을 디스패치
}

function* decreaseSaga() {
  yield delay(1000); // 1초를 기다림
  yield put(decrease()); // 특정 액션을 디스패치
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 들어오는 모든 액션에 대해 특정 작업 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 기존에 진행중이던 작업이 있으면 취소하고 가장 마지막으로 실행된 작업만 수행
}

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
