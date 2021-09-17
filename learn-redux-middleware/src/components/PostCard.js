import React from 'react';

const PostCard = ({ loadingPost, loadingUser, post, users }) => {
  return (
    <div>
      {/* post section */}
      <section>
        <h1>포스트</h1>
        {/* 로딩 중 */}
        {loadingPost && '로딩 중...'}
        {/* 포스트 렌더링 : 데이터를 불러와서 렌더링할 때는 유효성 검사를 해야한다. */}
        {!loadingPost &&
          post && ( // post 객체가 유효한 경우에만 렌더링
            <div>
              {/* 데이터가 없는 경우 post.title, post.body를 조회하려고 하면 자바스크립트 오류 발생 */}
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          )}
      </section>

      {/* user section */}
      <section>
        <h1>사용자 목록</h1>
        {/* 로딩 중 */}
        {loadingUser && '로딩 중...'}
        {/* 사용자 목록 렌더링 */}
        {!loadingUser &&
          users && ( // users 배열이 유효한 경우에만 렌더링
            <ul>
              {/* 데이터가 없는 경우 유효성 검사를 하지 않으면, null 값에 대해 map함수를 호출해서 오류가 발생한다. */}
              {users.map((user) => (
                <li key={user.id}>
                  {user.username} ({user.email})
                </li>
              ))}
            </ul>
          )}
      </section>
    </div>
  );
};

export default PostCard;
