import React, { useState } from "react";
export const Checkbox = ({ id, onChange = () => { } ,icono}) => {
    const [actualState, changeCheckState] = useState(false);
    const handleCheckbox = e => {
        changeCheckState(e.target.checked);
        //Si además de cambiar el estado quieres "avisar" al componente padre puedes ejecutar una función pasada por los props
        if (onChange) {
            onChange(id, e.target.checked,icono);
        }
    };
    return (
        <input
            checked={actualState}
            id={id}
            icono={icono}
            onChange={handleCheckbox}
            type="checkbox"
        />
    );
};