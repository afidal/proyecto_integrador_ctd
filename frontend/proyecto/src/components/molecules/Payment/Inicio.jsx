import React,{useState} from 'react'
import { Button } from "../../atoms/Button/Button";
import { Heading } from "../../atoms/Heading/Heading";
import { Icon } from "../../atoms/Icon/Icon";
import { Paragraph } from "../../atoms/paragraph/Paragraph";


export const Inicio = (props) => {
    console.log(props);
    const [selectedMethod, setSelectedMethod] = useState("");
   const handleSelected = (method) => {
     return setSelectedMethod(method);
   };

  return (
    <div className="payment-content">
      <Heading title={"h2"} variant="secondary" type={"lg"}>
        ¿Cómo querés pagar?
      </Heading>
      <div className="payment-methods">
        <div
          onClick={() => handleSelected("efectivo")}
          className="payment-method"
        >
          <div className="payment-method-content">
            <input
              checked={selectedMethod == "efectivo"}
              name="payment-method"
              type="radio"
            ></input>
            <div className="payment-method-icon">
              <Icon icon={"cash"} width="lg"></Icon>
            </div>
            <Paragraph size={"lg"} variant={"secondary"}>
              Efectivo
            </Paragraph>{" "}
          </div>
        </div>
        <div
          onClick={() => handleSelected("mercadopago")}
          className="payment-method"
        >
          <div className="payment-method-content">
            <input
              checked={selectedMethod == "mercadopago"}
              name="payment-method"
              type="radio"
            ></input>
            <div className="payment-method-icon">
              <Icon icon={"mercadopago"} width="lg"></Icon>
            </div>
            <Paragraph size={"lg"} variant={"secondary"}>
              Mercado Pago
            </Paragraph>{" "}
          </div>
        </div>
        <div onClick={() => handleSelected("cbu")} className="payment-method">
          <div className="payment-method-content">
            <input
              checked={selectedMethod == "cbu"}
              name="payment-method"
              type="radio"
            ></input>
            <div className="payment-method-icon">
              <Icon icon={"bank"} width="lg"></Icon>
            </div>
            <Paragraph size={"lg"} variant={"secondary"}>
              Transferencia Bancaria
            </Paragraph>{" "}
          </div>
        </div>
        <div onClick={() => handleSelected("cripto")} className="payment-method">
          <div className="payment-method-content">
            <input
              checked={selectedMethod == "cripto"}
              name="payment-method"
              type="radio"
            ></input>
            <div className="payment-method-icon">
              <Icon icon={"cripto"} width="lg"></Icon>
            </div>
            <Paragraph size={"lg"} variant={"secondary"}>
              Cripto
            </Paragraph>{" "}
          </div>
        </div>
      </div>
      <div className="confirm-payment">
        <Button
          onClick={() =>
            props.handleCardDisplayed(selectedMethod ? selectedMethod : "")
          }
          label="Confirmar metodo de pago"
        ></Button>
      </div>
    </div>
  );
};
