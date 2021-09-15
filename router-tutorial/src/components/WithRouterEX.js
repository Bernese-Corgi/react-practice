import React from 'react';
import { withRouter } from 'react-router';

const WithRouterEX = ({ Comp, location, match, history }) => {
  return (
    <div>
      <h4>{Comp} location</h4>
      {/* JSON.strigfy(a, null, 2) : JSON에 들여쓰기가 적용된 상태로 문자열이 만들어진다. */}
      <textarea value={JSON.stringify(location, null, 2)} rows={7} readOnly />
      <h4>{Comp} match</h4>
      <textarea value={JSON.stringify(match, null, 2)} rows={7} readOnly />
      <button onClick={() => history.push('/')}>홈으로</button>
    </div>
  );
};

// 컴포넌트를 내보낼 때 함수로 감싼다.
export default withRouter(WithRouterEX);
