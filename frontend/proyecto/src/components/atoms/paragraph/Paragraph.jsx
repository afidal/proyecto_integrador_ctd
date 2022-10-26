import React from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import './Paragraph.css'

export const Paragraph = ({size, children, variant,onClick,light}) => {

  const ParagraphClassNames = classNames('paragraph',{
    [`paragraph-colors-${variant}`]:variant,
    [`paragraph-size-${size}`]:size,
    'is-light':light
})
return (
    <>
  <p onClick={onClick} className={ParagraphClassNames} >{children}</p>
  </>
)
}

Paragraph.propTypes = {
    text: PropTypes.string.isRequired,
    size:PropTypes.oneOf(['sm','md','lg','xmd']),
    variant: PropTypes.oneOf(['primary', 'secondary','error','tertiary','base']),
    
};

Paragraph.defaultProps={
    size:'md',
    text: 'String',
    variant: 'primary',
    onClick:()=>{},
    light:false
}