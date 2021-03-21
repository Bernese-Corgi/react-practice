import React, { useState } from 'react'

export default function Input() {
  // useState
  const [text, setText] = useState('')

  // input의 이벤트
  const onChange = (e) => {
    // e.target : 현재 이벤트가 발생한 DOM 요소
    // console.log(e.target) // <input />
    // e.target.value : input의 입력 값을 가져올 수 있다.
    setText(e.target.value)
  }

  // input 값 리셋
  const onReset = () => {
    setText('')
  }

  return (
    <div>
      <input
        // input의 변경이 생길때 실행할 이벤트
        onChange={onChange}
        // value 값을 현재 상태인 text로 지정
        value={text} />
      <button
        // button 클릭 시 input값 리셋
        onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {text}
      </div>
    </div>
  )
}