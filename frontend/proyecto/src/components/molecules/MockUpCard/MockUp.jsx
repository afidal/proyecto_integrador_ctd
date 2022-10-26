import React from 'react'
import './MockUp.css'
export const MockUp = ({width,height,noContent}) => {
  return (
    <div  className="card is-loading">
    <div style={{width:width,height:height}} className="image"></div>
    {noContent?<div className="content">
      <h2></h2>
      <p></p>
    </div>:<></>}
  </div>
  )
}
