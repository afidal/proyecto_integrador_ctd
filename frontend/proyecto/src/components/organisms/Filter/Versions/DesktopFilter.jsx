import React from 'react'
import './DesktopFilter.css'
import { DropPlaces } from '../../../molecules/DropPlaces/DropPlaces'
import { Heading } from '../../../atoms/Heading/Heading'
import { Button } from '../../../atoms/Button/Button'
import { SpacerHorizontal } from '../../../atoms/Spacer/SpacerHorizontal'
import { CalendarDrop } from '../../../molecules/DropCalendar/CalendarDrop'
import { urlAPI } from '../../../../global.js';

export const DesktopFilter = ({ setReRender,setFilterTitle, setCurrentPage, lugarInput, setLugarInput, startDate, endDate, setFilterProducts, setStartDate, setEndDate }) => {

  const scroll = () => {
    // window.scrollTo({ top: 480, behavior: 'smooth' });
    setCurrentPage(1);
  };


  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      let ciudadId = undefined;

      var axios = require('axios');


      if (startDate.startsWith("20") === true && endDate.startsWith("20") === true && lugarInput === "San Carlos de Bariloche") {
        ciudadId = 1;
        setFilterProducts([])
        axios({
          method: "POST",
          url: `${urlAPI}productos/disponibles/porCiudadYFecha`,
          data: ({
            "fechaInicioReserva": `${startDate}`,
            "fechaFinReserva": `${endDate}`,
            "id_ciudad": ciudadId,
          })
        })
          .then((response) => {
            setReRender(prevValue=>prevValue+1);
            setTimeout(() => setFilterProducts(response.data), 300);
          })

        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina entre las fechas " + startDate + " y " + endDate + ":");
        scroll()

      } else if (startDate.startsWith("20") === true && endDate.startsWith("20") === true && lugarInput === 'Buenos Aires') {
        ciudadId = 2;
        setFilterProducts([])
        axios({
          method: "POST",
          url: `${urlAPI}productos/disponibles/porCiudadYFecha`,
          data: ({
            "fechaInicioReserva": `${startDate}`,
            "fechaFinReserva": `${endDate}`,
            "id_ciudad": ciudadId,
          })
        })
          .then((response) => {
            setReRender((prevValue) => prevValue + 1);
            setTimeout(() => setFilterProducts(response.data), 500);
          })
        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina entre las fechas " + startDate + " y " + endDate + ":");
        scroll()

      } else if (startDate.startsWith("20") === true && endDate.startsWith("20") === true && lugarInput === 'Mendoza') {
        ciudadId = 3;
        setFilterProducts([])
        axios({
          method: "POST",
          url: `${urlAPI}productos/disponibles/porCiudadYFecha`,
          data: ({
            "fechaInicioReserva": `${startDate}`,
            "fechaFinReserva": `${endDate}`,
            "id_ciudad": ciudadId,
          })
        })
          .then((response) => {
            setReRender((prevValue) => prevValue + 1);
            setTimeout(() => setFilterProducts(response.data), 500);
          })
        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina entre las fechas " + startDate + " y " + endDate + ":");
        scroll()

      } else if (startDate.startsWith("20") === true && endDate.startsWith("20") === true && lugarInput === 'Córdoba') {
        ciudadId = 4;
        setFilterProducts([])
        axios({
          method: "POST",
          url: `${urlAPI}productos/disponibles/porCiudadYFecha`,
          data: ({
            "fechaInicioReserva": `${startDate}`,
            "fechaFinReserva": `${endDate}`,
            "id_ciudad": ciudadId,
          })
        })
          .then((response) => {
            setReRender((prevValue) => prevValue + 1);
            setTimeout(() => setFilterProducts(response.data), 500);
          })
        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina entre las fechas " + startDate + " y " + endDate + ":");

        scroll()

      } else if (lugarInput === 'San Carlos de Bariloche') {
        ciudadId = 1
        
        setFilterProducts([])
        axios.get(`${urlAPI}productos/porCiudad/${ciudadId}`).then(data =>{setReRender(prevValue=>prevValue+1); return setTimeout(() => setFilterProducts(data.data), 400);})
        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina:")
        scroll()
      }
      else if (lugarInput === 'Buenos Aires') {
        ciudadId = 2;
        
        setFilterProducts([])
        axios.get(`${urlAPI}productos/porCiudad/${ciudadId}`).then(data => {setReRender(prevValue=>prevValue+1);return setTimeout(() => setFilterProducts(data.data), 400);;})
        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina:")
        scroll()
      }
      else if (lugarInput === 'Mendoza') {
        ciudadId = 3;
        
        setFilterProducts([])
        axios.get(`${urlAPI}productos/porCiudad/${ciudadId}`).then(data => {
          setReRender((prevValue) => prevValue + 1);
          return setTimeout(() => setFilterProducts(data.data), 500);;
        })
        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina:")
        scroll()

      }
      else if (lugarInput === 'Córdoba') {
        ciudadId = 4;
        
        setFilterProducts([])
        axios.get(`${urlAPI}productos/porCiudad/${ciudadId}`).then(data => {
          setReRender((prevValue) => prevValue + 1);
          return setTimeout(() => setFilterProducts(data.data), 500);;
        })
        setFilterTitle("Disponibles en la ciudad de " + lugarInput + ", Argentina:")
        scroll()

      }
      else if (startDate.startsWith("20") === true && endDate.startsWith("20") === true) {
        axios({
          method: "POST",
          url: `${urlAPI}productos/disponibles/porFecha/`,
          data: ({
            "fechaInicioReserva": `${startDate}`,
            "fechaFinReserva": `${endDate}`
          })
        })
          .then((response) => {
            setReRender(prevValue=>prevValue+1)
            setTimeout(() => setFilterProducts(response.data), 500);
          })
        setFilterTitle("Disponibles entre " + startDate + " y " + endDate + ":")
        scroll()

      } else {
        axios.get(`${urlAPI}productos/todos`).then(data => {
          setReRender((prevValue) => prevValue + 1);
          setTimeout(() => setFilterProducts(data.data),500);
          
        })
        setFilterTitle("Recomendaciones")
        scroll()

      }
    } catch (e) {
      setLugarInput('')
      setEndDate('')
      setStartDate('')
      setFilterProducts([])
    }

  }

  return (
    <div className='desktop-filter-container'>

      <div className='desktop-filter-container-content'>
        <Heading variant='base' type='xl'  >Busca ofertas en hoteles, casas y mucho más</Heading>
        <SpacerHorizontal height='sm' />
        <form onSubmit={handleSubmit}>
          <div className='desktop-filters-button'>
            <DropPlaces lugarInput={lugarInput} setLugarInput={setLugarInput} placeholder='¿A donde vamos?' icon='location' />
            <div style={{ width: '40%' }} >
              <CalendarDrop startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            </div>
            <Button type='submit' size='base' label='Buscar'></Button>
          </div>
        </form>
      </div>
    </div>
  )
}

