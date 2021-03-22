import React from 'react'
import './Checkbox.scss'

const Checkbox = ({ checked, disabled, chlidren, ...restProps }) => {

  return <input type='checkbox'
    className={`checkbox 
    ${checked ? 'checked' : ''} 
    ${disabled ? 'disabled' : ''}
    ${(checked && disabled) ? 'checkedDisabled' : ''}`}
    {...restProps}
  />
}

export default Checkbox

