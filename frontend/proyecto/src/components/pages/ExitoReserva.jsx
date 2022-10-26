import React from 'react'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import { ReservaExitosa } from '../molecules/ReservaExitosa/ReservaExitosa'

import './ExitoReserva.css'
export const ExitoReserva = () => {

    return (
        <>
            <div className='wrapper'>
                <Header firstname={undefined} lastname={undefined} />
                <div className='contenedor-pagina-reserva-exitosa' >


                    <ReservaExitosa />

                    <Footer />
                </div>
            </div>
        </>
    )
}
