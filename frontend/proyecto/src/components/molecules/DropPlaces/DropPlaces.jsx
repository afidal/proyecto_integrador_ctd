import { React, useState,useEffect } from 'react';
import { Icon } from '../../atoms/Icon/Icon'
import axios from 'axios'
import { urlAPI } from '../../../global.js';

import './DropPlaces.css'


export const DropPlaces = ({lugarInput, setLugarInput,placeholder, icon }) => {

    const [lugares,setLugares]=useState([])
    useEffect(() => {
        axios.get(`${urlAPI}ciudades/todas`).then(data=>setLugares(data.data))    
    }, []);

    const [lugarFiltrado, setLugarFiltrado] = useState([]);
   
    const handleFilter = (event) => {
        const letraBuscada = event.target.value;
        setLugarInput(event.target.value.toLowerCase())
        const nuevoFiltro = lugares.filter((lugar) => {
            return lugar.nombre.toLowerCase().includes(letraBuscada.toLowerCase())
        });

        if (letraBuscada === "") {
            setLugarFiltrado([])
        } else {
            setLugarFiltrado(nuevoFiltro);
        }
    }

    const inputLugar = document.getElementById("inputLugar");
    
    const handlePlace = (lugar,ciudad)=>{
        setLugarFiltrado([]);
        setLugarInput(ciudad)
        return inputLugar.value = lugar;
    }

    return (
        <div className="search">
            <div className="searchInputIcon">
                <Icon className="icon" icon={icon} width={icon.width} />
                <input autoComplete='off' type="text" id="inputLugar" placeholder={placeholder} onChange={handleFilter}></input>
            </div>
            {lugarFiltrado.length !== 0 && (
                <div className="searchResult">
                    {lugarFiltrado.map((lugar, key) => {
                        return (
                            <>
                            <div key={key++} className="lugar" onClick={()=>handlePlace(lugar.nombre + ", " + lugar.pais,lugar.nombre)}>
                                <div className="lugarIcon">
                                    <Icon className="" icon="locationEmpty" width="lg" />
                                </div>
                                <div className="ciudad-pais">
                                    <p className="ciudad">{lugar.nombre}</p>
                                    <p className="pais">{lugar.pais}</p>
                                </div>
                                
                            </div>
                            <div className="linea"></div>
                            </>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
