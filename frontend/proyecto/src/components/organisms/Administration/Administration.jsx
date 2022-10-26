import React, { useState, useEffect } from 'react'
import './Administration.css'
import { DesktopAdministration } from './Versiones/DesktopAdministration'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { urlAPI } from '../../../global.js'
import { useParams } from 'react-router-dom'
import { Error404 } from '../../pages/Error404'

export const Administration = () => {

    const { id } = useParams() 

    const [UserDataLocalStorage,setUserDataLocalStorage]=useState({})
    const [userInfo,setUserInfo]=useState({rol:UserDataLocalStorage!==null?UserDataLocalStorage.rol:undefined})

    const location=useLocation()

    useEffect(() => {
        setUserDataLocalStorage(JSON.parse(localStorage.getItem('userData'))); 
        if (JSON.parse(localStorage.getItem('userData'))!==null) {
                    setUserInfo({rol:JSON.parse(localStorage.getItem('userData')).nombre_rol})
        } 
        window.addEventListener('storage', storageEventHandler, false);

    }, [location.pathname]);

    function storageEventHandler() {
       setUserDataLocalStorage(JSON.parse(localStorage.getItem('userData')));  
    }

    const [politicas, setPoliticas] = useState([])
    const [atributosTodos, setAtributosTodos] = useState([])

    //estado para todas las politicas
    const [dataForm, setDataForm] = useState({
        descripcion: " ",
        tituloDescripcion: " ",
        precio: " ",
        longitud: " ",
        direccion: " ",
        latitud: " ",
        nombre: " ",
        ciudad: " ",
        categoria: " ",
        imagenDTOList: [],
        caracteristicasDTOList: [],
        politicaListDTO: []
    })

    const [administrationDisplayed, setAdministrationDisplayed] = useState(<DesktopAdministration />)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [atributosBD, setAtributosBD] = useState([]);
    const [saludSeguridad, setSaludSeguridad] = useState([]);
    const [politicasCancelacion, setPoliticasCancelacion] = useState([]);
    const [normasDeCasa, setNormasDeCasa] = useState([]);

    //Atributos render
    const [atributosRender, setAtributosRender] = useState([]);

    //Imágenes render
    const [imagenesRender, setImagenesRender] = useState([])

    useEffect(() => {
        axios.get(`${urlAPI}caracteristicas/todas`).then(response =>
            setAtributosBD(response.data)
        ).catch(err => console.log(err))
        
    }, [setAtributosBD])



    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
        if (windowWidth < 768) {
            setAdministrationDisplayed(<DesktopAdministration atributosTodos={atributosTodos} setAtributosTodos={setAtributosTodos} politicas={politicas} setPoliticas={setPoliticas} dataForm={dataForm} setDataForm={setDataForm} normasDeCasa={normasDeCasa} setNormasDeCasa={setNormasDeCasa} saludSeguridad={saludSeguridad} setSaludSeguridad={setSaludSeguridad} politicasCancelacion={politicasCancelacion} setPoliticasCancelacion={setPoliticasCancelacion} imagenesRender={imagenesRender} setImagenesRender={setImagenesRender} atributosRender={atributosRender} setAtributosRender={setAtributosRender} atributosBD={atributosBD} />)
        } else {
            setAdministrationDisplayed(<DesktopAdministration atributosTodos={atributosTodos} setAtributosTodos={setAtributosTodos} politicas={politicas} setPoliticas={setPoliticas} dataForm={dataForm} setDataForm={setDataForm} normasDeCasa={normasDeCasa} setNormasDeCasa={setNormasDeCasa} saludSeguridad={saludSeguridad} setSaludSeguridad={setSaludSeguridad} politicasCancelacion={politicasCancelacion} setPoliticasCancelacion={setPoliticasCancelacion} imagenesRender={imagenesRender} setImagenesRender={setImagenesRender} atributosRender={atributosRender} setAtributosRender={setAtributosRender} atributosBD={atributosBD} />)
        }
    }, [windowWidth, atributosBD, atributosRender, imagenesRender, politicasCancelacion, saludSeguridad, normasDeCasa,dataForm,politicas,atributosTodos]);
    return (
        <>
        {userInfo && userInfo.rol === "ROLE_ADMIN" ? (
        administrationDisplayed
            ) : <Error404/>}
        </>
        //
    )
}

