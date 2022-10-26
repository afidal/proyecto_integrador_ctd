import axios from 'axios';
import React from 'react'
import ReactStars from "react-rating-stars-component";
import { useLocation } from 'react-router-dom';
import { urlAPI } from '../../../global';
export const Stars = ({ setRating, productId, edit, userId, setScored,scored }) => {
  const ratingChanged = (newRating) => {
    // console.log(productId);
    console.log(newRating);
    
    axios({
      url: `${urlAPI}puntuaciones/agregar`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: {
        puntuacion: newRating,
        producto_id: productId,
        usuario_id: userId,
      },
    })
      .then((res) =>{
       window.location.reload()
      } )
      .catch((err) => console.log(err));
    setRating("2");
  };

  return (
    <ReactStars
      edit={edit}
      count={5}
      onChange={ratingChanged}
      size={20}
      activeColor="#FBC02D"
    />
  );
};
Stars.propTypes={
    edit:true,
}


