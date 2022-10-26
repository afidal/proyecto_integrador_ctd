import React, { useState, useEffect } from "react";
import { Header } from "../organisms/Header/Header";
import { Footer } from "../organisms/Footer/Footer";
import { Heading } from "../atoms/Heading/Heading";
import { Products } from "../organisms/Products/Products";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import sinFavoritos from '../utils/images/sinFavoritos.jpeg'
import { urlAPI } from "../../global";
import { Mapa } from "./Mapa";
import { MapHome } from "../molecules/Map/MapHome/MapHome";
import "./Favorite.css";
import { Icon } from "../atoms/Icon/Icon";
import { Loader } from "../molecules/Loader/Loader";
export const Favorite = () => {
  const navigate = useNavigate();


  const [favoriteProducts, setFavoriteProducts] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setFavoriteProducts('');
    const userId = JSON.parse(localStorage.getItem('userData')).id;
    axios.get(`${urlAPI}reacciones/porUsuario/${userId}`).then((data) => {

      setFavoriteProducts('');

      data.data.forEach((element) => {
        // console.log(element);

        axios.get(`${urlAPI}productos/${element.producto_id}`).then((data) => {
          // console.log(data.data.id);
          setFavoriteLocations((prevData) => {
            return [
              ...prevData,
              {
                id: data.data.id,
                lat: data.data.latitud,
                lng: data.data.longitud,
              },
            ];
          });
          setFavoriteProducts(prevData => {
            // console.log(prevData);
            // if (prevData.length()>0) {
            //      prevData.forEach((element) => {
            //        if (element.id == data.data.id) {
            //          return prevData;
            //        } else {
            //          return [
            //            ...prevData,
            //            { id: data.data.id, product: data.data },
            //          ];
            //        }
            //      });
            // }

            if (!prevData) {


              return [{ id: data.data.id, product: data.data },
              ];
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
                  { id: data.data.id, product: data.data },
                ];
              }
              else {
                return prevData;
              }
            }
          })

        });

        //
      });
    });
  }, []);
  useEffect(() => {
    setSelectedProducts([]);
    if (favoriteProducts) {
      favoriteProducts.forEach((element) => {
        return setSelectedProducts(prevData => [...prevData, element.product])
      });
    }
  }, [favoriteProducts]);


  const handleBack = () => {
    navigate(-1)
  }

  const [showMap, setShowMap] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);
  const [randomValue, setRandomValue] = useState(0);
  useEffect(() => {
    if (windowWidth < 1120) {
      setShowMap(false);
    } else {
      setShowMap(true);
      setRandomValue(prevData => prevData + 1);
    }
  }, [windowWidth]);


  useEffect(() => {
    if (favoriteLocations.length > 0) {
      setLoader(false);
    } else {
      setTimeout(() => setLoader(false), 2500);
    }
  }, [favoriteLocations]);
  const [mapFavoriteData, setMapFavoriteData] = useState({});
  const [showSmallMap, setShowSmallMap] = useState(false);
  return (
    <>
      <div className="wrapper">
        <Header firstname={undefined} lastname={undefined} />
        {loader ? (
          <Loader />
        ) : (
          <>
            <div className="favorite-products">
              <div className="favorite-back">
                <Icon onClick={handleBack} icon={"backBlack"} width="lg" />
              </div>
              {showSmallMap ? (
                <MapHome
                  setShowMap={setShowSmallMap}
                  lat={mapFavoriteData.lat}
                  lng={mapFavoriteData.lng}
                />
              ) : (
                <></>
              )}

              {selectedProducts.length > 0 ? (
                <>
                  {" "}
                  <Products
                    setMapFavoriteData={setMapFavoriteData}
                    data={
                      selectedProducts && selectedProducts.length > 0
                        ? selectedProducts
                        : []
                    }
                  ></Products>
                </>
              ) : (
                <>
                  <div className="favorite-none">
                    <div className="none-favorite">
                      <div className="imagen-favorito-vacio">
                        <img src={sinFavoritos} alt="reservasVacias" />
                      </div>
                      <div className="texto-favorito-vacio">
                        <Heading title={"h2"} variant="secondary">
                          No tienes alojamientos guardados
                        </Heading>
                      </div>
                    </div>
                  </div>

                </>
              )}
            </div>
          </>
        )}
      </div>

      <>
        {favoriteLocations.length > 0 && showMap && (
          <div className="favorite-mapa">
            <Mapa
              randomProp={randomValue}
              favoriteLocations={favoriteLocations}
              favorite={true}
            />
          </div>
        )}
        {!favoriteLocations.length > 0 && (
          <div className="favorite-footer">
            <Footer />
          </div>
        )}
      </>
    </>
  );
};
