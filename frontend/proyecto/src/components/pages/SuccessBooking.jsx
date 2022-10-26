import React,{useEffect,useState} from 'react'
import {Header} from '../organisms/Header/Header'
import {Footer} from '../organisms/Footer/Footer'
import { Picture } from '../atoms/Picture/Picture'
import { Heading } from '../atoms/Heading/Heading'
import { Paragraph } from '../atoms/paragraph/Paragraph'
import { Button } from '../atoms/Button/Button'

import './SuccessBooking.css'
import { SpacerHorizontal } from '../atoms/Spacer/SpacerHorizontal'
import { Link } from 'react-router-dom'
export const SuccessBooking = () => {
  const [nombre, setNombre] = useState('');
  useEffect(() => {
    setNombre(JSON.parse(localStorage.getItem("userData")).nombre);
  }, []);
  return (
        
        <>
        <div className='wrapper'>
            <Header firstname={undefined} lastname={undefined}/>
        <div className='contenedor-pagina' >
            
        <div className='successMesagge'>
          <SpacerHorizontal height={'md'} />
            <Picture image={'successbooking'} />
            <SpacerHorizontal height={'md'} />
            <Heading title={'h3'} variant={'primary'} type='lg' >¡Muchas Gracias, {nombre} !</Heading>
            <SpacerHorizontal height={'md'} />
            <Paragraph size={'lg'} >Su reserva se ha realizado con éxito</Paragraph>
            <SpacerHorizontal height={'md'} />
            <Link to='/' >
              <Button label='OK' ></Button>
            </Link>
            <SpacerHorizontal height={'sm'} />
        </div>
        
        
        
        
        
        </div>
        <Footer/>
        </div>
    </>
    
  )
}
