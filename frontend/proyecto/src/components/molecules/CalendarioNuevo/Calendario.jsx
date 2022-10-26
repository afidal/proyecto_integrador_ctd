import React, { useState } from 'react'
import moment from 'moment';

import { CalendarioNuevo } from './Versiones/CalendarioNuevo'

export const Calendario = () =>{
    const [value, setValue] = useState(moment());

    return(
        <>
            <CalendarioNuevo value={value} onChange={setValue}/>
        </>
    )
}