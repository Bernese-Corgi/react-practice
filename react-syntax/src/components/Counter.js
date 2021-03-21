// import useState : useState 사용하기
import React, { useState } from 'react'

export default function Counter() {
  // useState: 현재 상태의 기본값 지정과, 업데이트 함수를 설정
  // 첫번째 요소 : state, 현재 상태
  // 두번째 요소 : setState, 현재 상태를 업데이트하는 함수
  // useState(0) : 괄호 안에는 현재 상태의 가본값을 설정할 수 있다.
  const [number, setNumber] = useState(0)

  // 버튼 클릭시 동작할 이벤트 함수 정의
  const onIncrease = () => {
    // console.log('+1')
    setNumber(number + 1)
  }

  const onDecrease = () => {
    // console.log('-1')
    setNumber(number - 1)
  }

  return (
    <div>
      {/* 현재 상태 값을 h1 요소에 렌더링 */}
      <h1>{number}</h1>
      {/* onClick={onIncrease()}로 함수호출하면, 렌더링될때 함수가 실행된다. 의도와 다르므로 적절치 않다. */}
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}