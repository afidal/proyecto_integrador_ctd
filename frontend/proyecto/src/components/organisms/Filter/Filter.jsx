import React,{useState,useEffect} from 'react'
import { DesktopFilter } from './Versions/DesktopFilter'
import { TabletFilter } from './Versions/TabletFilter'
import { MobileFilter } from './Versions/MobileFilter'

export const Filter = ({setFilterTitle,setCurrentPage,setFilterProducts,setReRender,reRender}) => {
    const [lugarInput,setLugarInput]=useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate, setEndDate] =  useState('')
    const [filterDisplayed,setFilterDisplayed]=useState('')
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    

    useEffect(() => {
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
        if(windowWidth <= 768){
            setFilterDisplayed(
              <MobileFilter
                setReRender={setReRender}
                setFilterTitle={setFilterTitle}
                setFilterProducts={setFilterProducts}
                lugarInput={lugarInput}
                setLugarInput={setLugarInput}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            );
        }
        else if(windowWidth<1365){
            setFilterDisplayed(
              <TabletFilter
                setReRender={setReRender}
                setFilterTitle={setFilterTitle}
                setFilterProducts={setFilterProducts}
                lugarInput={lugarInput}
                setLugarInput={setLugarInput}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            );
        }
        else if(windowWidth>=1366){
            setFilterDisplayed(
              <DesktopFilter
                setReRender={setReRender}
                setFilterTitle={setFilterTitle}
                setCurrentPage={setCurrentPage}
                setFilterProducts={setFilterProducts}
                lugarInput={lugarInput}
                setLugarInput={setLugarInput}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            );
        }
        
    },[windowWidth,lugarInput,startDate,endDate, setEndDate, setStartDate,setFilterProducts,setCurrentPage,setReRender]);




    return (
        <>
        {filterDisplayed}
        </>
    )
}

