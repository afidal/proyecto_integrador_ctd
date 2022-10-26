import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Label.css'
 const Label = ({id,label,required}) => {
  const LabelClassNames = classNames('label', {
    'is-required': required,
  })
  return (
    <label  className={LabelClassNames} htmlFor={id}>{label}</label>
  )
}

Label.propTypes = {
    id:PropTypes.string,
    label:PropTypes.string.isRequired
    
}


export default Label