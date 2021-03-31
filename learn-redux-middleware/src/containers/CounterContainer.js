import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { decrease, increase } from '../modules/counter';

export default function CounterContainer() {
  // redux store 안에 들어있는 상태값 가져오기
  // state.counter : reduce 이름이 counter이므로 store 안의 counter를 가져온다.
  const number = useSelector((state) => state.counter);
  //  디스패치 가져오기 : onIncrease, onDecrease 함수를 만들어서 dispatch하기 위해.
  const dispatch = useDispatch();

  const onIncrease = () => {
    // 액션 생성함수 디스패치 : 액션을 만들고 디스패치
    dispatch(increase());
  };

  const onDecrease = () => {
    // 액션 생성함수 디스패치 : 액션을 만들고 디스패치
    dispatch(decrease());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
}
