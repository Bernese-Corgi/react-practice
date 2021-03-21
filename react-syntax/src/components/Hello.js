import React from 'react'

export default function Hello(props) {
  console.log(props) // props는 객체
  return (
    <div style={{
      color: props.color
    }}>
      안녕하세요
      {props.name}
    </div>
  )
}