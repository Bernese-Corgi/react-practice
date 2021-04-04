import React from 'react';
import { TodoTemplateBlock } from './TodoTemplate.styled';

export default function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}
