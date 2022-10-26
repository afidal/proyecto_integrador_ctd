import React from 'react'
import { Heading } from '../../../atoms/Heading/Heading'
import { Button } from '../../../atoms/Button/Button'
import { DateRangePicker } from 'rsuite';
import { CustomProvider } from 'rsuite';
import esAR from 'rsuite/locales/es_AR';
import format from 'date-fns/format';

import 'rsuite/dist/rsuite.min.css';
import '../../DropCalendar/CalendarDrop.css';
import './DesktopCalendar.css';
import { Calendario } from '../../CalendarioNuevo/Calendario';
// 
import { ReactCalendar } from '../MuiCalendar/ReactCalendar';



export const DesktopCalendar = () => {
    ;

    // setTimeout(() => {
    //     const animation = document.getElementsByClassName("rs-anim-fade")[0];
    //     const animationFont = document.getElementsByClassName("rs-calendar-table-cell-day")[0];
    //     animationFont.classList.add("animation-desktop-font")
    //     animation.classList.add("animation-desktop-CalendarProduct");
    // }, 500)


    const { beforeToday } = DateRangePicker;

    return (
        // <div className="desktop-calendarPadre">
        //     <div className='desktop-calendar-heading'>
        //         <Heading title="h1" type="lg" variant="primary">
        //             Fechas Disponibles
        //         </Heading>
        //     </div>
        //     <div className='desktop-calendar-reserva'>
        //         <div className='desktop-calendario'>
        //             {/* <Calendario/> */}
        //             <CustomProvider locale={esAR}>
        //                 <DateRangePicker menu placement='autoVertical' open="true" disabledDate={beforeToday()} className="desktopCalendar" size="md" placeholder="Check in - Check out" showOneCalendar={false} format={"dd MMMM y"} locale={{
        //                     sunday: 'D',
        //                     monday: 'L',
        //                     tuesday: 'M',
        //                     wednesday: 'X',
        //                     thursday: 'J',
        //                     friday: 'V',
        //                     saturday: 'S',
        //                     ok: 'Aplicar',
        //                     today: 'Today',
        //                 }}
        //                     renderValue={(value) => {
        //                         return format(value[0], "dd") + " de " + format(value[0], 'MMM').toLowerCase() + ". - " + format(value[1], "dd") + " de " + format(value[1], 'MMM').toLowerCase() + "."
        //                     }}
        //                 />
        //             </CustomProvider>
        //         </div>
        //         <div className="desktop-reserva">
        //             <div className='desktop-reserva-heading'>
        //                 <Heading title="h4" type="sm" variant="primary">
        //                     Agregá tus fechas de viaje para obtener precios exactos
        //                 </Heading>
        //             </div>
        //             <div className='desktop-reserva-button'>
        //                 <Button size='base' label='Iniciar Reserva'></Button>
        //             </div>
        //         </div>

        //     </div>
        // </div >
        <div className='desktopCalendario'>
            <Heading variant='primary' type='lg' title='h3' >Fechas disponibles </Heading>
            <div className='desktopCalendario-container' >
                <ReactCalendar/>
            </div>
            
        </div>
    )
}