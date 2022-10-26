import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../atoms/Input/Input'
import { Icon } from '../../atoms/Icon/Icon'
import { getSize } from './helpers'
import classNames from 'classnames'
import './InputIcon.css'
export const InputIcon = ({variant,width,size,placeholder,type,isInline,isError,name,onChange,value,icon,onClick,iconWidth,hasBorder}) => {
    const InputIconClassNames=classNames('input-icon',{
        [`type-${variant}`]:variant,
        [`inputIcon-size-${size}`]:size
    })
    
    return (
        <>
       
        <div className={InputIconClassNames} >
            <Input name={name} onChange={onChange} value={value} isError={isError} type= {type} placeholder= {placeholder}/>
            <Icon onClick={onClick} icon={icon} width={iconWidth}/>
             
        </div>
       
        </>
    )
}
InputIcon.propTypes={
    variant:PropTypes.oneOf(['left','right']),
    
}
InputIcon.defaultProps={
    onClick:()=>{},
    variant:'right',
}
