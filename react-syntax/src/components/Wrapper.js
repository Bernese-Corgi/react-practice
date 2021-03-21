import React from 'react'

export default function Wrapper({ children }) {
  const style = {
    border: '2px solid lightgray',
    padding: 16
  }

  return (
    <div style={style}>
      {/* 자식 요소들을 렌더링하고 싶으면 children 속성을 인터폴레이션 해야한다. */}
      {children}
    </div>
  )
}