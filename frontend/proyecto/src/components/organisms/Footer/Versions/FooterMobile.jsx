import React from 'react'
import PropTypes from 'prop-types'
import {Heading} from '../../../atoms/Heading/Heading'
import './FooterMobile.css'
export const FooterMobile = ({}) => {
  return (
    <footer className='footer-mobile'>
        <div className="footer-mobile-content">
            <Heading type='xs' title='h3' variant='base' >® 2022 Digital Booking</Heading>
        </div>
    </footer>
  )
}

FooterMobile.propTypes = {}

