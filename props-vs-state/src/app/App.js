import React from 'react'
// import { AppHeader } from 'containers/AppHeader'
import './App.scss'
import Counter from 'components/Counter/Counter'

// react component
// function → class
class App extends React.Component {
  // 클래스(정적) 멤버
  static defaultProps = {}
  static propTypes = {}

  render() {
    // 나의 멤버
    // const { logo, renderMessage, link } = this.props
    // JSX → Data 분리
    return (
      <div className="App">
        <Counter />
        {/* <AppHeader logo={logo} renderMessage={renderMessage} link={link} /> */}
      </div>
    )
  }
}

export default App
