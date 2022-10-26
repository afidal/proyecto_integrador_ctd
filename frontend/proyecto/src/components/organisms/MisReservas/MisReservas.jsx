import React, { useEffect, useState } from 'react';
import './MisReservas.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heading } from '../../atoms/Heading/Heading'
import { Icon } from '../../atoms/Icon/Icon'
import { urlAPI } from "../../../global.js";
import axios from 'axios';
import sinReservas from '../../utils/images/sinReservas.jpeg'
import { ProductsReserve } from '../ProductsReserve/ProductsReserve';
import { Loader } from '../../molecules/Loader/Loader';
import classNames from 'classnames';
export const MisReservas = () => {


    const[id, setId] = useState()
    const [loader,setLoder]=useState(true)
    const [rating, setRating] = useState()

    useEffect(() => {
        setId(localStorage.getItem("id"))
        console.log(id)
        if (rating) {
            axios({
                method: "POST",
                url: `${urlAPI}puntuaciones/agregar`,
                data: {
                    "puntuacion": "2",
                    "producto_id": "28",
                    "usuario_id": id
                },
                headers: {
                    "Content-Type": "application/json",
                }
            }).then((res) => {
                console.log({
                    "puntuacion": "2",
                    "producto_id": "28",
                    "usuario_id": id
                })
                console.log(res.status);
            })
        }
    }, [rating,id])


    const [userId, setUserId] = useState(undefined)
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData"))) {
            setUserId(JSON.parse(localStorage.getItem("userData")).id);
        }
    }, []);

    useEffect(() => {
        if (rating) {
            console.log("desde misreservas: ")
            console.log(rating);

        }
    }, [rating])


    const [productsData, setProductsData] = useState([]);
    const [render, setRender] = useState('')

    const [reservasPorId, setReservasPorId] = useState([])
    const [reserveDate, setReserveDate] = useState([])

    useEffect(() => {
        if (reserveDate) {
            reservasPorId.map((reserva) => {

                if (reserva.usuario_id === userId) {
                    setReserveDate((prevData) => {
                        if (!prevData) {
                            return {
                                id: reserva.producto_id,
                                fechaInicioReserva: reserva.fechaInicioReserva,
                                fechaFinReserva: reserva.fechaFinReserva
                            }
                        }
                        else {
                            let bandera = false
                            prevData.map((element) => {
                                if (element.id === reserva.producto_id) {
                                    return bandera = true;
                                }
                            });
                            if (!bandera) {
                                return [
                                    ...prevData,
                                    {
                                        id: reserva.producto_id,
                                        fechaInicioReserva: reserva.fechaInicioReserva,
                                        fechaFinReserva: reserva.fechaFinReserva
                                    }
                                ];
                            }
                            else {
                                return prevData;
                            }
                        }
                    })
                }
            })
        }
    }, [reservasPorId, reserveDate])

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userData')).id;
        axios.get(`${urlAPI}reservas/porUsuarioId/${userId}`).then(response => {
            setProductsData([])
            response.data.map((reserva) => {
                axios.get(`${urlAPI}productos/${reserva.producto_id}`).then((data) => {
                    return setProductsData((prevData) => {
                        if (!prevData) {
                            return data.data
                        }
                        else {
                            let bandera = false
                            prevData.forEach(element => {
                                if (element.id === data.data.id) {
                                    return bandera = true;
                                }
                            });
                            if (!bandera) {
                                return [
                                    ...prevData,
                                    data.data
                                ];
                            }
                            else {
                                return prevData;
                            }
                        }
                    })
                })
            }
            )
        })


    }, [])


    useEffect(() => {
        if (productsData && productsData.length > 0) {
            return (

                setRender(
                    <>  <div className='misReservas-container'>
                        <ProductsReserve
                            setRating={setRating} data={productsData} reserveDate={reserveDate} setReservasPorId={setReservasPorId}
                        ></ProductsReserve>
                        </div>
                    </>
                )
            )

        } else {
            return (
                setRender(
                    <>
                        <div className="misReservas-vacia">
                            <div className="misReservas-vacia-box">

                                <img src={sinReservas} alt="reservasVacias" />
                                <Heading title="h2" variant="secondary" type='lg'>
                                    Aún no haz efectuado ninguna reserva
                                </Heading>{" "}
                                <Link to={"/"}>
                                    <h5>Ir a la página principal</h5>
                                </Link>
                            </div>
                        </div>
                    </>
                )

            )
        }
    }, [productsData, reserveDate])

        useEffect(() => {
          if (productsData.length > 0) {
            setLoder(false);
          } else {
            setTimeout(() => setLoder(false), 2500);
          }
        }, [productsData]);
    const MisReservasClassNames = classNames("misReservas-header",{
        'none':loader
    });
    return (
      <>
        {loader?<Loader></Loader> : (
          <>
            <div className={MisReservasClassNames}>
              <div className="misReservas-header-container">
                <div className="misReservas-header-title">
                  <Heading title="h2" variant="base" type="md">
                    Mis Reservas
                  </Heading>
                </div>
                <Icon onClick={handleBack} icon="back" />
              </div>
            </div>
            <div className="misReservas-products">{render}</div>
          </>
        )}
      </>
    );
}
