import { useEffect, useState } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 대기 / 완료 / 실패 상태 관리
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 어떠한 promise 작업을 수행하는 async 함수
    const process = async () => {
      // 로딩 상태 true로 설정하면서 시작
      setLoading(true);

      try {
        // usePromise 훅의 인수로 promise를 생성하는 콜백함수를 받아온다.
        // 프로미스 객체를 비동기로 받아오고, 그 결과값을 resolved 변수에 담는다.
        const resolved = await promiseCreator();

        // 서버와 통신한 데이터의 결과가 담긴 resovled 변수를 완료 상태값에 설정한다.
        setResolved(resolved);
      } catch (error) {
        // 에러 상태에 에러 객체를 전달한다.
        setError(error);
      }

      // 로딩 상태를 false로 설정하며 process 함수를 마친다.
      setLoading(false);
    };

    // promise 작업을 수행하는 process 함수를 호출한다.
    process();

    // 의존성 배열을 매개변수로 받아와서 설정한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // 대기, 완료, 실패 상태를 배열에 담아 반환한다.
  return [loading, resolved, error];
}
