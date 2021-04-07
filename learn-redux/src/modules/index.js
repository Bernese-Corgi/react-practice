import { combineReducers } from 'redux';
// 리듀서들 불러오기
import counter from './counter';
import todos from './todos';

// 5. rootReducer로 리듀서 묶기
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
