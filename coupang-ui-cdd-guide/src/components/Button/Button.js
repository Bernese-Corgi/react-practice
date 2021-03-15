import React from 'react'
// import propTypes from 'prop-types'
import './Button.scss'

const Button = ({ mode = 'Primary', className = 'primary', disabled, ...restProps }) => {
  mode === 'Secondary' ? className = 'secondary' : className = 'primary'

  return <button type="button"
    mode={mode}
    className={`button ${className}`}
    disabled={disabled}
    {...restProps}>
    버튼</button>
}

export default Button