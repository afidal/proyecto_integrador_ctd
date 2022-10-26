import React from 'react'
import PropTypes from 'prop-types'
import {Heading} from '../../../atoms/Heading/Heading'
import {Icon} from '../../../atoms/Icon/Icon'
import './FooterDesktopTablet.css'
export const FooterDesktopTablet = ({}) => {
    return (
        <footer className='footer-desktop-tablet'>
            <div className='footer-desktop-tablet-content'>
                <Heading type='xs' title='h3' variant='base' >® 2022 Digital Booking</Heading>
                <div className='footer-desktop-tablet-icons' >
                    <Icon icon='wfacebook'/>
                    <Icon icon='wlinkedin'/>
                    <Icon icon='wtwitter'/>
                    <Icon icon='winstagram'/>
                </div>
            </div>
        </footer>
    )
}

FooterDesktopTablet.propTypes = {}

