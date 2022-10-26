import React,{useEffect} from 'react'
import {Select} from 'antd'

import { Paragraph } from '../../atoms/paragraph/Paragraph'
import { Icon } from '../../atoms/Icon/Icon'
import { Heading } from '../../atoms/Heading/Heading'
import { SpacerHorizontal } from '../../atoms/Spacer/SpacerHorizontal'
import { SelectPicker } from '../../atoms/SelectPicker/SelectPicker'
import './CheckInReserve.css'

export const CheckInReserve = ({submitData,setSubmitData}) => {

 
    useEffect(() => {
      if (submitData) {
       console.log(submitData.horaEstimadaDeLlegada)
       
      }
    }, [submitData]);
  return (
    <div className='checkIn' >
        
        <Heading variant={'primary'} type='lg' title='h2' >Tu horario de llegada</Heading>
        <SpacerHorizontal height={'md'} />
        <div className='checkIn-container'>
            <SpacerHorizontal height={'md'} />
            <div className='checkIn-content' >
            <div className='checkIn-info' >
                <Icon icon='seguridad' width={'sm'} />
                <Paragraph>Tu habitación va a estar lista para el check-in entre las <span>10:00 AM</span> y las <span>11:00 PM</span></Paragraph>
            </div>
            <SpacerHorizontal height={'sm'} />
            <SelectPicker setSelectValue={setSubmitData} />
        </div>
        <SpacerHorizontal height={'md'} />
        </div>
    </div>
  )
}
