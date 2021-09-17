const loggerMiddleware =
  (store /* 리덕스 스토어 인스턴스 */) =>
  (next /* 함수 형태, 액션을 전달하는 역할 */) =>
  (action /* 디스패치된 액션 */) => {
    // 액션 타입으로 log를 그룹화
    console.group(action && action.type);

    // 이전 상태 출력
    console.log('이전 상태: ', store.getState());
    // 액션 출력
    console.log('액션: ', action);
    // 다음 미들웨어 or 리듀서에 액션 전달
    next(action);
    // 업데이트된 상태 출력
    console.log('다음 상태: ', store.getState());

    // 그룹 끝
    console.groupEnd();
  };

export default loggerMiddleware;
