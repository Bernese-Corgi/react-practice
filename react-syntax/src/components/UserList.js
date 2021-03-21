import React from 'react'

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
      <li>
        <b>{users[0].username}</b>
        <span style={{
          color: 'salmon'
        }}>({users[0].email})</span>
      </li>
      <li>
        <b>{users[1].username}</b>
        <span style={{
          color: 'salmon'
        }}>({users[1].email})</span>
      </li>
      <li>
        <b>{users[2].username}</b>
        <span style={{
          color: 'salmon'
        }}>({users[2].email})</span>
      </li>
    </ul>
  )
}