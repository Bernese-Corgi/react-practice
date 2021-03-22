import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import './styles/index.scss'
import Counter from 'components/Counter/Counter'
// import Home from './pages/Home'

class Got extends React.Component {
  state = {
    isShow: true,
  }

  handleChange = (e) => {
    this.setState({
      isShow: !this.state.isShow,
    })
  }

  render() {
    return (
      <>
        <input
          type="checkbox"
          onChange={this.handleChange}
          checked={this.state.isShow}
        />
        {this.state.isShow ? <Counter step={3} /> : null}
      </>
    )
  }
}

render(
  <StrictMode>
    {/* <Home noti={'노티티티~~~'} /> */}
    <Got />
  </StrictMode>,
  document.getElementById('root')
)
