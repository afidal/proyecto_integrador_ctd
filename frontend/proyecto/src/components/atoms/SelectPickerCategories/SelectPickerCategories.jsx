import React, { useEffect } from 'react'
import Label from '../Label/Label'
import { SpacerHorizontal } from '../Spacer/SpacerHorizontal'
import './SelectPickerCategories.css'
import axios from 'axios';
import { urlAPI } from '../../../global.js'

export const SelectPickerCategories = ({ categories, setCategories }) => {

    useEffect(() => {
        axios.get(`${urlAPI}categorias/todas`).then(response => {
            setCategories([])
            response.data.map((category) =>
                setCategories((prevData) => [...prevData, category.titulo])
            )
        })
    }, [setCategories])

    return (
        <div className="selectPickerCategories">
            <Label required={true} label={"Categoría"} />
            <SpacerHorizontal height={"xxs"} />
            <select name="" id="selectCategory">
                <option value="" disabled selected hidden>Selecciona una Categoría</option>
                {categories.map((category, key) => {
                    return <option key={key++} value={category} className="optionsCategories">{category}</option>
                })}
            </select>
        </div>
    );
}
