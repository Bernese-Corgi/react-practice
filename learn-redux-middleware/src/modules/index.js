// combineReducers : root Reducer 생성
import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
// import postcard from './postcard';
import postcardSaga, { postcardSagaGenerator } from './postcardSaga';
import loading from './loading';
import { all } from 'redux-saga/effects';

// root reducer
const rootReducer = combineReducers({
  counter,
  // postcard,
  postcardSaga,
  loading,
});

// redux-saga rootSaga
export function* rootSaga() {
  // all : 여러가지 saga를 합침
  yield all([counterSaga(), postcardSagaGenerator()]);
}

export default rootReducer;
