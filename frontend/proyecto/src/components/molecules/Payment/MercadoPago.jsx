import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { Heading } from "../../atoms/Heading/Heading";
import { Paragraph } from "../../atoms/paragraph/Paragraph";
import { Inicio } from "./Inicio";
import { Picture } from '../../atoms/Picture/Picture';
import { Icon } from '../../atoms/Icon/Icon';
import './MercadoPago.css'
import { SpacerHorizontal } from '../../atoms/Spacer/SpacerHorizontal';
export const MercadoPago = (props) => {
    const navigate=useNavigate()
    const handleNavigation = (direction) => {
      console.log(direction);
      direction === "back"
        ? props.setCardDisplayed(
            <>
              <Inicio handleCardDisplayed={props.handleCardDisplayed}></Inicio>
            </>
          )
        : props.handleFinish();
    };
    const pesosFormat = Intl.NumberFormat("en-US");
    
  return (
    <div className="cbu">
      <div className="method-title">
        <Icon icon={"mercadopago"} width="lg" />
        <Heading variant={"secondary"} type="lg" title={"h2"}>
          Mercado Pago
        </Heading>
      </div>
      <hr />
      <div className="cbu-content">
        <Paragraph variant={"secondary"} size="xmd">
          Para realizar el pago ingresá en el siguiente link de mercado pago y
          enviá  <strong style={{width:'100%',textAlign:'center'}}>${pesosFormat.format(props.price) + ".00"}</strong>
        </Paragraph>
        <div className="mpLink">
          <Paragraph>
            {" "}
            <a
              target={"_blank"}
              href="https://link.mercadopago.com.ar/digitalbooking"
            >
              link.mercadopago.com.ar/digitalbooking
            </a>{" "}
            <SpacerHorizontal height={"2md"} />
            <Paragraph variant={"secondary"}>
              {" "}
              <i>
                Una vez que realice el pago, vuelva a esta pantalla y clickee en
                el boton
                <strong>"Finalizar reserva"</strong>
              </i>{" "}
            </Paragraph>
          </Paragraph>
        </div>
      </div>
      <div className="cbu-nav mp">
        <Button
          onClick={() => handleNavigation("back")}
          variant={false}
          label="Volver"
        ></Button>
        <Button
          onClick={() => handleNavigation("finish")}
          disabled={props.finishButtonValue.disabled}
          label={props.finishButtonValue.label}
        ></Button>
      </div>
    </div>
  );
}
