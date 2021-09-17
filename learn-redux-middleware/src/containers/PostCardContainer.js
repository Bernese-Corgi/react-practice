import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PostCard from '../components/PostCard';
import { getPost, getUsers } from '../modules/postcard';

const PostCardContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  useEffect(() => {
    getPost(1);
    getUsers(1);
  }, [getPost, getUsers]);

  return (
    <PostCard
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
      post={post}
      users={users}
    />
  );
};

export default connect(
  // params1: 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
  // state를 매개변수로 받아오며, 이 값은 현재 스토어가 지니고 있는 상태를 가리킵니다.
  ({ postcard, loading } /* state.postcard */) => ({
    post: postcard.post,
    users: postcard.users,
    loadingPost: loading.GET_POST,
    loadingUsers: loading.GET_USERS,
  }),
  // params2: 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
  // store의 내장 함수 dispatch를 파라미터로 받아온다. 여기서는 thunk 함수를 받아오고 있다.
  { getPost, getUsers }
  // 매개변수들이 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달된다.
)(PostCardContainer);
