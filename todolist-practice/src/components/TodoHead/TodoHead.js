import React from 'react';
import Heading from 'components/Heading/Heading';
import { TodoHeadBlock } from './TodoHead.styled';

export default function TodoHead() {
  return (
    <TodoHeadBlock>
      <Heading level={2} children="2019년 7월 21일" />
      <div className="day">일요일</div>
      <div className="tasks-left">할 일 2개 남음</div>
    </TodoHeadBlock>
  );
}
