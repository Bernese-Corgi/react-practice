import React from 'react'

export default function Hello({ color, name, isSpecial, isRequired }) {
  // 구조 분해 할당으로 props 속성 가져오기
  // console.log(props) // props는 객체
  return (
    <div style={{
      color
    }}>
      {/* 삼항연산자 - 내용이 달라질때 사용 */}
      {/* {isSpecial ? <b>*</b> : null} */}
      {/* 동일한 표현: &&연산자 */}
      {isSpecial && <b>*</b>}
      {/* 삼항연산자 더 적절한 방식 */}
      {isRequired ? '필수' : '선택'}
      안녕하세요
      {name}
    </div>
  )
}

Hello.defaultProps = {
  name: '이름 없음'
}