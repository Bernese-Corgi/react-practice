import QueryString from 'qs';
import React from 'react'

const About = ({ location }) => {
  const query = QueryString.parse(location.search, {
    ignoreQueryPrefix: true, // 문자열 맨 앞의 ?를 생략
  });
  
  const showDetail = query.detail === 'true'; // 쿼리의 파싱 결과 값은 문자열
  
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습하는 프로젝트입니다.</p>
      {showDetail && <p>detail 값이 true로 설정됨</p>}
    </div>
  )
}

export default About
