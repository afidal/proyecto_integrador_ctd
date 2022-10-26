import React from 'react'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import { Picture } from '../atoms/Picture/Picture'
import { Paragraph } from '../atoms/paragraph/Paragraph'
import { Button } from '../atoms/Button/Button'
import './SuccessAdd.css'
import { SpacerHorizontal } from '../atoms/Spacer/SpacerHorizontal'
import { Link } from 'react-router-dom'

export const SuccessAdd = () => {

  return (

    <>
      <div className='wrapper'>
        <Header firstname={undefined} lastname={undefined} />
        <div className='contenedor-pagina' >
          <div className='successMesaggeAdd'>
            <SpacerHorizontal height={'md'} />
            <Picture image={'successbooking'} />
            <SpacerHorizontal height={'md'} />
            <Paragraph size={'lg'} >Tu alojamiento fue creado con éxito.</Paragraph>
            <SpacerHorizontal height={'md'} />
            <Link to='/' >
              <Button label='OK' ></Button>
            </Link>
            <SpacerHorizontal height={'sm'} />
          </div>
        </div>
        <Footer />
      </div>
    </>

  )
}
