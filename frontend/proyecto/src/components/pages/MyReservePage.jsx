import React, { useEffect, useState } from 'react'
import './MyReservePage.css'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import { MisReservas } from '../organisms/MisReservas/MisReservas'


export const MyReservePage = () => {

  const [showFooter,setShowFooter]=useState(false)
  useEffect(() => {
    
    setTimeout(()=>setShowFooter(true),2500)
  }, []);

  return (
    <>
      <div className="wrapper misReservas">
        <Header firstname={undefined} lastname={undefined} />
        <div className="reservePage">
          <MisReservas />
        </div>
        {showFooter && <Footer />}
      </div>
    </>
  );
}
