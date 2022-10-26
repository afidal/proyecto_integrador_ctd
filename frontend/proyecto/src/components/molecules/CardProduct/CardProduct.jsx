import React,{useState,useEffect} from "react";
import "./CardProduct.css";
import { Heading } from "../../atoms/Heading/Heading";
import { Paragraph } from "../../atoms/paragraph/Paragraph";
import { Button } from "../../atoms/Button/Button";
import { Icon } from "../../atoms/Icon/Icon";
import { Span } from "../../atoms/Span/Span";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { urlAPI } from "../../../global";
import {useNavigate} from "react-router-dom";
import { LazyLoadImage,LazyLoadComponent } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Picture } from "../../atoms/Picture/Picture";

export const CardProduct = ({
  url,
  titulo,
  descripcion,
  location,
  category,
  id,
  rating,
  services,
  setMapHomeData,
  lat,
  lng,
  setShowMap,
  likedProducts,
  setLikedProducts,
  setMapFavoriteData,
  setShowSmallMap,
  price,
}) => {
  useEffect(() => {
    setLiked(false);
  }, [likedProducts]);
  const [serviceList, setServiceList] = useState([]);
  const locationPathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(false);
    if (services) {
      setServiceList([]);
      services.forEach((element) => {
        setServiceList((prevValue) => {
          return [
            ...prevValue,
            {
              icon: element.nombre_icono.toLowerCase(),
              service: element.titulo,
            },
          ];
        });
      });
    }
  }, [services]);
  const [liked, setLiked] = useState(false);
  const handleFavorite = (productId) => {
    if (!JSON.parse(localStorage.getItem("userData"))) {
      navigate("/login");
    }
    if (!liked) {
      axios({
        url: `${urlAPI}reacciones/agregar`,
        method: "POST",
        data: {
          usuario_id: JSON.parse(localStorage.getItem("userData")).id,
          producto_id: productId,
          favorito: true,
        },
      })
        .then((res) => {
          //console.log('Se guardo el producto '+productId);
          return setLiked(true);
        })
        .catch((err) => console.log(err));
    } else {
      setLiked(false);
      const userId = JSON.parse(localStorage.getItem("userData")).id;
      axios({
        url: `${urlAPI}reacciones/eliminar/porProducto/${productId}/porUsuario/${userId}`,
        method: "DELETE",
      }).then((res) => {
        console.log("Se elimino el producto " + productId);
        if (localStorage.getItem("userData")) {
          const id = JSON.parse(localStorage.getItem("userData")).id;
          axios.get(`${urlAPI}reacciones/porUsuario/${id}`).then((res) =>
            res.data.forEach((element) => {
              setLikedProducts((prevData) => {
                if (prevData.includes(element.producto_id)) {
                  return prevData;
                } else {
                  return [...prevData, element.producto_id];
                }
              });
            })
          );
        }
      });
    }
  };

  const [stars, setStars] = useState("");
  useEffect(() => {
    axios({
      url: `${urlAPI}puntuaciones/porProducto/${id}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      let scores = [];
      data.data.forEach((element) => {
        scores.push(element.puntuacion);
      });
      let avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      // console.log(avgScore.toFixed(1));
      setStars(avgScore.toFixed(1) * 2);
    });
  }, []);
  const handleHomeMap = (latitud, longitud) => {
    if (setMapHomeData) {
      setMapHomeData({ lat: latitud, lng: longitud });
      return setShowMap(true);
    }
    else{
      setMapFavoriteData({ lat: latitud, lng: longitud });
      return setShowSmallMap(true);
    }
    
    
  };
  useEffect(() => {
    setLiked(false);
    if (likedProducts.includes(id)) {
      setLiked(true);
    }
  }, [likedProducts, id]);
  const pesosFormat = Intl.NumberFormat("en-US");
  return (
    <>
      <LazyLoadComponent effect="blur">
        <div className="card-product">
          <div className="card-product-img">
            <div className="card-product-price">
              <div className="priceTab-container">
                <Picture image={"price_tab"} width="sm" />
                <div className="price-tab-text">
                  <Paragraph  variant={"base"}>${pesosFormat.format(price)} <br /> </Paragraph>
                  <span style={{color:'white',fontSize:'13px'}}>por noche</span>
                  
                </div>
              </div>
            </div>
            <Link to={`/productos/${id}`}>
              <LazyLoadImage
                width={"100%"}
                height="100%"
                effect="blur"
                className="product-img"
                src={url}
                alt={titulo}
              />
            </Link>
            <div className="fav">
              <Icon
                icon={liked ? "favorite" : "bEmptyHeart"}
                width="lg"
                height="sm"
                onClick={() => handleFavorite(id)}
              ></Icon>
            </div>
          </div>

          <div className="card-product-text">
            <div className="cat-cat">
              <Heading type="xs" title="h4" variant="tertiary">
                {category}
              </Heading>
              <div className="product-cat-cat">
                {stars < 1 ? (
                  ""
                ) : stars < 2 ? (
                  <>
                    <Icon icon="star" />
                    <Icon icon="emptyStar" />
                    <Icon icon="emptyStar" />
                    <Icon icon="emptyStar" />
                    <Icon icon="emptyStar" />
                  </>
                ) : stars <= 4 ? (
                  <>
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="emptyStar" />
                    <Icon icon="emptyStar" />
                    <Icon icon="emptyStar" />
                  </>
                ) : stars <= 6 ? (
                  <>
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="emptyStar" />
                    <Icon icon="emptyStar" />
                  </>
                ) : stars < 9 ? (
                  <>
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="emptyStar" />
                  </>
                ) : stars <= 9.5 ? (
                  <>
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="emptyStar" />
                  </>
                ) : (
                  <>
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                    <Icon icon="star" />
                  </>
                )}
              </div>
            </div>
            <Heading type="md" title="h3" variant="secondary">
              {titulo}
            </Heading>
            <div className="product-rating">
              <div className="product-rating-score">
                <Paragraph size="md" variant="secondary">
                  {stars < 1 ? "-" : stars}
                </Paragraph>
              </div>
              <div className="product-rating-score-text">
                <Paragraph size="md" variant="secondary">
                  {stars < 1
                    ? "Sin puntaje"
                    : stars < 2
                    ? "Muy Malo"
                    : stars < 4
                    ? "Malo"
                    : stars < 6
                    ? "Regular"
                    : stars < 9
                    ? "Bueno"
                    : stars <= 9.5
                    ? "Muy Bueno"
                    : "Excelente"}
                </Paragraph>
              </div>
            </div>
            <div className="product-location">
              <Icon icon="location" width="xs" onClick={() => {}}></Icon>
              <Paragraph size="md" variant="secondary">
                {location}
                <Span
                  onClick={() => handleHomeMap(lat, lng)}
                  size="md"
                  variant="primary"
                >
                  MOSTRAR EN EL MAPA
                </Span>
              </Paragraph>
            </div>
            <div className="icons">
              {serviceList &&
                serviceList.map((service) => (
                  <Icon width="sm" icon={service.icon} />
                ))}
            </div>
            <div className="product-description">
              <Paragraph size="md" variant="secondary">
                {descripcion}
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/productos/${id}`}
                >
                  <Span size="md" variant="primary">
                    Más...
                  </Span>
                </Link>
              </Paragraph>
              <Link style={{ width: "100%" }} to={`/productos/${id}`}>
                <Button
                  size="sm"
                  label="Ver Detalle"
                  variant={true}
                  onClick={() => {}}
                ></Button>
              </Link>
            </div>
          </div>
        </div>
      </LazyLoadComponent>
    </>
  );
};
