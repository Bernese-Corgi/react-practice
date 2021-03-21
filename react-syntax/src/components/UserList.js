import React from 'react'

function User({ user }) {
  return (
    <li>
      <b>{user.username}</b>
      <span style={{
        color: 'salmon'
      }}>({user.email})</span>
    </li>
  )
}

export default function UserList() {
  const users = [
    {
      id: 1,
      username: 'Jinyoung',
      email: 'jy@gmail.com',
    },
    {
      id: 2,
      username: 'Jinjoo',
      email: 'jj@gmail.com',
    },
    {
      id: 3,
      username: 'Jinee',
      email: 'jn@gmail.com',
    },
  ]

  return (
    <ul>
      <User user={users[0]} />
      <User user={users[1]} />
      <User user={users[2]} />
    </ul>
  )
}