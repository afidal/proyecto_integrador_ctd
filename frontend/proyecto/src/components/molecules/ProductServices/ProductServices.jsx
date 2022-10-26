import React,{useState,useEffect} from 'react'
import { Heading } from '../../atoms/Heading/Heading'
import { Icon } from '../../atoms/Icon/Icon'
import { Paragraph } from '../../atoms/paragraph/Paragraph'
import './ProductServices.css'
export const ProductServices = ({services}) => {
    
    const MockUp={
        services:{
            services:['kitchen','airConditioner','parking','wifi','television','pets']
        }
    }
    const [serviceList,setServiceList]=useState([])
    useEffect(() => {
        if (services) {
            setServiceList([])
            services.forEach(element => {
                setServiceList((prevValue)=>{         
                        
                        return [...prevValue,{icon:element.nombre_icono.toLowerCase(),service:element.titulo}]
                    })
            });
        }
    }, [services]);
  return (
    <div className='productServices'>
   
        <div className='productServices-container'>
        <Heading title='h2' type='lg' variant='primary'  >¿Qué ofrece este lugar?</Heading>
        </div>
        <hr/>
        <div className="productServices-container">
            <div className='productServices-services'>

            {serviceList&&serviceList.map((service)=><div className='service-description'><Icon width='sm' icon={service.icon} /><Paragraph>{service.service}</Paragraph></div>)}
        </div>
        
        
        </div>
    </div>
  )
}
