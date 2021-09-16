import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import usePromise from '../lib/usePromise';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  // usePromise 훅 호출하고, 결과값을 배열 디스트럭칭 할당
  const [loading, response, error] = usePromise(
    // usePromise 훅의 첫번째 인수에는 promise를 생성하는 콜백 함수를 전달
    () => {
      // 쿼리 값에 카테고리 이름대로 설정
      const query = category === 'all' ? '' : `&category=${category}`;

      // 내부 콜백함수의 반환값으로 axios.get 요청을 작성
      return axios.get(
        `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=656e5f6ee4c24324a79ec250c2aec539`,
      );
    },
    // category 값이 바뀔때마다 기사를 새로 불러와야 하므로 의존성 배열에 category를 넣어서 전달
    [category],
  );

  // 로딩 중일때 렌더링할 컴포넌트
  if (loading) {
    return <NewsListBlock>불러오는 중...</NewsListBlock>;
  }

  // response 값이 아직 설정되지 않았을 때
  if (!response) {
    return null;
  }

  if (error) {
    console.log(error);
    return <NewsListBlock>에러 발생</NewsListBlock>;
  }

  // ↓ response가 null이면 컴포넌트를 렌더링 하지 않고, null을 반환하다가 response 값이 유효한 순간에 컴포넌트를 렌더링한다.

  // response 값이 유효할 때
  const { articles } = response.data;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
