import { useEffect, useState } from 'react';

export default function usePromise(promiseCreator, deps) {
  /* 상태관리 ---------------------------------- */
  // 대기 중
  const [loading, setLoading] = useState(false);
  // 완료 시
  const [resolved, setResolved] = useState(null);
  // 실패 시
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);

      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    process();

    // 의존성 배열을 매개변수로 받아와서 설정한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
