import React, { Component } from 'react'
import App from 'app/App'

const groupMessage = (id) => {
  console.groupCollapsed(id)
  const targetNode = document.querySelector('.App-header g')
  console.log(targetNode)
  console.groupEnd(id)

  return targetNode
}

/* -------------------------------------------------------------------------- */

export default class Home extends Component {
  constructor(props) {
    super(props)
    console.log('나(Home)는 지금 태어났습니다.')
    // dom script
    groupMessage('constructor')
  }

  state = {
    logo: {
      label: 'React',
    },
    message: () => <code>src/App.js</code>,
    link: {
      path: 'https://ko.reactjs.org',
      external: true,
    },
  }

  render() {
    const { logo, message, link } = this.state
    console.log('나(Home)는 지금 그려집니다.')
    groupMessage('render')
    return <App logo={logo} renderMessage={message} link={link} />
  }

  componentDidMount() {
    const gNode = groupMessage('componentDidMount')
    const originalFillColor = gNode.getAttribute('fill')
    window.setTimeout(() => {
      gNode.style.cssText = `
        transition: fill 0.8s ease-in-out;
        fill: #eae211;
      `
    }, 1000)

    window.setTimeout(() => {
      gNode.style.cssText += `
        fill: #5911ea;
      `
    }, 2000)

    window.setTimeout(() => {
      gNode.style.cssText += `
        fill: ${originalFillColor};
      `
    }, 3000)
  }
}
