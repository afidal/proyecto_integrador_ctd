import React, { useState, useEffect, useRef } from "react";
import { InputLabel } from "../../molecules/InputLabel/InputLabel";
import { Heading } from "../../atoms/Heading/Heading";
import { Button } from "../../atoms/Button/Button";
import { SpacerHorizontal } from "../../atoms/Spacer/SpacerHorizontal";
import { Paragraph } from "../../atoms/paragraph/Paragraph";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { urlAPI } from "../../../global";
import "./LoginForm.css";
import { Picture } from "../../atoms/Picture/Picture";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export const LoginForm = ({ failReserve, setFailReserve }) => {
  useEffect(() => { }, []);

  const noSoyRobot = document.getElementById("noSoyUnRobot");

  const [captchaValido, setCaptchaValido] = useState(null)

  const captcha = useRef(null)

  const onChange = () => {
      if (captcha.current.getValue()) {
          setCaptchaValido(true)
      }
  }

  const [medidas, setMedidas] = useState({
    inputSize: "base",
    inputSpacerHeight: "xs",
    buttonWidth: "xs",
    titleSpacerHeight: "xs",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth < 768) {
      setMedidas({
        inputSize: "sm",
        inputSpacerHeight: "xs",
        buttonWidth: "sm",
        titleSpacerHeight: "xxs",
      });
    } else if (windowWidth >= 768 && windowWidth < 1366) {
      setMedidas({
        inputSize: "md",
        inputSpacerHeight: "md",
        buttonWidth: "md",
        titleSpacerHeight: "lg",
      });
    } else if (windowWidth >= 1366) {
      setMedidas({
        inputSize: "2xl",
        inputSpacerHeight: "xs",
        buttonWidth: "xs",
        titleSpacerHeight: "xs",
      });
    }
  }, [windowWidth]);

  const [buttonValue, setButtonValue] = useState({
    disabled: false,
    value: "Iniciar sesión",
  });
  const [formValues, setFormValues] = useState({});

  const handleChange = () => (event) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const [errors, setErrors] = useState({ email: false, password: false });
  const handleErrorsTrue = (id) => {
    return setErrors((prevValue) => ({ ...prevValue, [id]: true }));
  };
  const handleErrorsFalse = (id) => setErrors({ ...errors, [id]: false });

  const navigate = useNavigate();
  const [logError, setLogError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (failReserve && firstValidation("email", "password")) {
       setButtonValue({ disabled: true, value: "Iniciando Sesion..." });
       var formdata = new FormData();
       formdata.append("email", formValues.email);
       formdata.append("password", formValues.password);

       //arreglar login, ya no es formdata es JSON.
       var myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/json");

       var requestOptions = {
         method: "POST",
         body: JSON.stringify({
           email: `${formValues.email}`,
           password: `${formValues.password}`,
         }),
         redirect: "follow",
         headers: myHeaders,
       };
       setButtonValue({ disabled: true, value: "Iniciando sesión..." });
       fetch(`${urlAPI}usuarios/login`, requestOptions)
         .then((response) => {
           // console.log(response.status);
           if (response.status == 401) {
             //console.log("entro");
             setLogError(true);
             setTimeout(() => setLogError(false), 5000);
           }
           return response.text();
         })
         .then((result) => {
           // console.log(result.status);
           if (JSON.parse(result).token_de_acceso) {
             localStorage.setItem(
               "jwt",
               JSON.stringify(JSON.parse(result).token_de_acceso)
             );

             axios({
               method: "POST",
               url: `${urlAPI}usuarios/porEmail`,
               data: {
                 email: `${formValues.email}`,
               },
             }).then((data) => {
               //console.log(data);
               localStorage.setItem(
                 "userData",
                 JSON.stringify({
                   nombre: data.data.nombre,
                   apellido: data.data.apellido,
                   id: data.data.id,
                   email: data.data.email,
                   nombre_rol: data.data.nombre_rol,
                 })
               );

               const lastProduct = JSON.parse(
                 localStorage.getItem("lastProduct")
               );
               setButtonValue({
                 disabled: false,
                 value: "Iniciar sesión",
               });
               setFailReserve(false)
               return (window.location.pathname = `/productos/${lastProduct}`);
             });
           } else {
             setButtonValue({
               disabled: false,
               value: "Iniciar sesión",
             });
           }
         });
      
    } else if (firstValidation("email", "password")) {
      setButtonValue({ disabled: true, value: "Iniciando Sesion..." });
      var formdata = new FormData();
      formdata.append("email", formValues.email);
      formdata.append("password", formValues.password);
    



      //arreglar login, ya no es formdata es JSON.
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          "email": `${formValues.email}`,
          "password": `${formValues.password}`,
        }),
        redirect: "follow",
        headers: myHeaders,
      };
      setButtonValue({ disabled: true, value: 'Iniciando sesión...' })
      fetch(`${urlAPI}usuarios/login`, requestOptions)
        .then((response) => {
          // console.log(response.status);
          if (response.status == 401) {
            //console.log("entro");
            setLogError(true);
            setTimeout(() => setLogError(false), 5000);
          }
          return response.text();
        })
        .then((result) => {
          // console.log(result.status);
          if (JSON.parse(result).token_de_acceso) {
            localStorage.setItem(
              "jwt",
              JSON.stringify(JSON.parse(result).token_de_acceso)
            );

            axios({
              method: "POST",
              url: `${urlAPI}usuarios/porEmail`,
              data: {
                email: `${formValues.email}`,
              },
            }).then((data) => {
              //console.log(data);
              localStorage.setItem(
                "userData",
                JSON.stringify({
                  nombre: data.data.nombre,
                  apellido: data.data.apellido,
                  id: data.data.id,
                  email: data.data.email,
                  nombre_rol: data.data.nombre_rol
                })
              );

              const lastProduct = JSON.parse(
                localStorage.getItem("lastProduct")
              );
              setButtonValue({
                disabled: false,
                value: "Iniciar sesión",
              });
              return (window.location.pathname = `/`);
            });
          }
          else {
            setButtonValue({
              disabled: false,
              value: "Iniciar sesión",
            });
          }
        });
    }

  };

  //     axios({
  //         method: "POST",
  //         url: "http://localhost:8080/usuarios/porEmail",
  //         data:{
  //             "email": `${formValues.email}`
  //         }
  //     }).then(data=>{
  //         console.log(data);
  //         localStorage.setItem("userData",JSON.stringify({nombre:data.data.nombre,apellido:data.data.apellido,id:data.data.id,email:data.data.email}))});

  // })
  //   .catch(error => console.log('error', error));

  // localStorage.setItem("userData",JSON.stringify(userData))
  // window.location.href='http://localhost:3000/'

  function firstValidation(email, password) {
    let result = true;
    
    // if(!captchaValido){
    //   //console.log(captchaValido)
    //   noSoyRobot.innerHTML = "Por favor, verifica que no eres un robot."
    //   setTimeout(()=>  noSoyRobot.innerHTML = "",3500);
    //   result = false;
    // }

    if (!checkLength(formValues[email])) {
      result = false;
      handleErrorsTrue(email);
      setTimeout(function () {
        handleErrorsFalse(email);
      }, 3500);
    }
    if (!checkLength(formValues[password])) {
      result = false;
      handleErrorsTrue(password);
      setTimeout(function () {
        handleErrorsFalse(password);
      }, 3500);
    }

    if (
      !formValues[email]
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      result = false;
      handleErrorsTrue(email);
      setTimeout(function () {
        handleErrorsFalse(email);
      }, 3500);
    }
    if (formValues[password].length < 2) {
      result = false;
      handleErrorsTrue(password);
      setTimeout(function () {
        handleErrorsFalse(password);
      }, 3500);
    }
    return result;
  }

  function checkLength(input) {
    let result = true;
    if (input == undefined) {
      result = false;
    } else if (input.length < 2) {
      result = false;
    } else if (input.length > 30) {
      result = false;
    }
    // console.log(result);
    return result;
  }
  const [inputType, setInputType] = useState({
    input: "password",
    icon: "disabled",
  });
  const toggleInputType = () =>
    setInputType(
      inputType.input === "password"
        ? { input: "text", icon: "visibility" }
        : { input: "password", icon: "disabled" }
    );
  return (
    <>
      <div className="login">
        {failReserve && (
          <div className="warning-message">
            <Picture image={"warning"} width="xxs" />
            <Paragraph size={"md"} variant={"error"}>
              Para realizar una reserva necesitas estar logueado
            </Paragraph>
            <SpacerHorizontal height={"md"} />
          </div>
        )}

        <div>
          {logError && (
            <Paragraph variant={"error"}>
              Lamentablemente no ha podido iniciar sesión, intentelo más tarde
            </Paragraph>
          )}

          <SpacerHorizontal height={"xs"} />
          <Heading title="h2" type="lg" variant="primary">
            Iniciar Sesión
          </Heading>
        </div>
        <SpacerHorizontal height={medidas.titleSpacerHeight} />
        <form>
          <div className="login-input">
            <InputLabel
              value={formValues.email}
              id="email"
              name="email"
              onChange={handleChange()}
              label={"Email"}
              size={medidas.inputSize}
              type={"text"}
              placeholder={"Ingrese su email"}
              isError={errors.email}
            ></InputLabel>
            {errors.email && (
              <Paragraph variant="error" size="sm">
                {" "}
                Un email válido es requerido
              </Paragraph>
            )}
          </div>
          {!errors.email && (
            <SpacerHorizontal height={medidas.inputSpacerHeight} />
          )}
          <div className="login-input">
            <InputLabel
              onClick={toggleInputType}
              icon={inputType.icon}
              variant="right"
              iconWidth={"lg"}
              value={formValues.password}
              id="password"
              name="password"
              onChange={handleChange()}
              label={"Contraseña"}
              size={medidas.inputSize}
              type={inputType.input}
              placeholder={"Ingrese su contraseña"}
              isError={errors.password}
            ></InputLabel>
            {errors.password && (
              <Paragraph variant="error" size="sm">
                La contraseña es requerida
              </Paragraph>
            )}
          </div>
          <div className="nosoyunRobot" id="noSoyUnRobot">

          </div>

          <div className="boton-register">
            {/* {console.log(buttonValue)} */}
            <Button
              disabled={buttonValue.disabled}
              onClick={handleSubmit}
              size={medidas.buttonWidth}
              type="submit"
              variant={true}
              label={buttonValue.value}
            ></Button>
          </div>
        </form>
        
        <p>
          ¿No tienes cuenta?
          <Link to={"/sign-up"}>Crear cuenta</Link>
        </p>
      </div>


    </>
  );
};
