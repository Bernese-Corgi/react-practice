// combineReducers : root Reducer 생성
import { combineReducers } from 'redux';
import counter from './counter';
import posts from './posts';

// root reducer
const rootReducer = combineReducers({ counter, posts });

export default rootReducer;
