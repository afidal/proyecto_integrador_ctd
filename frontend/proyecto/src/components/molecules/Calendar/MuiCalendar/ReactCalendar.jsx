import React,{useState,useEffect} from 'react'
import { DesktopReactCalendar } from './Versiones/DesktopReactCalendar'
import { TabletReactCalendar } from './Versiones/TabletReactCalendar'
import { MobileReactCalendar } from './Versiones/MobileReactCalendar'
import moment from 'moment'


export const ReactCalendar = (props) => {
    
    const [reservedDatesL,setReservedDatesL]=useState([])
    const [calendarDisplayed,setCalendarDisplayed]=useState(<DesktopReactCalendar reservedDates={reservedDatesL}/>)
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    useEffect(() => {
        setReservedDatesL([])
        if(props.reservedDates){
            props.reservedDates.forEach(element => {
                setReservedDatesL(prevDates=>[...prevDates,{fechaInicio: parseDates(element.fechaInicioReserva) ,fechaFin: parseDates(element.fechaFinReserva) }])
            });
        }
    }, [props.reservedDates]);
    useEffect(() => {
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
        if(windowWidth <= 768){
            setCalendarDisplayed(
              <MobileReactCalendar
                setFailReserve={props.setFailReserve}
                reservedDates={reservedDatesL}
              />
            );
        }
        else if(windowWidth<1366){
            setCalendarDisplayed(
              <TabletReactCalendar
                setFailReserve={props.setFailReserve}
                reservedDates={reservedDatesL}
              />
            );
        }
        else if(windowWidth>=1366){
            setCalendarDisplayed(
              <DesktopReactCalendar
                setFailReserve={props.setFailReserve}
                reservedDates={reservedDatesL}
              />
            );

        }
        
    },[windowWidth,reservedDatesL]);
    function parseDates(date){
        let newDate;
        let month;
        let day;
        let year;
        newDate=date.split(/[.\-=/_]/)
        if (newDate[1][0]==='0') {
            month=newDate[1][1]
        }
        else{
            month=newDate[1]
        }
        if (newDate[2][0]==='0' && newDate[2][1]==='1' ) {
            day=newDate[2][1]
        }
        else if(newDate[2][0]==='0'){
            day=newDate[2][1]-1
        }
        else{
            day=newDate[2]-1
        }
        
        newDate=newDate[0]+","+month+","+day
        // console.log(newDate);
        return newDate
    }
    
    
    // console.log(reservedDatesL[0]&&Date.parse(reservedDatesL[0].fechaInicio).toString('yyyy/mm/dd'));
    return (
      //
      <div className="desktop-reserveCalendar">
        {/* <Heading title="h2" variant={"primary"} type="lg">
          Seleccioná tu fecha de reserva
        </Heading> */}
        {/* <SpacerHorizontal height={"md"} /> */}
        <div className="desktop-reserveCalendar-container">
          <div className="desktop-reserveCalendar-calendar">{calendarDisplayed}</div>
        </div>
      </div>
    );
}
