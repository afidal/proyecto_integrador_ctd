import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { urlAPI } from '../../../global'
import { Icon } from '../../atoms/Icon/Icon'
import { Paragraph } from '../../atoms/paragraph/Paragraph'
import './LocationInfo.css'
export const LocationInfo = ({location,rating}) => {
    const [stars,setStars]=useState('')
    const {id}=useParams()
    useEffect(() => {
      
        axios({
          url:`${urlAPI}puntuaciones/porProducto/${id}`,
          method:'GET',
          headers:{'Content-Type':'application/json'}
        }).then(data=>{
          
          let scores=[]
          data.data.forEach(element => {
            scores.push(element.puntuacion)
          });
          let avgScore=scores.reduce((a,b)=>a+b,0)/scores.length
          // console.log(avgScore.toFixed(1));
          setStars(avgScore.toFixed(1)*2)

        })
    }, []);
    useEffect(() => {
      
    }, [stars]);
  return (
    <div className='location-info'>
        <div className='location-info-container'>
        <div className='location-info-location'>
        <Icon width='sm' icon='location' />
        <Paragraph  >{location}</Paragraph>
        </div>
        <div className='location-info-rating'>
           {
           stars<1?<div className='rating-stars'><Paragraph>Sin puntaje</Paragraph> </div>:
           stars<2?<div className='rating-stars'><Paragraph>Malo</Paragraph> <div className='stars-container'><Icon icon='star'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/></div> </div>
            :stars<=4? <div className='rating-stars'><Paragraph>Regular</Paragraph> <div className='stars-container'> <Icon icon='star'/><Icon icon='star'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/> </div></div>
            :stars<=7?<div className='rating-stars'><Paragraph>Bueno</Paragraph> <div className='stars-container' > <Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/> </div></div>
            :stars<9?<div className='rating-stars'><Paragraph>Muy Bueno</Paragraph> <div className='stars-container' > <Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='emptyStar'/></div> </div>
            :stars<=9.5?<div className='rating-stars'><Paragraph>Muy Bueno</Paragraph> <div className='stars-container' > <Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/></div> </div>
            :<div className='rating-stars'><Paragraph>Excelente</Paragraph> <div className='stars-container' > <Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/></div> </div> }
          {/* {console.log(stars)}
            {stars&&stars===1||stars===0.5&&<div className='rating-stars'><Paragraph>Malo</Paragraph> <div className='stars-container'><Icon icon='star'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/></div> </div>}
            {stars&&stars===2||stars===2.5&& <div className='rating-stars'><Paragraph>Regular</Paragraph> <div className='stars-container'> <Icon icon='star'/><Icon icon='star'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/> </div></div>}
            {stars&&stars===3||stars==3.5&& <div className='rating-stars'><Paragraph>Bueno</Paragraph> <div className='stars-container' > <Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='emptyStar'/><Icon icon='emptyStar'/> </div></div>}
            {stars&&stars==4.5 ||stars===4 && <div className='rating-stars'><Paragraph>Muy Bueno</Paragraph> <div className='stars-container' > <Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='emptyStar'/></div> </div>}
            {stars&&stars===5&& <div className='rating-stars'><Paragraph>Excelente</Paragraph> <div className='stars-container' > <Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/><Icon icon='star'/></div> </div> } */}
        <div className="product-rating-score">
            <Paragraph>{stars<1?'-':stars}</Paragraph>
        </div>
        
        </div>
        
        </div>
    </div>
  )
}
