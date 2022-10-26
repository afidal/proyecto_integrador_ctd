import React,{useState,useEffect} from 'react'
import { MobileCarousel } from './Versions/MobileCarousel'
import { TabletCarousel } from './Versions/TabletCarousel'
import { DesktopCarousel } from './Versions/DesktopCarousel'
import axios from 'axios'
import { urlAPI } from '../../../global'
import { useNavigate, useParams } from 'react-router-dom'
export const Carousel = (props) => {
    const [images,setImages]=useState([])
    const {id}=useParams()
    const navigate=useNavigate()
    const [likedProducts, setLikedProducts] = useState([]);
      const imagesTesteo=['https://picsum.photos/200/300','https://picsum.photos/200/300','https://picsum.photos/200/300','https://picsum.photos/200/300',];
    useEffect(() => {
        // console.log(props.product)
        

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
               
              })
            );
          }
         
        const {product}=props;
        if (product.imagenDTOList!==undefined) {
            product.imagenDTOList.forEach(element => {
                setImages((prevValue) => {
                  if (prevValue.indexOf(element.url_img_producto) == -1) {
                    return [...prevValue, element.url_img_producto];
                  } else {
                    return prevValue;
                  }
                });

                
            });
        }
       
        ;
    }, [props]);
    
    
    
    
     const [liked, setLiked] = useState(false);
       const handleFavorite = () => {
         if (!JSON.parse(localStorage.getItem("userData"))) {
           navigate("/login");
         }
         if (!liked) {
           axios({
             url: `${urlAPI}reacciones/agregar`,
             method: "POST",
             data: {
               usuario_id: JSON.parse(localStorage.getItem("userData")).id,
               producto_id: id,
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
             url: `${urlAPI}reacciones/eliminar/porProducto/${id}/porUsuario/${userId}`,
             method: "DELETE",
           }).then((res) => {
            setLiked(false)
             console.log("Se elimino el producto " + id);
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
    
    const [carouselDisplayed,setCarouselDisplayed]=useState(<></>)
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    // {console.log(images)}
    useEffect(() => {
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
        if(windowWidth <= 768){
            setCarouselDisplayed(
              <MobileCarousel
                handleFavorite={handleFavorite}
                liked={liked}
                setLiked={setLiked}
                likedProducts={likedProducts}
                images={images ? images : imagesTesteo}
              />
            );
        }
        else if(windowWidth<=1000){
            setCarouselDisplayed(
              <TabletCarousel
                handleFavorite={handleFavorite}
                liked={liked}
                setLiked={setLiked}
                likedProducts={likedProducts}
                images={images ? images : imagesTesteo}
              />
            );
        }
        else if(windowWidth>=1001){
            setCarouselDisplayed(
              <DesktopCarousel
                handleFavorite={handleFavorite}
                liked={liked}
                setLiked={setLiked}
                likedProducts={likedProducts}
                images={images ? images : imagesTesteo}
              />
            );
            
        }
        
        
        
        
        
        
        
    },[windowWidth,images,likedProducts,liked]);

  return (
    <>{carouselDisplayed}</>
  )
}
