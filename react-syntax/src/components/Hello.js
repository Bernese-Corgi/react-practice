import React from 'react'

export default function Hello({ color, name }) {
  // 구조 분해 할당으로 props 속성 가져오기
  // console.log(props) // props는 객체
  return (
    <div style={{
      color: color
    }}>
      안녕하세요
      {name}
    </div>
  )
}

Hello.defaultProps = {
  name: '이름 없음'
}