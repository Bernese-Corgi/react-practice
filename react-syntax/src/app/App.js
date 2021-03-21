import Wrapper from 'components/Wrapper'
import Hello from '../components/Hello'
import './App.scss'

function App() {
  return (
    <Wrapper>
      <Hello name="react" color="tomato" />
      <Hello color="gold" />
    </Wrapper>
  )
}

export default App
