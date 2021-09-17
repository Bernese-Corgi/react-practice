import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

/* 액션 타입 선언: 한 요청당 세 개를 생성해야 한다. --------------------- */
// get post
const GET_POST = 'posts/GET_POST';
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'posts/GET_POST_FAILURE';

// get user
const GET_USERS = 'posts/GET_USERS';
const GET_USERS_SUCCESS = 'posts/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'posts/GET_USERS_FAILURE';

/* thunk 함수 생성 ------------------------------ */
// thunk 함수 내부에서 시작 시 / 성공 시 / 실패 시 다른 액션을 디스패치한다.

// get post
export const getPost = (id) => async (dispatch) => {
  // 요청 시작을 알린다.
  dispatch({ type: GET_POST });

  try {
    // posts에 대한 axois.get 요청
    const response = await api.getPost(id);
    // 요청 성공
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    // 요청 실패 (에러 발생)
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    // 나중에 컴포넌트단에서 에러를 조회할 수 있다.
    throw e;
  }
};

// get user
export const getUsers = () => async (dispatch) => {
  // 요청 시작을 알린다.
  dispatch({ type: GET_USERS });

  try {
    // users에 대한 axois.get 요청
    const response = await api.getUsers();
    // 요청 성공
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    // 요청 실패 (에러 발생)
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

/* 초기 상태 --------------------------------- */
const initialState = {
  // loading 객체 : 요청의 로딩 중 상태 관리
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};

/* 리듀서 ---------------------------------- */
const posts = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_POST: true /* 요청 시작 */ },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_POST: false /* 요청 완료 */ },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_POST: false /* 요청 완료 */ },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: true /* 요청 시작 */ },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: false /* 요청 완료 */ },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: false /* 요청 완료 */ },
    }),
  },
  initialState
);

export default posts;
