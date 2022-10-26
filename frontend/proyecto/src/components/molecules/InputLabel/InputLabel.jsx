import React from 'react'
import PropTypes from 'prop-types'
import Label from '../../atoms/Label/Label'
import { Input } from '../../atoms/Input/Input'
import classNames from 'classnames'
import './InputLabel.css'
import { InputIcon } from '../InputIcon/InputIcon'
export const InputLabel = ({ required, variant, size, placeholder, type, label, isInline, isError, name, onChange, value, icon, iconWidth, onClick, disabled }) => {
    const InputLabelClassNames = classNames('input-label', {
        'isInline': isInline,
    })
    return (
        <>
            <div className={InputLabelClassNames}>
                <Label required={required} label={label} />
                {icon ?
                    <InputIcon variant={variant} icon={icon} iconWidth={iconWidth} onClick={onClick} name={name} onChange={onChange} value={value} isError={isError} size={size} type={type} placeholder={placeholder} /> : <Input name={name} disabled={disabled} onChange={onChange} value={value} isError={isError} size={size} type={type} placeholder={placeholder} />}
            </div>

        </>
    )
}

InputLabel.propTypes = {
    isInline: PropTypes.bool
}
InputLabel.defaultProps = {
    isInline: false,
    isError: false,
    required: false,
}


