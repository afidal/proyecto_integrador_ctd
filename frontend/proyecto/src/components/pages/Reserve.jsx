import React from 'react'
import { MainReserve } from '../organisms/Reserve/MainReserve'
export const Reserve = ({setFailReserve}) => {
  return (
    <div>
        <MainReserve setFailReserve={setFailReserve}/>
    </div>
  )
}
