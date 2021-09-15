import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const NewsList = () => {
  // articles 상태
  const [articles, setArticles] = useState(null);

  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // article 불러오기
  useEffect(() => {
    // 데이터 가져오기 함수, async를 사용하는 함수는 따로 선언해야 한다.
    const fetchData = async () => {
      // 로딩 중이므로 loading
      setLoading(true);

      try {
        // news API에 get 요청
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=kr&category=science&apiKey=656e5f6ee4c24324a79ec250c2aec539',
        );

        // get 요청의 응답 결과 값 객체 중 articles를 상태값에 설정
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }

      // 로딩 상태 false
      setLoading(false);
    };

    fetchData();
  }, []);

  // 로딩 중일때 렌더링할 컴포넌트
  if (loading) {
    return <NewsListBlock>불러오는 중...</NewsListBlock>;
  }

  // !articles를 조회하여 해당 값이 현재 null이 아닌지 검사해야 한다.
  if (!articles) {
    return null;
  }

  // ↓ articles이 null이면 컴포넌트를 렌더링 하지 않고, null을 반환하다가 articles 값이 유효한 순간에 컴포넌트를 렌더링한다.

  // articles 값이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
