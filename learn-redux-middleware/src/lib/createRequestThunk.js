import { finishLoading, startLoading } from '../modules/loading';

export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params) => async (dispatch) => {
    // 요청 시작
    dispatch({ type });
    // 요청이 시작되면 로딩이 true 상태로 전환
    dispatch(startLoading(type));

    try {
      const response = await request(params);
      // 요청 성공
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
      // 요청이 성공하면, 로딩이 false 상태로 전환
      dispatch(finishLoading(type));
    } catch (e) {
      // 요청 실패
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      // 요청이 실패하면, 로딩이 false 상태로 전환
      dispatch(finishLoading(type));
      throw e;
    }
  };
}

/* 사용법 ---------------------------------- */
// createRequestThunk('GET_USERS', api.getUsers);
