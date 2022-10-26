import React from 'react'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import { LoginForm } from '../organisms/Login/LoginForm' 
import './Login.css'
export const Login = ({failReserve,setFailReserve}) => {
  return (
    <>
        <div className='wrapper'>
            <Header firstname={undefined} lastname={undefined}/>
        <div className='contenedor-pagina' >
            
        
        <LoginForm setFailReserve={setFailReserve} failReserve={failReserve}/>
        
        
        
        <Footer/>
        </div>
        
        </div>
    </>
  )
}

