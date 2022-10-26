import React, { useEffect } from 'react'
import Label from '../Label/Label'
import { SpacerHorizontal } from '../Spacer/SpacerHorizontal'
import './SelectPickerPlaces.css'
import axios from 'axios';
import { urlAPI } from '../../../global.js'

export const SelectPickerPlaces = ({ places, setPlaces }) => {

    useEffect(() => {
        axios.get(`${urlAPI}ciudades/todas`).then(response => {
            setPlaces([])
            response.data.map((city) =>
                setPlaces((prevData) => [...prevData, city.nombre])
            )
        })
    }, [setPlaces])

    return (
        <div className="selectPickerPlaces">
            <Label required={true} label="Ciudad " />
            <SpacerHorizontal height={"xxs"} />
            <select name="" id="selectPlace">
                <option value="" disabled selected hidden>Selecciona una Ciudad</option>
                {places.map((place, key) => {
                    return <option value={place} key={key++} className="optionsPlaces">{place}</option>
                })}
            </select>
        </div>
    );
}
