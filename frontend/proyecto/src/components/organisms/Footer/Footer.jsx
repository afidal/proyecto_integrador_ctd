import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { FooterDesktopTablet } from './Versions/FooterDesktopTablet'
import { FooterMobile } from './Versions/FooterMobile'

export const Footer = ({}) => {
    const [footerDisplayed,setFooterDisplayed]=useState(<><FooterDesktopTablet/></>)
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
            setFooterDisplayed(<><FooterMobile /></>)
        }
        else{
            setFooterDisplayed(<><FooterDesktopTablet /></>)
        }
        
    },[windowWidth]);
    return (
        <>
        {footerDisplayed}
        </>
    )
}

Footer.propTypes = {}

