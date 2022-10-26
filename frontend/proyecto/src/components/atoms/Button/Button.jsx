import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Button.css'


    
export const Button = ({id, size,label,onClick,variant,type,disabled}) => {
    const ButtonClassNames=classNames('button',{
        'variant-primary':variant,
        'variant-secondary':!variant,
        [`button-size-${size}`]:size,
        'is-disabled':disabled,
        'id': id
    })
  return (
      <>
      <button id={id} disabled={disabled} type={type} onClick={onClick} className={ButtonClassNames} >{label}</button>
    </>
  )
}

Button.propTypes = {
    variant:PropTypes.bool,
    size:PropTypes.oneOf(['base','xs','sm','md','lg','xl']),
    label:PropTypes.node,
    onClick:PropTypes.func,
    type:PropTypes.oneOf(['button','submit'])
}
Button.defaultProps={
    size:'md',
    label:'Button',
    variant:true,
    onClick:()=>{},
    type:'button',
    disabled:false,
    id: null
}


