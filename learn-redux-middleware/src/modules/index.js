// combineReducers : root Reducer 생성
import { combineReducers } from 'redux';
import counter from './counter';
import postcard from './postcard';

// root reducer
const rootReducer = combineReducers({ counter, postcard });

export default rootReducer;
