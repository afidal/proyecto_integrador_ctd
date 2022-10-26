import React from 'react'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import { NotLoginForm } from '../organisms/NotLogin/NotLoginForm'
import './Login.css'
import './NotLogin.css'
export const NotLogin = () => {
  return (
    <>
        <div className='wrapper'>
            <Header firstname={undefined} lastname={undefined}/>
        <div className='contenedor-pagina' >
            
        
        <NotLoginForm/>
        
        
        
        <Footer/>
        </div>
        
        </div>
    </>
  )
}

