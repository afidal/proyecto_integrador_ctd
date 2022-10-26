import React, { useState, useEffect } from 'react'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import { ProductoReserva } from '../organisms/Reserva/ProductoReserva'
import {ProductHeader} from '../molecules/ProductHeader/ProductHeader'
import axios from 'axios';
import { urlAPI } from '../../global.js';
import { useParams } from "react-router-dom";



export const Reserva = () => {

  const { id } = useParams()
  const [productData, setProductData] = useState({});
  const [categoria, setCategoria] = useState('cargando');
  const [titulo, setTitulo] = useState('cargando');
  const [imagen, setImagen] = useState('cargando');
  const [locationData, setLocationData] = useState('cargando');

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${urlAPI}productos/${id}`).then(data => {
      console.log(data.data.categoria_id);
      setCategoria(data.data.categoria_id === 1 ? 'Hoteles' : data.data.categoria_id == 2 ? 'Hosteles' : data.data.categoria_id === 3 ? 'Departamentos' : 'Bed & Breakfast')
      setLocationData(data.data.ciudad_id === 1 ? 'San Carlos de Bariloche, Río Negro, Argentina' : data.data.ciudad_id === 2 ? 'Buenos Aires, Ciudad Autónoma de Buenos Aires, Argentina' : data.data.ciudad_id === 3 ? 'Mendoza, Mendoza, Argentina' : 'Córdoba, Córdoba, Argentina')
      setTitulo(data.data.titulo)
      setProductData(data.data)
      setImagen(data.data.imagenDTOList[0].url_img_producto)
      data.send(data.data)
    })

  }, [id]);

  return (
    <>
      <Header firstname={undefined} lastname={undefined} />
      <ProductHeader category={categoria} title={titulo}/>
      <ProductoReserva titulo={titulo} imagen={imagen} location={locationData} categoria={categoria} data={productData} />
      <Footer />

    </>
  )
}

