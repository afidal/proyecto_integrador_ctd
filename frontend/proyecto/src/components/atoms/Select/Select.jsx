import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Select.css'
const Select = ({ options,size, placeholder }) => {

  const SelectClassNames = classNames('input', {
    [`input-size-${size}`]: size,
  })

  return (
    <div className='dr'>
      <select required className={SelectClassNames} size={size} placeholder={placeholder}>
        {options.map((item, index) => <option value={index} key={index++}>{item}</option>)}
      </select>
    </div>
  )
}

Select.propTypes = {
  size:PropTypes.oneOf(['base','xs','sm','md','lg','xl','2xl']),
  placeholder:PropTypes.string
}

export default Select