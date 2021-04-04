import React from 'react';
import { MdDelete, MdDone } from 'react-icons/md';
import { CheckCircle, Remove, Text, TodoItemBlock } from './TodoItem.styled';

export default function TodoItem({ id, done, text }) {
  return (
    <TodoItemBlock>
      <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}
