// combineReducers : root Reducer 생성
import { combineReducers } from 'redux';
import counter from './counter';
import postcard from './postcard';
import loading from './loading';

// root reducer
const rootReducer = combineReducers({ counter, postcard, loading });

export default rootReducer;
