import React from 'react'

const data = {
  userA/* match.params 안의 username과 일치하는 프로퍼티 키 */: {
    name: 'Name A',
    description: 'A입니다.'
  },
  userB: {
    name: 'Name B',
    description: 'B입니다.'
  }
}

const Profiles = ({ match }) => {
  const { username } = match.params;
  // data에서 match.params.username과 해당하는 프로퍼티 키에 해당하는 값을 변수 profile에 저장
  const profile = data[username];

  // username과 일치하는 사용자가 없으면 반환할 jsx
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>
  }

  return (
    <div>
      <h3>{username}({profile.name})</h3>
      <p>{profile.description}</p>
    </div>
  )
}

export default Profiles
