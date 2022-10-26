import React, { useState, useEffect } from "react";
import "./Products.css";
import products_data from "./products_data.json";
import { Heading } from "../../atoms/Heading/Heading";
import { CardProduct } from "../../molecules/CardProduct/CardProduct";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { MockUp } from "../../molecules/MockUpCard/MockUp";
import { MockUpProduct } from "../../molecules/MockUpCard/MockUpProduct";
import { urlAPI } from "../../../global";
export const Products = ({
  setMapFavoriteData,
  data,
  setMapHomeData,
  setShowMap,
  filterTitle,
  reRender,
  setShowSmallMap,
}) => {
  const [mockUp, setMockUp] = useState(true);
  const [mockUpDinamic, setMockUpDinamic] = useState(true);
  const [likedProducts, setLikedProducts] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setMockUp(false);
    }, 2000);
    if (data.length > 0) {
      setMockUpDinamic(false);
    }

    setLikedProducts([]);
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
          setMockUpDinamic(false);
        })
      );
    }
    const filterTitle = document.getElementById("filterTitle");
    // window.scrollTo({top:480,behavior:'smooth'});
  }, [data]);
  useEffect(() => {
    setMockUp(true);
    // window.scrollTo({ top: 480, behavior: "smooth" });
    setTimeout(() => setMockUp(false), 1700);
  }, [reRender]);
  useEffect(() => {
    if (!mockUpDinamic && !mockUp) {
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
          <div className="product-cards-container">
            {data.map((product, idx) => {
              let descriptionPreview = product.descripcion.slice(0, 130);

              return (
                <CardProduct
                  setShowSmallMap={setShowSmallMap}
                  setMapFavoriteData={setMapFavoriteData}
                  setMapHomeData={setMapHomeData}
                  titulo={product.titulo}
                  url={product.imagenDTOList[0].url_img_producto}
                  descripcion={descriptionPreview}
                  location={
                    product.ciudad_id == 1
                      ? "San Carlos de Bariloche"
                      : product.ciudad_id == 2
                      ? "Buenos Aires"
                      : product.ciudad_id == 3
                      ? "Mendoza"
                      : "Córdoba"
                  }
                  category={
                    product.categoria_id == 1
                      ? "Hoteles"
                      : product.categoria_id == 2
                      ? "Hosteles"
                      : product.categoria_id == 3
                      ? "Departamentos"
                      : "Bed & Breakfast"
                  }
                  price={product.precio}
                  id={product.id}
                  rating={product.puntaje}
                  services={product.caracteristicasDTOList}
                  lat={product.latitud}
                  lng={product.longitud}
                  setShowMap={setShowMap}
                  likedProducts={likedProducts}
                  setLikedProducts={setLikedProducts}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
