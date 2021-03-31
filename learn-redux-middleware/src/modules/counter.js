// 액션 타입 선언
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 초기 상태 : 초기 상태는 숫자도 가능하다.
const initialState = 0;

// 리듀서 함수
export default function counter(state = initialState, action) {
  switch (action.type) {
    // 액션 타입이 INCREASE이면 state + 1
    case INCREASE:
      return state + 1;
    // 액션 타입이 DECREASE이면 state - 1
    case DECREASE:
      return state + 2;
    default:
      return state;
  }
}
