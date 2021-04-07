// 1. action type 선언
// 다른 모듈과 이름이 겹치지 않게 하기 위해 'counter/'를 붙인다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 2. 액션 생성 함수
// export를 앞에 붇인다.
export const setDiff = (diff) => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 3. 초기 상태 선언
const initialState = {
  number: 0,
  // increase, decrease 할 떄 1씩 차이가 나게 한다.
  diff: 1,
};

// 4. 리듀서 작성
// export default
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        // action에서 diff값을 받아와서 전해준다.
        diff: action,
      };
    case INCREASE:
      return {
        ...state,
        // state의 number에 diff를 더한다.
        number: state.number + state.diff,
      };
    case DECREASE:
      return {
        ...state,
        // state의 number에 diff를 뺀다.
        number: state.number - state.diff,
      };
    default:
      return state;
  }
}
