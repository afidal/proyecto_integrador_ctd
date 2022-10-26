import React from 'react'
import { Button } from '../../atoms/Button/Button'
import { Heading } from '../../atoms/Heading/Heading'
import { InputLabel } from '../InputLabel/InputLabel'

export const AtributeCard = (nombre,icono,onClickAtribute) => {

    
  return (
    <div className="mobileAdministracion-add-agregarAtributo">
            <Heading title='h5' variant='primary' type='md' >
              Agregar atributos
            </Heading>
            <div className='renderButton-mobileAtributo' id="atributeContainer"></div>
            <div className="mobileAdministracion-add-atributo">
              <div className='mobileAdministracion-add-atributo-parte1'>
                <InputLabel name="AtributoNombre" placeholder="Wifi" label='Nombre' disabled={false}>
                </InputLabel>
                <InputLabel name="AtributoIcono" placeholder="fa-wifi" label='Ícono' disabled={false}>
                </InputLabel>
              </div>
              <div className='mobileAdministracion-add-atributo-parte2'>
                <Button label="+" onClick={onClickAtribute} />
              </div>
            </div>
          </div>
  )
}
