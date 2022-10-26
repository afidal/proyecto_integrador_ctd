import React from 'react'
import PropTypes from 'prop-types'
import { getImage,getHeight,getWidth } from './helpers'

export const Picture = ({width,height,image}) => {
    return (
        <img src={getImage(image)} style={{width:getWidth(width),height:getHeight(height)}} alt={image} />
    )
}

Picture.propTypes = {}

