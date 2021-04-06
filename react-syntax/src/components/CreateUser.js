import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />

      <button
        // 버튼을 클릭할 때 onCreate 함수가 호출된다.
        onClick={onCreate}
      >
        등록
      </button>
    </div>
  );
}

// React.memo: props가 바뀔때만 리렌더링
export default React.memo(CreateUser);
