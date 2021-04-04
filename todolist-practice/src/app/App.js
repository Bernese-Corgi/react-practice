import Header from 'containers/Header/Header';
import TodoTemplate from 'components/TodoTemplate/TodoTemplate';
import { GlobalStyle } from './App.styled';
import TodoHead from 'components/TodoHead/TodoHead';
import TodoList from 'components/TodoList/TodoList';
import TodoCreate from 'components/TodoCreate/TodoCreate';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default App;
