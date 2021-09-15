import React from 'react';

const NotFound = ({ location }) => {
  return (
    <div>
      <h2>존재하지 않는 페이지입니다. 주소를 다시 확인해주세요.</h2>
      <p>{location}</p>
    </div>
  );
};

export default NotFound;
