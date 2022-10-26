import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from '../Heading/Heading'
import classNames from 'classnames'
import './Avatar.css'
export const Avatar = ({firstname,lastname,variant}) => {
    
    const AvatarClassNames=classNames('avatar',{
        [`background-${variant}`]:variant
    })
    const name=`${firstname.charAt(0).toUpperCase()+lastname.charAt(0).toUpperCase()}`
  return (
    <div className={AvatarClassNames} >
        <Heading title='h2' type='md'>{name}</Heading>
    </div>
  )
}

Avatar.propTypes = {
    variant:PropTypes.oneOf(['primary','secondary']),
    firstname:PropTypes.string.isRequired,
    lastname:PropTypes.string.isRequired,

}
Avatar.defaultProps={
    variant:'primary',
}

