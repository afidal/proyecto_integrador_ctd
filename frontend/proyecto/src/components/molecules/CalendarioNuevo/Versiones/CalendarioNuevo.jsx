import React, { useState, useEffect } from 'react';
import './CalendarioNuevo.css';
import { Icon } from '../../../atoms/Icon/Icon'

import { buildCalendar, buildCalendarSecond } from './build';
import dayStyles, { beforeToday } from './styles';

export const CalendarioNuevo = ({value, onChange}) => {
    const [calendarios, setMeses] = useState([]);
    const [calendar, setCalendar] = useState([]);
    const [calendarSecond, setCalendarSecond] = useState([]);

    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    useEffect(() => {
        setCalendar(buildCalendar(value));
        setCalendarSecond(buildCalendarSecond(value))
    }, [value]);

    function currMonthName() {
        return value.format("MMMM")
    }

    function prevMonth() {
        return value.clone().subtract(1, 'month');
    }

    function nextMonth() {
        return value.clone().add(1, "month");
    }

    return (
        <>
            <div className="calendarioTODO">
                <div className="flecha flechaBackward">
                    <div className="flecha-icon" onClick={() => onChange(prevMonth())}>
                        {<Icon icon="back" width="md" onClick={() => { }}></Icon>}
                    </div>
                </div>
                <div className="calendarioPrimero">
                    <div className='header'>
                        <div className="month">{currMonthName()}
                        </div>
                    </div>
                    <div className='body'>
                        <div className="day-names">
                            {
                                ["D", "L", "M", "X", "J", "V", "S"].map((d) => (
                                    <div className="week">{d}</div>
                                ))
                            }
                        </div>
                        {calendar.map((week) => (
                            <div>
                                {week.map((day) => (
                                    <div className='calendarioPrimero-day' onClick={() => !beforeToday(day) && onChange(day)}>
                                        <div className={dayStyles(day, value)}>
                                            {day.format("D").toString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lineaMedio">
                    <div className="lineaDelMedio"></div>
                </div>
                <div className="calendarioPrimero">
                <div className='header'>
                        <div className="month">{currMonthName()}
                        </div>
                    </div>
                    <div className='body'>
                        <div className="day-names">
                            {
                                ["D", "L", "M", "X", "J", "V", "S"].map((d) => (
                                    <div className="week">{d}</div>
                                ))
                            }
                        </div>
                        {calendarSecond.map((week) => (
                            <div>
                                {week.map((day) => (
                                    <div className='calendarioPrimero-day' onClick={() => !beforeToday(day) && onChange(day)}>
                                        <div className={dayStyles(day, value)} onClick>
                                            {day.format("D").toString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flecha flechaForward">
                    <div className="flecha-icon" onClick={() => onChange(nextMonth())}>
                        <Icon icon="forward" width="md" onClick={() => { }}></Icon>
                    </div>
                </div>
            </div>
        </>
    )
}