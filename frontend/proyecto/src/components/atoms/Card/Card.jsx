import React from 'react'
import PropTypes from 'prop-types'
import { getSize } from './helpers'
import classNames from 'classnames'
import './Card.css'

const Card = ({width,height,children,borderRadius,backgroundColor}) => {
    const CardClassNames=classNames('card',{
        'border-radius':borderRadius,
        [`background-${backgroundColor}`]:backgroundColor,

    })
    return (
        <div className={CardClassNames} style={{width:getSize(width),height:getSize(height),backgroundColor:backgroundColor}}>
            {children}
        </div>
    )
}

Card.propTypes = {
    backgroundColor:PropTypes.oneOf(['base','primary','secondary'])
}
Card.defaultProps={
    backgroundColor:'base'
}

export default Card