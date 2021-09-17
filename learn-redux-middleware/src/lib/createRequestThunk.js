export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params) => async (dispatch) => {
    // 요청 시작
    dispatch({ type });

    try {
      const response = await request(params);
      // 요청 성공
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      // 요청 실패
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      throw e;
    }
  };
}

/* 사용법 ---------------------------------- */
// createRequestThunk('GET_USERS', api.getUsers);
