import { call, put, takeLatest } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api';
import { finishLoading, startLoading } from './loading';

/* 액션 타입 선언 -------------------------------- */
// get post
const GET_POST = 'postcardSaga/GET_POST';
const GET_POST_SUCCESS = 'postcardSaga/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'postcardSaga/GET_POST_FAILURE';

// get user
const GET_USERS = 'postcardSaga/GET_USERS';
const GET_USERS_SUCCESS = 'postcardSaga/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'postcardSaga/GET_USERS_FAILURE';

/* 액션 생성 함수 -------------------------------- */
// GET_POST 액션은 API 요청 시 어떤 id로 조회할지 지정해야한다.
export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

/* saga generator 함수 생성 -------------------------- */
function* getPostSaga(action) {
  // 로딩 시작
  yield put(startLoading(GET_POST));

  // 매개변수로 action을 받아오면 액션의 정보를 조회할 수 있다.
  try {
    /**
     * call : Promise를 반환하는 함수를 호출하고, 기다린다.
     * API를 호출해야하는 상황에는 사가 내부에서 직접 호출하지 않고, call 함수를 사용한다.
     * 첫 번째 param : 호출할 함수
     * 나머지 param : 호출할 함수에 넣을 인수들
     */
    // post에 대한 axios.get 요청
    // 요청에 필요한 값(id)을 액션의 payload로 넣어야 하는데, 그러려면 payload 값을 API를 호출하는 함수의 인수로 넣어야 한다.
    // api.getPost(action.payload) 와 같은 의미
    const post = yield call(api.getPost, action.payload /* id */);
    // 요청 성공
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    // 요청 실패
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
  // 로딩 완료
  yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
  // 로딩 시작
  yield put(startLoading(GET_USERS));

  // 매개변수로 action을 받아오면 액션의 정보를 조회할 수 있다.
  try {
    /**
     * call : Promise를 반환하는 함수를 호출하고, 기다린다.
     * 첫 번째 param : 함수
     * 나머지 param : 첫번째 param으로 작성한 함수에 넣을 인수들
     */
    // users에 대한 axios.get 요청
    const users = yield call(api.getUsers); // api.getUsers(action.payload) 와 같은 의미
    // 요청 성공
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    // 요청 실패
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  // 로딩 완료
  yield put(finishLoading(GET_USERS));
}

export function* postcardSagaGenerator() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

/* 초기 상태 --------------------------------- */
const initialState = {
  post: null,
  users: null,
};

/* 리듀서 ---------------------------------- */
const postcardSaga = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default postcardSaga;
