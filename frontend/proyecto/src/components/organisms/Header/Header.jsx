import React,{useState,useEffect,createContext} from 'react'
import PropTypes from 'prop-types'
import { DesktopHeader } from './Versions/DesktopHeader'
import { TabletHeader } from './Versions/TabletHeader'
import { MobileHeader } from './Versions/MobileHeader'
import { useLocation } from 'react-router-dom'
export const Header = ({}) => {

    
    const [UserDataLocalStorage,setUserDataLocalStorage]=useState({})
    const location=useLocation()
    

    useEffect(() => {
        //console.log("Toolbar hi from useEffect")
        //console.log(JSON.parse(localStorage.getItem('userData')));
        setUserDataLocalStorage(JSON.parse(localStorage.getItem('userData'))); 
        if (JSON.parse(localStorage.getItem('userData'))!==null) {
                    setUserInfo({firstname:JSON.parse(localStorage.getItem('userData')).nombre,lastname:JSON.parse(localStorage.getItem('userData')).apellido,rol:JSON.parse(localStorage.getItem('userData')).nombre_rol})
        } 
        window.addEventListener('storage', storageEventHandler, false);

    }, [location.pathname]);

    function storageEventHandler() {
        //console.log("hi from storageEventHandler")
        //console.log(JSON.parse(localStorage.getItem('userData')));
       setUserDataLocalStorage(JSON.parse(localStorage.getItem('userData')));  
    }

    // function testFunc() {  
    //     console.log("hi from test function")
    //     storageEventHandler();
    // }
        
        
    
    const [userInfo,setUserInfo]=useState({firstname:UserDataLocalStorage!==null?UserDataLocalStorage.nombre:undefined,lastname:UserDataLocalStorage!==null?UserDataLocalStorage.apellido:undefined})
    const resetUserInfo=()=>{
        localStorage.removeItem('userData')
        localStorage.removeItem('jwt')
         setUserInfo({})
        return document.location.reload();
        };
        
    
    
    const [headerDisplayed,setHeaderDisplayed]=useState(<><DesktopHeader firstname={userInfo.firstname} lastname={userInfo.lastname}/></>)
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    useEffect(() => {
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
        if(windowWidth < 768){
            setHeaderDisplayed(<MobileHeader rol={userInfo.rol} handleUserInfo={resetUserInfo} firstname={userInfo.firstname} lastname={userInfo.lastname} />)
        }
        else if(windowWidth<=1365){
            setHeaderDisplayed(<TabletHeader rol={userInfo.rol} handleUserInfo={resetUserInfo} firstname={userInfo.firstname} lastname={userInfo.lastname} />)
        }
        else if(windowWidth>=1366){
            setHeaderDisplayed(<DesktopHeader rol={userInfo.rol} handleUserInfo={resetUserInfo} firstname={userInfo.firstname} lastname={userInfo.lastname} />)

        }
        
    },[windowWidth,userInfo]);
    return (
        // 
        <>
        
            {headerDisplayed}
        </>
    )
}

Header.propTypes = {}

