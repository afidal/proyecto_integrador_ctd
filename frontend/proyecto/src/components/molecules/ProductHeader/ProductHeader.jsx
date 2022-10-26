import React from 'react'
import { Link,useLocation, useParams } from "react-router-dom";
import { Heading } from '../../atoms/Heading/Heading'
import { Icon } from '../../atoms/Icon/Icon'
import product1 from '../../utils/images/productImg1.png'
import product2 from '../../utils/images/productImg2.png'
import product3 from '../../utils/images/productImg3.png'
import product4 from '../../utils/images/productImg4.png'
import product5 from '../../utils/images/productImg5.png'

import './ProductHeader.css'
export const ProductHeader = ({category,title}) => {
    let location=useLocation().pathname.slice(-7)
    
    const {id}=useParams()
    
  return (
    <div className='product-header'>
        <div className='product-header-container'>
        <div className='product-header-title'>
        <Heading title='h4' variant='primary' type='xs' >{category}</Heading>
        <Heading title='h2' variant='base' type='lg' >{title}</Heading>
        </div>
        
            <Link to={location==='reserva'?`/productos/${id}`:'/'}>
                <Icon icon='back' />
            </Link>
            
            
        
            
       
        </div>
    </div>
  )
}
