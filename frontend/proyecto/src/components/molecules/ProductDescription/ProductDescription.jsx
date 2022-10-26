import React,{useEffect,useState} from 'react'
import { map } from 'rsuite/esm/utils/ReactChildren'
import { Heading } from '../../atoms/Heading/Heading'
import { Paragraph } from '../../atoms/paragraph/Paragraph'
import './ProductDescription.css'
export const ProductDescription = ({description,subtitle}) => {
    const [productDescription,setProductDescription]=useState('')
    useEffect(() => {
        setProductDescription([])
        if (description) {
            setProductDescription(description.split(/\r?\n/))
        }
    }, [description]);
    const MockUp={
        description:{
            title:'Alójate en el corazón de Buenos Aires',
            content:['Está situado a solo unas calles de la avenida Alvear, de la avenida Quintana, del parque San Martín y del distrito de Recoleta. En las inmediaciones también hay varios lugares de interés, como la calle Florida, el centro comercial Galerías Pacífico, la zona de Puerto Madero, la plaza de Mayo y el palacio Municipal.','Nuestros clientes dicen que esta parte de Buenos Aires es su favorita, según los comentarios independientes.','El Hotel es un hotel sofisticado de 4 estrellas que goza de una ubicación tranquila, a poca distancia de prestigiosas galerías de arte, teatros, museos y zonas comerciales. Además, hay WiFi gratuita.El establecimiento sirve un desayuno variado de 07:00 a 10:30.']
        }
    }
  return (
        <div className='productDescription'>
            
            <div className='productDescription-container'>
                <Heading title='h2' variant='primary' type='lg'>{subtitle}</Heading> 
                {productDescription&&productDescription.map(item=><Paragraph>{item}</Paragraph>)}
            </div>
        </div>
  )
}
