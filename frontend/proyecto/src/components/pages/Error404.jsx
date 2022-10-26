import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import './Error404.css'
import Error404Imagen from '../utils/images/tukimejorado.png'

export const Error404 = () => {
    return (
        <div className="error404-container">
            <Header />

            <div className="error404">
                <div className='error404-primeraParte-mobile'>
                    <div className="error404-mobile-h1">
                        <h1>¡No te preocupes!</h1>
                    </div>
                </div>
                <div className="error404-primeraParte">
                    <div className="error404-img">
                        <img src={Error404Imagen} alt="error404" />
                    </div>
                </div>

                <div className="error404-segundaParte">
                    <div className="error404-perdon">
                        <h1> ¡No te preocupes! </h1>
                    </div>

                    <div className="error404-mensaje">
                        <div className="error404-mensaje-1">
                            <h3>¡Es solo un error 404!</h3>
                        </div>
                        <div className="error404-mensaje-2">
                            <h3>Prueba volviendo a la principal</h3>
                        </div>
                    </div>
                    <div className="error404-link">
                        <Link to={"/"}>
                            <h5>Ir a la página principal</h5>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
