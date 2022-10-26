import React, { useState, useEffect } from "react";
import "./ProductsReserve.css";
import { Heading } from "../../atoms/Heading/Heading";
import { CardProductReserve } from "../../molecules/CardProductReserve/CardProductReserve";
import axios from 'axios'
import { MockUpProduct } from "../../molecules/MockUpCard/MockUpProduct";
import { urlAPI } from "../../../global";

export const ProductsReserve = ({ setRating, reserveDate, setReservasPorId, data, setMapHomeData, setShowMap, filterTitle, reRender }) => {

    const [userId, setUserId] = useState(undefined)
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData"))) {
            setUserId(JSON.parse(localStorage.getItem("userData")).id);
        }
    }, []);

    const [mockUp, setMockUp] = useState(true)
    const [mockUpDinamic, setMockUpDinamic] = useState(true)
    const [likedProducts, setLikedProducts] = useState([]);
    const [scored,setScored]=useState([])


    useEffect(() => {

        setTimeout(() => {
            setMockUp(false)
        }, 2000)
        if (data.length > 0) {
            setMockUpDinamic(false);
        }

    const id = JSON.parse(localStorage.getItem("userData")).id;

        setLikedProducts([]);
        if (localStorage.getItem("userData")) {
            
            axios.get(`${urlAPI}reacciones/porUsuario/${id}`).then((res) =>
                res.data.forEach((element) => {
                    setLikedProducts((prevData) => {
                        if (prevData.includes(element.producto_id)) {
                            return prevData;
                        } else {

                            return [...prevData, element.producto_id];
                        }
                    });
                    setMockUpDinamic(false);
                })
            );
        }
        data.forEach(element => {
            axios.get(
              `${urlAPI}puntuaciones/porProducto/${element.id}/porUsuario/${id}`
            ).then(res=>{
                if (res.status==200) {
                    setScored((prevScores)=>[...prevScores,element.id])
                }
            });
        });

    }, [data]);
    // useEffect(() => {
    //   console.log(scored);
    // }, [scored]);
    useEffect(() => {
        setMockUp(true)
        // window.scrollTo({ top: 480, behavior: "smooth" });
        setTimeout(() => setMockUp(false), 3000)

    }, [reRender]);
    useEffect(() => {
        if (!mockUpDinamic && !mockUp) {
            // window.scrollTo({ top: 480, behavior: "smooth" });
        }
    }, [mockUpDinamic, mockUp]);


    return (
        <div className="products-container">
            <section className="products-content">
                <div className="product-title" id="filterTitle">
                    <Heading type="lg" title="h2" variant="primary">
                        {filterTitle}
                    </Heading>
                </div>

                {mockUpDinamic || mockUp ? (
                    <div className="product-cards-container">
                        <MockUpProduct />
                        <MockUpProduct />
                        <MockUpProduct />
                        <MockUpProduct />
                        <MockUpProduct />
                        <MockUpProduct />
                        <MockUpProduct />
                        <MockUpProduct />

                        {/* <MockUp noContent={true} /><MockUp noContent={true} /><MockUp noContent={true} /><MockUp noContent={true} /><MockUp noContent={true} /><MockUp noContent={true} /> */}
                    </div>
                ) : (
                    <div className="product-cards-container-reserves">
                        {data.map((product, idx) => {
                            let descriptionPreview = product.descripcion.slice(0, 130);
                            axios.get(`${urlAPI}reservas/porProductoId/${product.id}`).then((response) => {
                                response.data.map((reserva) => {
                                    axios.get(`${urlAPI}reservas/${reserva.id}`).then((response) => {
                                        if (response.data.usuario_id === userId) {
                                            setReservasPorId((prevData) => {
                                                if (!prevData) {
                                                    return response.data
                                                }
                                                else {
                                                    let bandera = false
                                                    prevData.map((element) => {
                                                        if (element.producto_id === response.data.producto_id) {
                                                            return bandera = true;
                                                        }
                                                    });
                                                    if (!bandera) {
                                                        return [
                                                            ...prevData,
                                                            response.data
                                                        ];
                                                    }
                                                    else {
                                                        return prevData;
                                                    }
                                                }
                                            })
                                        }
                                    })


                                })

                            })


                            return (
                              <CardProductReserve
                                scored={scored}
                                setScored={setScored}
                                setRating={setRating}
                                setMapHomeData={setMapHomeData}
                                titulo={product.titulo}
                                url={product.imagenDTOList[0].url_img_producto}
                                descripcion={descriptionPreview}
                                location={
                                  product.ciudad_id === 1
                                    ? "San Carlos de Bariloche"
                                    : product.ciudad_id === 2
                                    ? "Buenos Aires"
                                    : product.ciudad_id === 3
                                    ? "Mendoza"
                                    : "Córdoba"
                                }
                                category={
                                  product.categoria_id === 1
                                    ? "Hoteles"
                                    : product.categoria_id === 2
                                    ? "Hosteles"
                                    : product.categoria_id === 3
                                    ? "Departamentos"
                                    : "Bed & Breakfast"
                                }
                                id={product.id}
                                rating={product.puntaje}
                                services={product.caracteristicasDTOList}
                                lat={product.latitud}
                                lng={product.longitud}
                                setShowMap={setShowMap}
                                likedProducts={likedProducts}
                                precio={product.precio}
                                setLikedProducts={setLikedProducts}
                                startReserveDate={reserveDate.map((reserve) => {
                                  if (reserve.id == product.id) {
                                    return reserve.fechaInicioReserva;
                                  }
                                })}
                                endReserveDate={reserveDate.map((reserve) => {
                                  if (reserve.id == product.id) {
                                    return reserve.fechaFinReserva;
                                  }
                                })}
                              />
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};
