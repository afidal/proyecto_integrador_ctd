import React, { useState, useEffect } from 'react';
import { Button } from '../../../atoms/Button/Button';
import { Heading } from '../../../atoms/Heading/Heading';
import { Input } from '../../../atoms/Input/Input';
import Label from '../../../atoms/Label/Label';
import axios from 'axios';
import { urlAPI } from '../../../../global.js'
import { SelectPickerCategories } from '../../../atoms/SelectPickerCategories/SelectPickerCategories';
import { SelectPickerPlaces } from '../../../atoms/SelectPickerPlaces/SelectPickerPlaces';
import { InputLabel } from '../../../molecules/InputLabel/InputLabel';
import './DesktopAdministration.css';
import { Icon } from '../../../atoms/Icon/Icon';
import { Checkbox } from '../../../atoms/CheckBox/Checkbox';

export const DesktopAdministration = ({ atributosTodos, setAtributosTodos, politicas, setPoliticas, dataForm, setDataForm, normasDeCasa, setNormasDeCasa, saludSeguridad, setSaludSeguridad, politicasCancelacion, setPoliticasCancelacion, atributosBD, imagenesRender, setImagenesRender, atributosRender, setAtributosRender }) => {

    //le envío al select Place
    const [places, setPlaces] = useState([]);

    //le envío al select Category
    const [categories, setCategories] = useState([]);

    //Guardo toda la info del form aquí

    const firstValidation = () => {
        if (dataForm.descripcion === " " || dataForm.latitud === " " || dataForm.longitud === " " || dataForm.nombre === " " || dataForm.ciudad === " " || dataForm.categoria === " " || dataForm.direccion === " " || dataForm.precio === " " || dataForm.tituloDescripcion === " ") {
            return false
        } else if (imagenesRender.length < 5) {
            return null
        } else {
            return true
        }
    }

    const cityValidation = () => {
        if (dataForm.ciudad === "San carlos de Bariloche") {
            dataForm.ciudad = 1
        } else if (dataForm.ciudad === "Buenos Aires") {
            dataForm.ciudad = 2
        } else if (dataForm.ciudad === "Mendoza") {
            dataForm.ciudad = 3
        } else {
            dataForm.ciudad = 4
        }
    }

    const categoryValidation = () => {
        if (dataForm.categoria === "Hoteles") {
            dataForm.categoria = 1
        } else if (dataForm.categoria === "Hostels") {
            dataForm.categoria = 2
        } else if (dataForm.categoria === "Departamentos") {
            dataForm.categoria = 3
        } else {
            dataForm.categoria = 4
        }
    }

    const descripcionLengthValidation = () => {
        if (dataForm.tituloDescripcion.length < 200) {
            return false
        } else {
            return true;
        }
    }

    const atributoNombre = document.getElementById("AtributoNombre");
    const atributoIcono = document.getElementById("AtributoIcono");
    const selectPlaceInfo = document.getElementById("selectPlace");
    const selectCategoryInfo = document.getElementById("selectCategory");
    const errorContainer = document.getElementById("errorContainer");
    const imagenURL = document.getElementById("imagenURL")
    const errorContainerAtributo = document.getElementById("errorContainerAtributo")
    const politicaNormaDeCasa = document.getElementById("normaDeCasa-info")
    const errorContainerNormaDeCasa = document.getElementById("errorContainerNormasDeCasa")
    const politicaCancelacion = document.getElementById("cancelacion-info")
    const errorContainerPoliticaCancelacion = document.getElementById("errorContainerPoliticaCancelacion")
    const politicaSaludSeguridad = document.getElementById("saludSeguridad-info")
    const errorContainerSaludSeguridad = document.getElementById("errorContainerSaludSeguridad")
    const [buttonValue, setButtonValue] = useState({ disabled: false, value: 'Crear' })
    const containerAddImagen = document.getElementById("desktopAdministracion-add-imagen")

    const postData = () => {
        setButtonValue({ value: "Creando reserva...", disabled: true })
        setDataForm((prevData) => ({ ...prevData, ciudad: selectPlaceInfo.value }))
        setDataForm((prevData) => ({ ...prevData, categoria: selectCategoryInfo.value }))
        cityValidation()
        categoryValidation()
        if (firstValidation()) {
            const data = {
                titulo: dataForm.nombre,
                titulo_descripcion: dataForm.tituloDescripcion,
                descripcion: dataForm.descripcion,
                direccion: dataForm.direccion,
                precio: dataForm.precio,
                latitud: dataForm.latitud,
                longitud: dataForm.longitud,
                politicaListDTO: politicas,
                ciudad_id: dataForm.ciudad,
                categoria_id: dataForm.categoria,
                imagenDTOList: imagenesRender,
                caracteristicasDTOList: atributosTodos
            }
            if (data.descripcion.length >= 200) {
                axios({
                    method: 'POST',
                    url: `${urlAPI}productos/agregar`,
                    data: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + JSON.parse(localStorage.getItem("jwt")),
                    },
                }).then(res => {
                }).catch(error => {
                    errorContainer.innerHTML = `Error al crear el producto, por favor intente mas tarde.`
                    setButtonValue({ value: "Crear", disabled: false })
                })
                setButtonValue({ value: "Creado", disabled: false })
                return (window.location.pathname = `/producto-exitoso`);

            } else if (data.descripcion.length < 200) {
                errorContainer.innerHTML = ` <p>
            La descripción debe tener un mínimo de 200 caracteres.
            </p>`
                setButtonValue({ value: "Crear", disabled: false })
            }
        } else if (firstValidation() == null) {
            errorContainer.innerHTML = ` <p>
            Deben ser un total de 5 imágenes.
            </p>`
            setButtonValue({ value: "Crear", disabled: false })
        } else if (!firstValidation()) {
            errorContainer.innerHTML = ` <p>
            Debes completar todos los datos que tienen un " * ".
            </p>`
            setButtonValue({ value: "Crear", disabled: false })
        }
    }

    const handleCheckboxChange = (id, checked, icono) => {
        if (checked) {
            setAtributosTodos((prevData) => [...prevData, {
                titulo: `${id}`,
                nombre_icono: `${icono}`
            }])
        }
        if (!checked) {
            setAtributosTodos((prevValue) => (prevValue.filter(item => item.titulo !== id)))
        }

    };

    const addAtribute = () => {
        if (atributoNombre.value !== "" && atributoIcono.value !== "") {
            const nombre = atributoNombre.value;
            const icono = atributoIcono.value
            setAtributosRender((prevData) => [...prevData, { nombre_icono: icono, titulo: nombre }])
            setAtributosTodos((prevData) => [...prevData, { nombre_icono: icono, titulo: nombre }])
            atributoNombre.value = "";
            atributoIcono.value = "";
            errorContainerAtributo.innerHTML = ""
        } else if (atributoNombre.value !== "") {
            errorContainerAtributo.innerHTML = ` <p>
            El ícono no pueden estar vacío
            </p>`
        } else if (atributoIcono.value !== "") {
            errorContainerAtributo.innerHTML = ` <p>
            El nombre no pueden estar vacío
            </p>`
        } else {
            errorContainerAtributo.innerHTML = ` <p>
            El nombre y el ícono no pueden estar vacíos
            </p>`
        }
    }

    if(imagenesRender.length === 5){
        containerAddImagen.classList.add("displayNone")
    }

    const addImage = () => {
        if (imagenURL.value !== "") {
            if (imagenesRender.length > 4) {
                errorContainer.innerHTML = `<p>
                Solo puede agregar hasta 5 imágenes
                </p>`
            } else {
                const urlImagen = imagenURL.value;
                setImagenesRender((prevData) => [...prevData, { url_img_producto: urlImagen, titulo_img_producto: "" }])
                imagenURL.value = ""
                errorContainer.innerHTML = ``
            }
        } else {
            errorContainer.innerHTML = `<p>
            La url no puede estar vacía
            </p>`
        }
    }

    const addNormasDeCasa = () => {
        if (politicaNormaDeCasa.value !== "") {
            if (normasDeCasa.length > 2) {
                errorContainerNormaDeCasa.innerHTML = `<p>
                Solo puedes agregar un máximo de 3 políticas.
                </p>`
            } else {
                const politicaInput = politicaNormaDeCasa.value;
                setNormasDeCasa((prevData) => [...prevData, { input: politicaInput }])
                setPoliticas((prevData) => ([...prevData, { descripcion: politicaInput, tipo_politica_id: 1 }]))
                politicaNormaDeCasa.value = ""
                errorContainerNormaDeCasa.innerHTML = ''
            }
        } else {
            errorContainerNormaDeCasa.innerHTML = `<p>
          La política no puede estar vacía.
        </p>`
        }
    }

    const addPoliticaCancelacion = () => {
        if (politicaCancelacion.value !== "") {
            if (politicasCancelacion.length > 2) {
                errorContainerPoliticaCancelacion.innerHTML = `<p>
                Solo puedes agregar un máximo de 3 políticas.
                </p>`
            } else {
                const politicaInput = politicaCancelacion.value;
                setPoliticasCancelacion((prevData) => [...prevData, { input: politicaInput }])
                setPoliticas((prevData) => ([...prevData, { descripcion: politicaInput, tipo_politica_id: 3 }]))
                politicaCancelacion.value = ""
                errorContainerPoliticaCancelacion.innerHTML = ''
            }
        } else {
            errorContainerPoliticaCancelacion.innerHTML = `<p>
          La política no puede estar vacía
        </p>`
        }
    }

    const addSaludSeguridad = () => {
        if (politicaSaludSeguridad.value !== "") {
            if (saludSeguridad.length > 2) {
                errorContainerSaludSeguridad.innerHTML = `<p>
                Solo puedes agregar un máximo de 3 políticas.
                </p>`
            } else {
                const politicaInput = politicaSaludSeguridad.value;
                setSaludSeguridad((prevData) => [...prevData, { input: politicaInput }])
                setPoliticas((prevData) => ([...prevData, { descripcion: politicaInput, tipo_politica_id: 2 }]))
                politicaSaludSeguridad.value = ""
                errorContainerSaludSeguridad.innerHTML = ''
            }
        } else {
            errorContainerSaludSeguridad.innerHTML = `
            <p>
            La política no puede estar vacía
            </p>
            `
        }
    }

    const deleteAtribute = (nombre) => {
        setAtributosRender((prevValue) => (prevValue.filter(item => item.titulo !== nombre)))
        setAtributosTodos((prevValue) => (prevValue.filter(item => item.titulo !== nombre)))
    }

    const deleteImage = (url) => {
        setImagenesRender((prevValue) => (prevValue.filter(item => item.url_img_producto !== url)))

    }

    const deleteNormasDeCasa = (input) => {
        setNormasDeCasa((prevValue) => (prevValue.filter(item => item.input !== input)))
        setPoliticas((prevData) => (prevData.filter(item => item.descripcion !== input)))
    }

    const deletePoliticaCancelacion = (input) => {
        setPoliticasCancelacion((prevValue) => (prevValue.filter(item => item.input !== input)))
        setPoliticas((prevData) => (prevData.filter(item => item.descripcion !== input)))
    }

    const deleteSaludSeguridad = (input) => {
        setSaludSeguridad((prevValue) => (prevValue.filter(item => item.input !== input)))
        setPoliticas((prevData) => (prevData.filter(item => item.descripcion !== input)))
    }

    const handleChangeDescription = (e) => {
        setDataForm(prevData => ({ ...prevData, descripcion: e.target.value }))
    }
    const handleChangeLatitud = (e) => {
        setDataForm(prevData => ({ ...prevData, latitud: e.target.value }))
    }
    const handleChangeLongitud = (e) => {
        setDataForm(prevData => ({ ...prevData, longitud: e.target.value }))
    }
    const handleChangeNombre = (e) => {
        setDataForm(prevData => ({ ...prevData, nombre: e.target.value }))
    }
    const handleChangeDireccion = (e) => {
        setDataForm(prevData => ({ ...prevData, direccion: e.target.value }))
    }
    const handleChangeTituloDescripcion = (e) => {
        setDataForm(prevData => ({ ...prevData, tituloDescripcion: e.target.value }))
    }
    const handleChangePrecio = (e) => {
        setDataForm(prevData => ({ ...prevData, precio: e.target.value }))
    }

    return (
        <div className="desktopAdministration-container">
            <div className="desktopAdministration">
                <Heading title='h4' variant='primary' type='lg' >
                    Crear Alojamiento
                </Heading>
                <div className="desktopAdministracion-add">
                    <div className="desktopAdministracion-add-name-category">
                        <div className="desktopAdministracion-add-name">
                            <InputLabel onChange={handleChangeNombre} required={true} placeholder="Hotel Hermitage " label='Nombre' disabled={false}>
                            </InputLabel>
                        </div>
                        <div className="desktopAdministracion-add-category">
                            <SelectPickerCategories categories={categories} setCategories={setCategories} />
                        </div>
                    </div>
                    <div className="desktopAdministracion-add-direccion-ciudad">
                        <div className="desktopAdministracion-add-direccion">
                            <InputLabel required={true} onChange={handleChangeDireccion} placeholder="Av. Colón 1242" label='Dirección' disabled={false}>
                            </InputLabel>
                        </div>
                        <div className="desktopAdministracion-add-ciudad">
                            <SelectPickerPlaces places={places} setPlaces={setPlaces} />
                        </div>
                    </div>
                    <div className="desktopAdministracion-add-tituloDescripcion-precio">
                        <div className="desktopAdministracion-add-tituloDescripcion">
                            <InputLabel required={true} onChange={handleChangeTituloDescripcion} placeholder="El Hotel Hermitage se encuentra a 400 metros de..." label='Título de la Descripción' disabled={false}>
                            </InputLabel>
                        </div>
                        <div className="desktopAdministracion-add-precio">
                            <InputLabel required={true} onChange={handleChangePrecio} placeholder="15.981" label='Precio por noche' disabled={false}>
                            </InputLabel>
                        </div>
                    </div>
                    <div className="desktopAdministracion-add-descripcion">
                        <div className="desktopAdministracion-add-descripcion-info">
                            <Label required={true} label='Descripción (mínimo 200 caracteres)'></Label>
                            <textarea onChange={handleChangeDescription} placeholder='El Hotel Hermitage está ubicado en Tandil, Buenos Aires, a 200 metros de la Plaza San Martín. Este hotel de 3 estrellas cuenta...' name="" id="descripcion-info" cols="30" rows="10" maxLength="1000" />
                        </div>
                    </div>
                    <div className="desktopAdministracion-add-latitud-longitud">
                        <div className="desktopAdministracion-add-latitud">
                            <InputLabel onChange={handleChangeLatitud} required={true} placeholder="Latitud" label='Latitud' disabled={false}>
                            </InputLabel>
                        </div>
                        <div className="desktopAdministracion-add-longitud">
                            <InputLabel onChange={handleChangeLongitud} required={true} placeholder="Longitud" label='Longitud' disabled={false}>
                            </InputLabel>
                        </div>
                    </div>


                    <div className="desktopAdministracion-add-agregarAtributo">
                        <Heading title='h4' variant='primary' type='md' >
                            Agregar atributos
                        </Heading>
                        <div className='desktopAdministracion-add-atributo-checkbox-container'>
                            <div className="desktopAdministracion-add-atributo-checkbox">
                                {atributosBD && atributosBD.map((atributo, index) => {
                                    return (
                                        <div key={index++} className="desktopAdministracion-atributos-checkboxs">
                                            <Checkbox
                                                id={`${atributo.titulo}`}
                                                onChange={handleCheckboxChange}
                                                icono={`${atributo.nombre_icono}`}
                                            />
                                            <Icon width='xs' icon={atributo.nombre_icono} />
                                            <Label label={atributo.titulo}></Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {atributosRender && atributosRender.map((atributo, index) => {
                            return (
                                <div key={index++} className="desktopAdministracion-add-atributo-guardado">
                                    <div className="desktopAdministracion-add-atributo-parte1y2-guardado">
                                        <div className='desktopAdministracion-add-atributo-parte1-guardado'>
                                            <InputLabel disabled={true} name={`AtributoNombreGuardado_${index}`} placeholder={atributo.titulo} label='Nombre'>
                                            </InputLabel>
                                        </div>
                                        <div className='desktopAdministracion-add-atributo-parte2-guardado'>
                                            <InputLabel disabled={true} name={`AtributoIconoGuardado_${index}`} placeholder={atributo.nombre_icono} label='Ícono'>
                                            </InputLabel>
                                        </div>
                                    </div>
                                    <div className='desktopAdministracion-add-atributo-parte3-guardado'>
                                        <Button label="X" onClick={() => deleteAtribute(atributo.titulo)} />
                                    </div>
                                </div>
                            )
                        })}
                        <div className="desktopAdministracion-add-atributo">
                            <div className="desktopAdministracion-add-atributo-parte1y2">
                                <div className='desktopAdministracion-add-atributo-parte1'>
                                    <InputLabel
                                        name="AtributoNombre" placeholder="Wifi" label='Nombre' disabled={false}>
                                    </InputLabel>
                                </div>
                                <div className='desktopAdministracion-add-atributo-parte2'>
                                    <InputLabel
                                        name="AtributoIcono" placeholder="fa-wifi" label='Ícono' disabled={false}>
                                    </InputLabel>
                                </div>
                            </div>
                            <div className='desktopAdministracion-add-atributo-parte3'>
                                <Button label="+"
                                    onClick={addAtribute} />
                            </div>
                        </div>
                        <div className="desktop-errorContainerAtributo" id="errorContainerAtributo">

                        </div>
                    </div>
                    <div className="desktopAdministracion-add-politicas">
                        <Heading title="h1" variant={"primary"} type="md">
                            Políticas del Producto
                        </Heading>
                        <div className="desktopAdministracion-politicas">
                            <div className="add-politicas-normas">
                                <Heading title='h4' variant='primary' type='md' >
                                    Normas de la Casa
                                </Heading>
                                {normasDeCasa && normasDeCasa.map((politica, index) => {
                                    return (
                                        <div key={index++} className="mobile-add-politicas-guardado">
                                            <div className='mobile-add-politica-parte1-guardado'>
                                                <InputLabel disabled={true} name={`normaDeCasa_${index}`} placeholder={politica.input}>
                                                </InputLabel>
                                            </div>
                                            <div className='mobile-add-politica-parte2-guardado'>
                                                <Button label="X" onClick={() => deleteNormasDeCasa(politica.input)} />
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="mobile-add-normaDeCasa">
                                    <div className='mobileAdministracion-add-normaDeCasa-parte1'>
                                        <Label label='Descripción'></Label>
                                        <textarea placeholder='Escriba aquí' name="" id="normaDeCasa-info" cols="30" rows="2" />
                                    </div>
                                    <div className='mobileAdministracion-add-normaDeCasa-parte2'>
                                        <Button id="buttonAdd" label="+" onClick={addNormasDeCasa} />
                                    </div>
                                </div>
                                <div className="errorContainer" id="errorContainerNormasDeCasa">
                                </div>
                            </div>
                            <div className="add-politicas-saludyseguridad">
                                <Heading title='h4' variant='primary' type='md' >
                                    Salud y Seguridad
                                </Heading>
                                {saludSeguridad && saludSeguridad.map((politica, index) => {
                                    return (
                                        <div key={index++} className="mobile-add-politicas-guardado">
                                            <div className='mobile-add-politica-parte1-guardado'>
                                                <InputLabel disabled={true} name={`normaDeCasa_${index}`} placeholder={politica.input}>
                                                </InputLabel>
                                            </div>
                                            <div className='mobile-add-politica-parte2-guardado'>
                                                <Button label="X" onClick={() => deleteSaludSeguridad(politica.input)} />
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="mobile-add-saludSeguridad">
                                    <div className='mobileAdministracion-add-saludSeguridad-parte1'>
                                        <Label label='Descripción'></Label>
                                        <textarea placeholder='Escriba aquí' name="" id="saludSeguridad-info" cols="30" rows="2" />
                                    </div>
                                    <div className='mobileAdministracion-add-saludSeguridad-parte2'>
                                        <Button id="buttonAdd" label="+" onClick={addSaludSeguridad} />
                                    </div>
                                </div>
                                <div className="errorContainer" id="errorContainerSaludSeguridad">
                                </div>
                            </div>
                            <div className="add-politicas-cancelacion">
                                <Heading title='h4' variant='primary' type='md' >
                                    Políticas de Cancelación
                                </Heading>
                                {politicasCancelacion && politicasCancelacion.map((politica, index) => {
                                    return (
                                        <div key={index++} className="mobile-add-politicas-guardado">
                                            <div className='mobile-add-politica-parte1-guardado'>
                                                <InputLabel disabled={true} name={`normaDeCasa_${index}`} placeholder={politica.input}>
                                                </InputLabel>
                                            </div>
                                            <div className='mobile-add-politica-parte2-guardado'>
                                                <Button label="X" onClick={() => deletePoliticaCancelacion(politica.input)} />
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="mobile-add-politicasCancelacion">
                                    <div className='mobileAdministracion-add-politicaCancelacion-parte1'>
                                        <Label label='Descripción'></Label>
                                        <textarea placeholder='Escriba aquí' name="" id="cancelacion-info" cols="30" rows="2" />
                                    </div>
                                    <div className='mobileAdministracion-add-politicaCancelacion-parte2'>
                                        <Button id="buttonAdd" label="+" onClick={addPoliticaCancelacion} />
                                    </div>
                                </div>
                                <div className="errorContainer" id="errorContainerPoliticaCancelacion">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="desktopAdministracion-add-cargarImagen">
                        <Heading required={true} title='h4' variant='primary' type='md' >
                            Cargar imágenes
                        </Heading>
                        {imagenesRender && imagenesRender.map((imagen, index) => {
                            return (
                                <div key={index++} className="mobileAdministracion-add-imagen-cargada">
                                    <div className='mobileAdministracion-add-imagen-parte1-cargada'>
                                        <Input disabled={true} required={true} name={`imagenURLGuardada_${index}`} placeholder={imagen.url_img_producto}>
                                        </Input>
                                    </div>
                                    <div className='mobileAdministracion-add-imagen-parte2-cargada'>
                                        <Button id={`deleteImage_${index}`} label="X" onClick={() => deleteImage(imagen.url_img_producto)} />
                                    </div>
                                </div>
                            )
                        })}
                        <div id="desktopAdministracion-add-imagen" className="desktopAdministracion-add-imagen">
                            <div className='desktopAdministracion-add-imagen-parte1'>
                                <Input required={true} name="imagenURL" placeholder="Insertar https://">
                                </Input>
                            </div>
                            <div className='desktopAdministracion-add-imagen-parte2'>
                                <Button label="+" onClick={addImage} />
                            </div>
                        </div>
                    </div>

                    <div className="errorContainer" id="errorContainer">

                    </div>
                    <div className='desktopAdminsitracion-add-button'>
                        <Button label={buttonValue.value}
                            disabled={buttonValue.disabled}
                            onClick={postData} />
                    </div>
                </div>
            </div>


        </div>
    )
}
