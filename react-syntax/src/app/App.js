import Wrapper from 'components/Wrapper'
import Hello from '../components/Hello'
import './App.scss'

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="tomato" isSpecial={true} />
      {/* 조건부 렌더링의 경우 boolean 값을 명시하지 않는 경우 디폴트가 true이다. */}
      <Hello color="gold" isRequired />
    </Wrapper>
  )
}

export default App
