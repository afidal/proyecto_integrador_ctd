import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { Heading } from "../../atoms/Heading/Heading";
import { Paragraph } from "../../atoms/paragraph/Paragraph";
import { Inicio } from "./Inicio";
import { Icon } from '../../atoms/Icon/Icon';
import './CBU.css'
import { Picture } from '../../atoms/Picture/Picture';
export const CBU = (props) => {
    const navigate = useNavigate();
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
        <Icon icon={"bank"} width="lg" />
        <Heading variant={"secondary"} type="lg" title={"h2"}>
          Transferencia bancaria
        </Heading>
      </div>
      <hr />
      <div className="cbu-content">
        <Paragraph variant={"secondary"} size="xmd">
          Para para realizar el pago escaneá el código QR y enviá{" "}
          <strong>ARS ${pesosFormat.format(props.price) + ".00"}</strong>
        </Paragraph>
        <div className="qr">
          <Picture image={"qr_banco"} width="lg" height={"lg"}></Picture>
        </div>
      </div>
      <div className="cbu-nav">
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
