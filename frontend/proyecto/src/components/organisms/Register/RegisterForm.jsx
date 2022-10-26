import React,{useState,useEffect} from 'react'
import { InputLabel } from '../../molecules/InputLabel/InputLabel'
import { Heading } from '../../atoms/Heading/Heading'
import { Button } from '../../atoms/Button/Button'
import { Paragraph } from '../../atoms/paragraph/Paragraph'
import { SpacerHorizontal } from '../../atoms/Spacer/SpacerHorizontal'
import { Outlet, Link,useNavigate } from "react-router-dom";
import { urlAPI } from '../../../global'
import axios from 'axios'
import './RegisterForm.css'
import { Picture } from '../../atoms/Picture/Picture'

export const RegisterForm = ({failReserve, setFailReserve}) => {
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
    if (windowWidth <= 768) {
      setMedidas({
        inputSize: "sm",
        inputSpacerHeight: "xs",
        buttonWidth: "sm",
        titleSpacerHeight: "xxs",
      });
    } else if (windowWidth <= 1366) {
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
    value: "Crear cuenta",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [formValues, setFormValues] = useState({});
  const handleChange = () => (event) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    repassword: false,
  });
  const handleErrorsTrue = (id) => {
    return setErrors((prevValue) => ({ ...prevValue, [id]: true }));
  };
  const handleErrorsFalse = (id) => setErrors({ ...errors, [id]: false });
  let userData = {};
  useEffect(() => {
    userData = {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
    };
  }, [formValues]);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      firstValidation(
        "firstname",
        "lastname",
        "email",
        "password",
        "repassword"
      )
    ) {
      setButtonValue({ disabled: true, value: "Creando cuenta..." });
      const data = {
        nombre: `${formValues.firstname}`,
        apellido: `${formValues.lastname}`,
        email: `${formValues.email}`,
        password: `${formValues.password}`,
        ciudad: "Buenos Aires",
        nombre_rol: "ROLE_USER",
      };
      //console.log(data);
      axios({
        method: "POST",
        url: `${urlAPI}usuarios/agregar`,
        data: data,
        headers: { "Access-Control-Allow-Origin": "*/*" },
      })
        .then((res) => {
          localStorage.setItem(
            "jwt",
            JSON.stringify(res.data.token_acceso_registro)
          );
          localStorage.setItem(
            "userData",
            JSON.stringify({
              nombre: formValues.firstname,
              apellido: formValues.lastname,
              email: formValues.email,
              id: res.data.id,
            })
          );
          setButtonValue({ disabled: false, value: "Crear Cuenta" });
          console.log(failReserve);
          const lastProduct=JSON.parse(localStorage.getItem('lastProduct'))
            if (failReserve) {
              window.location.pathname = `/productos/${lastProduct}`
               return setFailReserve(false);
            }
            else{
              
               window.location.pathname = '/';
              return setFailReserve(false);
              }
            
            
          
        })
        .catch((err) => {
          setButtonValue({ disabled: false, value: "Crear Cuenta" });
          setErrorMessage(true);
          return setTimeout(() => setErrorMessage(false), 3000);
        });
    }
    setFailReserve(false)
  };

  function firstValidation(firstname, lastname, email, password, repassword) {
    const localEmail = formValues[email] || "";
    let result = true;

    if (!checkLength(formValues[firstname])) {
      result = false;
      handleErrorsTrue(firstname);
      setTimeout(function () {
        handleErrorsFalse(firstname);
      }, 3500);
    }
    if (!checkLength(formValues[lastname])) {
      result = false;
      handleErrorsTrue(lastname);
      setTimeout(function () {
        handleErrorsFalse(lastname);
      }, 3500);
    }

    if (!checkLength(formValues[password])) {
      result = false;
      handleErrorsTrue(password);
      setTimeout(function () {
        handleErrorsFalse(password);
      }, 3500);
    }
    if (!checkLength(formValues[repassword])) {
      result = false;
      handleErrorsTrue(repassword);
      setTimeout(function () {
        handleErrorsFalse(repassword);
      }, 3500);
    }
    if (
      !localEmail
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
    if (formValues[password].length < 6) {
      result = false;
      handleErrorsTrue(password);
      setTimeout(function () {
        handleErrorsFalse(password);
      }, 3500);
    }
    if (
      formValues[password].length < 6 &&
      formValues[password] !== formValues[repassword]
    ) {
      result = false;
      handleErrorsTrue(repassword);
      handleErrorsTrue(password);
      setTimeout(function () {
        handleErrorsFalse(repassword);
        handleErrorsFalse(password);
      }, 3500);
    } else if (formValues[password] !== formValues[repassword]) {
      result = false;
      handleErrorsTrue(repassword);
      // handleErrorsTrue(password);
      setTimeout(function () {
        handleErrorsFalse(repassword);
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
    <div className="register">
      {errorMessage && (
        <div className="warning-message">
          <Picture image={"warning"} />
          <Paragraph variant={"error"}>
            Ha habido un problema en el registro, intentelo mas tarde
          </Paragraph>
        </div>
      )}

      <div>
        <Heading title="h2" type="lg" variant="primary">
          Crear Cuenta
        </Heading>
      </div>
      <SpacerHorizontal height={"2md"} />
      <form>
        <div className="name-surname">
          <div className="name register-input ">
            <InputLabel
              value={formValues.firstname}
              id="firstname"
              name="firstname"
              onChange={handleChange()}
              label={"Nombre"}
              size={"base"}
              type={"text"}
              placeholder={"Ingrese su nombre"}
              isError={errors.firstname}
            ></InputLabel>
            {errors.firstname && (
              <>
                <Paragraph variant="error" size="sm">
                  {" "}
                  Un nombre válido es requerido
                </Paragraph>{" "}
                <SpacerHorizontal height={"xxs"} />{" "}
              </>
            )}
          </div>
          {!errors.firstname && (
            <SpacerHorizontal height={medidas.inputSpacerHeight} />
          )}
          <div className="surname register-input ">
            <InputLabel
              value={formValues.lastname}
              id="lastname"
              name="lastname"
              onChange={handleChange()}
              label={"Apellido"}
              size={"base"}
              type={"text"}
              placeholder={"Ingrese su apellido"}
              isError={errors.lastname}
            ></InputLabel>
            {errors.lastname && (
              <>
                <Paragraph variant="error" size="sm">
                  {" "}
                  Un apellido válido es requerido
                </Paragraph>
                <SpacerHorizontal height={"xxs"} />{" "}
              </>
            )}
          </div>
        </div>
        {!errors.lastname && (
          <SpacerHorizontal height={medidas.inputSpacerHeight} />
        )}
        <div className="register-input">
          <InputLabel
            value={formValues.email}
            id="email"
            name="email"
            onChange={handleChange()}
            label={"Correo electrónico"}
            size={medidas.inputSize}
            type={"email"}
            placeholder={"Ingrese su email"}
            isError={errors.email}
          ></InputLabel>
          {errors.email && (
            <>
              <Paragraph variant="error" size="sm">
                {" "}
                Un email válido es requerido
              </Paragraph>
              <SpacerHorizontal height={"xxs"} />{" "}
            </>
          )}
        </div>
        {!errors.email && (
          <SpacerHorizontal height={medidas.inputSpacerHeight} />
        )}

        <div className="register-input">
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
            <>
              <Paragraph variant="error" size="sm">
                {" "}
                Una contraseña válida es requerido
              </Paragraph>
              <SpacerHorizontal height={"xxs"} />{" "}
            </>
          )}
        </div>
        {!errors.password && (
          <SpacerHorizontal height={medidas.inputSpacerHeight} />
        )}

        <div className="register-input">
          <InputLabel
            value={formValues.repassword}
            id="repassword"
            name="repassword"
            onChange={handleChange()}
            label={"Confirmar Contraseña"}
            size={medidas.inputSize}
            type={inputType.input}
            placeholder={"Reingrese su contraseña"}
            isError={errors.repassword}
          ></InputLabel>
          {errors.repassword && (
            <Paragraph variant="error" size="sm">
              {" "}
              Las contraseñas no coinciden
            </Paragraph>
          )}
        </div>

        <Button
          disabled={buttonValue.disabled}
          onClick={handleSubmit}
          size={medidas.buttonWidth}
          type="submit"
          variant={true}
          label={buttonValue.value}
        ></Button>
      </form>
      <p>
        ¿Ya tienes cuenta?
        <Link to="/login"> Iniciar Sesión</Link>
      </p>
    </div>
  );
};


