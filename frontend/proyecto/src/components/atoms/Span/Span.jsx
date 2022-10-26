import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import './Span.css'

export const Span = ({variant, children, size,onClick}) => {

  const SpanClassNames = classNames('span',{
    [`span-colors-${variant}`]:variant,
    [`span-size-${size}`]:size
    
})
return (
    <>
  <span onClick={onClick} className={SpanClassNames} >{children}</span>
  </>
)
}

Span.propTypes = {
    text: PropTypes.string.isRequired,
    size:PropTypes.oneOf(['sm','md']),
    variant: PropTypes.oneOf(['primary']),
    onClick:PropTypes.func
    
};

Span.defaultProps={
    variant: 'blue',
    size:'md',
    text: 'String',
    onClick:()=>{}
}