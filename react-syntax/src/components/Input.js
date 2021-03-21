import React, { useState } from 'react'

export default function Input() {
  // useState : 객체 형태로 상태 관리
  // input의 상태를 객체 형태로 초기화
  const [inputs, setInputs] = useState({
    name: '',
    nickname: '',
  })

  // inputs의 프로퍼티를 구조 분해 할당
  const { name, nickname } = inputs

  // input의 이벤트
  const onChange = (e) => {
    // console.log(e.target.name) // name, nickname
    // console.log(e.target.value) // 입력 값
    const { name, value } = e.target

    // 1. 객체 복사하기
    const nextInputs = { ...inputs }
    // 2. 특정 값 덮어쓰기
    nextInputs[name] = value
    // 3. 상태 업데이트 하기
    setInputs(nextInputs)
    // 1~3 한번에 표현
    // setInputs({ ...inputs, [name]: value })
  }

  // input 값 리셋
  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
  }

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button
        // button 클릭 시 input값 리셋
        onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  )
}