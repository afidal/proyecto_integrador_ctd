import React from 'react'
import { Heading } from '../../../atoms/Heading/Heading'
import { Button } from '../../../atoms/Button/Button'
import { DateRangePicker } from 'rsuite';
import { CustomProvider } from 'rsuite';
import esAR from 'rsuite/locales/es_AR';
import format from 'date-fns/format';

import 'rsuite/dist/rsuite.min.css';
import './MobileCalendar.css'


export const MobileCalendar = () => {

    const {beforeToday } = DateRangePicker;



    return(
    <div className="mobile-calendarPadre">
        <div className='mobile-calendar-heading'>
            <Heading title="h1" type="lg" variant="primary">
                Fechas Disponibles
            </Heading>
        </div>
        <div className='mobile-calendar-reserva'>
            <div className='mobile-calendario'>
                {/* <Calendario/> */}
                <CustomProvider locale={esAR}>
                    <DateRangePicker disabledDate={beforeToday()} className="mobileCalendar" placement='auto' size="md" open="true" placeholder="Check in - Check out" showOneCalendar={true} format={"d MMMM yyyy"} locale={{
                        sunday: 'D',
                        monday: 'L',
                        tuesday: 'M',
                        wednesday: 'X',
                        thursday: 'J',
                        friday: 'V',
                        saturday: 'S',
                        ok: 'Aplicar',
                        today: 'Today',
                    }} renderValue={(value) => {
                        return format(value[0], "dd") + " de " + format(value[0], 'MMM').toLowerCase() + ". - " + format(value[1], "dd") + " de " + format(value[1], 'MMM').toLowerCase() + "."
                    }} />
                </CustomProvider>
            </div>
                <div className='mobile-reserva-heading'>
                    <Heading title="h4" type="sm" variant="primary">
                        Agregá tus fechas de viaje para obtener precios exactos
                    </Heading>
                </div>
                <div className='mobile-reserva-button'>
                    <Button size='base' label='Iniciar Reserva'></Button>
                </div>

        </div>
    </div >
    )
}