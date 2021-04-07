// store를 생성하는 함수 불러오기
import { createStore } from 'redux';

// 1. 초기 상태
const intialState = {
  counter: 0,
  text: '',
  list: [],
};

// 2. action type 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

// 3. 액션 생성 함수 정의
const increase = () => ({
  type: INCREASE,
});

const decrease = () => ({
  type: DECREASE,
});

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text,
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});

// 4. 리듀서 함수 정의
// state = intialState : 리덕스에서 초기상태를 만들때 리듀서를 한번 호출하는데, 이 때 state가 undefined면 default로 반환하는 값이 undefined가 되면서 초기상태가 만들어지지 않는다.
function reducer(state = intialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

// 5. 리듀서를 이용해 스토어 생성
const store = createStore(reducer);
// store 안의 상태를 조회
console.log(store.getState());

// 6. 구독
const listner = () => {
  const state = store.getState();
  console.log(state);
};
// listner 함수를 스토어에 구독
const unsubscribe = store.subscribe(listner);
// 구독 해제 : listner 함수의 구독을 해제하는 것.
// unsubscribe();

// 7. 액션 디스패치
// 액션이 디스패치될때마다 콘솔에 현재 상태가 출력된다 (구독했기 때문)
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({ id: 1, text: '와우' }));

// store 인스턴스를 브라우저의 콘솔에서 사용할 수 있다.
window.store = store;
window.unsubscribe = unsubscribe;
