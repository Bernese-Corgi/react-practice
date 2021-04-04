import TodoItem from 'components/TodoItem/TodoItem';
import React from 'react';
import { TodoListBlock } from './TodoList.styled';

export default function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="a" done={true} />
      <TodoItem text="b" done={false} />
      <TodoItem text="ee" done={true} />
      <TodoItem text="ww" done={false} />
    </TodoListBlock>
  );
}
