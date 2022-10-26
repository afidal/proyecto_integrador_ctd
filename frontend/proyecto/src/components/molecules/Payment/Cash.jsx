import React,{useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../atoms/Button/Button'
import { Heading } from '../../atoms/Heading/Heading'
import { Paragraph } from '../../atoms/paragraph/Paragraph'
import { Inicio } from './Inicio'

import './Cash.css'
import { Icon } from '../../atoms/Icon/Icon'
export const Cash = (props) => {
    useEffect(() => {
      console.log(props.finishButtonValue);
    }, [props.finishButtonValue]);
    const handleNavigation=(direction)=>{
        console.log(direction);
          direction === "back"
            ? props.setCardDisplayed(
                <>
                  <Inicio
                    handleCardDisplayed={props.handleCardDisplayed}
                  ></Inicio>
                </>
              )
            : props.handleFinish();
    }
    const pesosFormat = Intl.NumberFormat("en-US");
  return (
    <div className="cash">
      <div className="method-title">
        <Icon icon={"cash"} width="lg" />
        <Heading variant={"secondary"} type="lg" title={"h2"}>
          Efectivo
        </Heading>
      </div>
      <hr />
      <div className="cash-content">
        <Paragraph size={"xmd"} variant={"secondary"}>
          Ha seleccionado el pago en efectivo, por lo que realizará el pago una
          vez llegue al alojamiento <span>{props.placeName}</span>. <br />
          <br />
          Recuerde que el precio total de su estadía es de:{" "}
          <strong>ARS ${pesosFormat.format(props.price)+'.00'}</strong>
        </Paragraph>
      </div>
      <div className="cash-nav nav-cash">
        <Button
          onClick={() => handleNavigation("back")}
          variant={false}
          label="Volver"
        ></Button>
        <Button
          onClick={() => handleNavigation("finish")}
          label={props.finishButtonValue.label}
          disabled={props.finishButtonValue.disabled}
        ></Button>
      </div>
    </div>
  );
}
