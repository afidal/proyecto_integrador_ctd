import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Picture } from '../../../atoms/Picture/Picture'
import { Heading } from '../../../atoms/Heading/Heading'
import { Avatar } from '../../../atoms/Avatar/Avatar'
import { Icon } from '../../../atoms/Icon/Icon'
import { Paragraph } from '../../../atoms/paragraph/Paragraph'
import { Span } from '../../../atoms/Span/Span'
import { Link } from "react-router-dom";
import classNames from 'classnames'
import './MobileHeader.css'
export const MobileHeader = ({ rol, firstname, lastname, handleUserInfo }) => {

  const [userId, setUserId] = useState(undefined);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      setUserId(JSON.parse(localStorage.getItem("userData")).id);
    }
  }, []);

  const [isOn, setIsOn] = useState(false)
  const toggleIsOn = () => setIsOn(!isOn)

  const MobileHeaderClassNames = classNames('nav-container', {
    'hide': !isOn,
    'active': isOn
  })
  return (
    <>
      <header className="mobile-header">
        <div className="header-container">
          <Link to={"/"}>
            <Picture height="xs" image="logo" />
          </Link>
          <Icon icon="menu" width="lg" onClick={toggleIsOn} />
        </div>
        <nav className={MobileHeaderClassNames}>
          {firstname !== undefined && lastname !== undefined ? (
            <>
              {/* -------------------------------- User nav -------------------------------- */}
              <div className="nav-header">
                <Icon id="close" icon="close" width="lg" onClick={toggleIsOn} />
                <div className="user-content">
                  <Avatar
                    firstname={firstname}
                    lastname={lastname}
                    variant="secondary"
                  />
                  <Heading title="h3" type="sm" variant="secondary">
                    {" "}
                    <span style={{ color: "white" }}>Hola,</span> <br />{" "}
                    {`${
                      firstname.charAt(0).toUpperCase() + firstname.slice(1)
                    } ${
                      lastname.charAt(0).toUpperCase() + lastname.slice(1)
                    }`}{" "}
                  </Heading>
                </div>
              </div>
              <div className="links-Mobile">
                <div className="header-links-Mobile">
                  <Link to={`/${userId}/misreservas`}>
                    <div className="header-mobile-links-container">
                      <Picture image={"reservas"} />

                      <Paragraph size={"xmd"} variant={"secondary"}>
                        Mis reservas
                      </Paragraph>
                    </div>
                  </Link>
                </div>
                <hr />
                <div className="header-links-Mobile">
                  <Link to={"/favoritos"}>
                    <div className="header-mobile-links-container">
                      <Picture image={"favoritos"} />

                      <Paragraph size={"xmd"} variant={"secondary"}>
                        Favoritos
                      </Paragraph>
                    </div>
                  </Link>
                </div>
                <hr />
                {rol === "ROLE_ADMIN" ? (
                  <>
                    <div className="header-links-Mobile">
                      <Link to={"/administracion"}>
                        <Paragraph size={"xmd"} variant={"secondary"}>
                          Administración
                        </Paragraph>
                      </Link>
                    </div>
                    <hr></hr>
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="nav-content-user-mobile">
                <Paragraph size="md">
                  {" "}
                  ¿ Deseas{" "}
                  <Span size="md" variant="primary" onClick={handleUserInfo}>
                    cerrar sesión
                  </Span>{" "}
                  ?{" "}
                </Paragraph>
                <hr  style={{ width: "95%",backgroundColor:'gray',color:'gray' }} />
              </div>
            </>
          ) : (
            <>
              {/* ------------------------------ Unlogged user ----------------------------- */}
              <div className="nav-header">
                <Icon icon="close" width="lg" onClick={toggleIsOn} />
                <div id="menu-title">
                  <Heading title="h2" variant="base" type="md">
                    MENÚ
                  </Heading>
                </div>
              </div>
              <div className="nav-content">
                {window.location.href !== "http://localhost:3000/sign-up" && (
                  <Link to={"/sign-up"}>
                    <Heading title="h3" variant="secondary" type="sm">
                      Crear cuenta
                    </Heading>
                  </Link>
                )}
                {window.location.href !== "http://localhost:3000/sign-up" &&
                  window.location.href !== "http://localhost:3000/login" && (
                    <hr style={{ width: "90%" }} />
                  )}
                {window.location.href !== "http://localhost:3000/login" && (
                  <Link to={"/login"}>
                    <Heading title="h3" variant="secondary" type="sm">
                      {" "}
                      Iniciar sesión
                    </Heading>
                  </Link>
                )}
              </div>
            </>
          )}

          {/* ------------------------------- Both Users ------------------------------- */}
          <div className="header-icons">
            <Icon onClick={() => {}} icon="facebook" size="md" />
            <Icon onClick={() => {}} icon="linkedin" size="md" />
            <Icon onClick={() => {}} icon="twitter" size="md" />
            <Icon onClick={() => {}} icon="instagram" size="md" />
          </div>
        </nav>
      </header>
    </>
  );
}

MobileHeader.propTypes = {}

