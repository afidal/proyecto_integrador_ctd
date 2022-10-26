import React from 'react'
import PropTypes from 'prop-types'
import { getIcon, getWidth } from './helpers'
import './Icon.css'
export const Icon = ({ icon, width, onClick, id }) => {

    return (
        <div onClick={onClick} className='i-icon' style={{ display: 'flex' }} >
            <img className='background' src={getIcon(icon)} style={{ width: getWidth(width), height: getWidth(width) }} id={id} alt={icon} />
        </div>

    )
}

Icon.propTypes = {
    icon: PropTypes.oneOf(['emptyStarGrey','notLogin','user','reservaExitosa', 'calendar', 'search', 'location', 'disabled', 'wifi', 'swim', 'star', 'menu', 'close', 'twitter', 'facebook', 'linkedin', 'favorite', 'instagram', 'closeBlack', 'visibility', 'wtwitter', 'wfacebook', 'wlinkedin', 'winstagram', 'locationEmpty', 'back', 'emptyStar', 'emptyHeart', 'share', 'pets', 'parking', 'kitchen', 'clock', 'smoke', 'card', "cocina",'airconditioner', 'noSmoke', 'noParty', 'tv', 'bWifi', 'bEmptyHeart', 'bShare', 'bFavorite', "forward", 'rightArrow', "pool", "jardin", "bar", "spa", "gym", "lift", "reception", "calefaccion", "cajafuerte", "cajaFuerte", "bano", "limpieza", "seguridad","airConditioner","rules"]),
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg'])
}
Icon.defaultProps = {
    onClick: () => { }
}
