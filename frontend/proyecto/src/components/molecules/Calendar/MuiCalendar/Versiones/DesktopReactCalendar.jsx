import React from 'react'
import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { Button } from '../../../../atoms/Button/Button';
import { Heading } from '../../../../atoms/Heading/Heading';
import './DesktopReactCalendar.css'
import '../ReactCalendar.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setDate } from 'rsuite/esm/utils/dateUtils';
export const DesktopReactCalendar = (props) => {
    const navigation=useNavigate()
    const {id}=useParams()
    registerLocale('es', es)
    const [dateRange, setDateRange] = useState([null,null]);
    const [startDate, endDate] = dateRange;
    const [arrayDaysReserve, setArrayDaysReserve] = useState([]);
    const [reservedDatesArray,setReservedDatesArray]=useState([])
    const onChange = (dates) => {
        
            setDateRange(dates);
            
    }
   
        
        // setDateRange([ JSON.parse(localStorage.getItem('dates'))[0], JSON.parse(localStorage.getItem('dates'))[1]]);
    useEffect(() => {
      // console.log('ENTROOOO');
      // console.log( JSON.parse(localStorage.getItem('dates')));
      if (JSON.parse(localStorage.getItem("dates"))) {
        setDateRange([
          new Date(JSON.parse(localStorage.getItem("dates"))[0]),
          new Date(JSON.parse(localStorage.getItem("dates"))[1]),
        ]);
      }
    }, []);

    useEffect(() => {
        
        if (props.reservedDates) {
           
            props.reservedDates.forEach(element => {
            createReservedDaysArray(element.fechaInicio,element.fechaFin)
        });
        }
        
        
    }, [props.reservedDates]);
    function createReservedDaysArray(startDate,endDate){
        let aux=[]
        let loop= new Date(startDate)
        let end=new Date(endDate)
        while(loop <= end){
            aux.push(loop)         
            var newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
}
    
    return setReservedDatesArray(prevDates=>[...prevDates.concat(aux)])
    }
    
    function editNamesDaysWeek() {
        const namesDaysWeek = document.querySelectorAll(".react-datepicker__day-name");
        namesDaysWeek.forEach(name => {
            name.innerHTML = name.textContent.substring(0, 1).toUpperCase();
        })
    }
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("dates"))) {
          setDateRange([
            new Date(JSON.parse(localStorage.getItem("dates"))[0]),
            new Date(JSON.parse(localStorage.getItem("dates"))[1]),
          ]);
        }
    }, []);
     useEffect(() => {
        editNamesDaysWeek();
        let dateStart = new Date(startDate);
        let dateEnd = new Date(endDate);
        
    }, [startDate, endDate])

    const handleStartBooking=()=>{
        localStorage.setItem("dates", JSON.stringify(dateRange));
        if (localStorage.getItem("userData")) {
            
          navigation("reserva");
        } else {
            localStorage.setItem("lastProduct", JSON.stringify(id));
            props.setFailReserve(true);
            navigation("/login");
        }
    }
    return (
      <div className="desktop-calendarReserve">
        <div className="desktop-calendarReserve-container">
          <div className="desktop-calendarReserve-title">
            <Heading title="h3" type="lg" variant="primary">
              Fechas disponibles
            </Heading>
          </div>

          <>
            <DatePicker
              inline
              locale="es"
              excludeDates={reservedDatesArray}
              minDate={new Date()}
              dateFormat="dd MMM."
              renderCustomHeader={({
                monthDate,
                customHeaderCount,
                decreaseMonth,
                increaseMonth,
              }) => (
                <div>
                  <button
                    aria-label="Previous Month"
                    className={
                      "react-datepicker__navigation react-datepicker__navigation--previous"
                    }
                    style={
                      customHeaderCount === 1 ? { visibility: "hidden" } : null
                    }
                    onClick={decreaseMonth}
                  >
                    <span
                      className={
                        "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                      }
                    >
                      {"<"}
                    </span>
                  </button>
                  <span className="react-datepicker__current-month">
                    {monthDate
                      .toLocaleString("es-ES", {
                        month: "long",
                      })
                      .substring(0, 1)
                      .toUpperCase() +
                      monthDate
                        .toLocaleString("es-ES", { month: "long" })
                        .slice(1)}
                  </span>
                  <button
                    aria-label="Next Month"
                    className={
                      "react-datepicker__navigation react-datepicker__navigation--next"
                    }
                    style={
                      customHeaderCount === 0 ? { visibility: "hidden" } : null
                    }
                    onClick={increaseMonth}
                  >
                    <span
                      className={
                        "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                      }
                    >
                      {">"}
                    </span>
                  </button>
                </div>
              )}
              startDate={startDate}
              endDate={endDate}
              selected={startDate}
              selectsRange={true}
              onChange={onChange}
              monthsShown={2}
              
            />
          </>

          <div className="start-booking">
            <div className="start-booking-container">
              <h4>Agrega tus fechas de viaje para obtener precios exactos </h4>

              <Button onClick={handleStartBooking} label="Iniciar reserva">
                {" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
