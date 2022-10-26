import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import product1 from '../../../utils/images/productImg1.png'
import product2 from '../../../utils/images/productImg2.png'
import product3 from '../../../utils/images/productImg3.jpg'
import product4 from '../../../utils/images/productImg4.jpg'
import product5 from '../../../utils/images/productImg5.jpg'
import { Icon } from "../../../atoms/Icon/Icon";
import { Paragraph } from "../../../atoms/paragraph/Paragraph";
import './MobileCarousel.css'
import {FacebookShareButton,TwitterShareButton, WhatsappIcon, WhatsappShareButton,LinkedinIcon,LinkedinShareButton, TwitterIcon} from 'react-share'
import { FacebookIcon } from 'react-share'
import { MockUp } from "../../MockUpCard/MockUp";
import { useParams } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export function MobileCarousel(props) {
   const images=props.images
    const { id } = useParams();
  
  const imagesLocal=[product1,product2,product3,product4,product5]
  var settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:3500,
    
    
  };
  const Share=()=>{
      return (
        <div className="mobile-share-icons">
          <FacebookShareButton
            style={{ display: "block" }}
            url={`https://www.digitalbooking.shop/productos/${id}`}
            quote="Mira este producto!!!"
            hashtag="#booking"
          >
            <FacebookIcon
              size={30}
              logoFillIcon="white"
              round={true}
            ></FacebookIcon>
          </FacebookShareButton>
          <WhatsappShareButton
            style={{ display: "block" }}
            className="icono"
            url={`https://www.digitalbooking.shop/productos/${id}`}
          >
            <WhatsappIcon
              size={30}
              logoFillIcon="white"
              round={true}
            ></WhatsappIcon>
          </WhatsappShareButton>
          <TwitterShareButton
            style={{ display: "block" }}
            className="icono"
            url={`https://www.digitalbooking.shop/productos/${id}`}
          >
            <TwitterIcon
              size={30}
              logoFillIcon="white"
              round={true}
            ></TwitterIcon>
          </TwitterShareButton>
          <LinkedinShareButton
            style={{ display: "block" }}
            className="icono"
            url={`https://www.digitalbooking.shop/productos/${id}`}
          >
            <LinkedinIcon
              size={30}
              logoFillIcon="white"
              round={true}
            ></LinkedinIcon>
          </LinkedinShareButton>
        </div>
      );
    }

 // const imagesLocal=[product1,product2,product3,product4,product5]

 useEffect(() => {
   console.log(props.likedProducts);
   console.log(id);
   const likedProducts = props.likedProducts;
   if (likedProducts.indexOf(Number(id)) != -1) {
     props.setLiked(true);
   }
 }, [props.likedProducts]);


 const [show, setShow] = useState(false);
 const [load, setLoad] = useState(true);
 const [share, setShare] = useState(false);

 useEffect(() => {
   setTimeout(() => {
     if (props.images) {
       if (props.images.length > 3) {
         setLoad(false);
       }
     }
   }, 2000);
 }, [props.images]);
  return (<>
  {load?<MockUp width='100%' height='380px'/>:<div className="mobileCarousel">
           <div className="mobileCarousel-container">
             {share&&<Share/>}
            <Slider {...settings}>
                 {images.map((image,id)=><div className="mobileCarousel-container" key={id}>
                     <LazyLoadImage effect="blur" width='100%' height='380px' src={image} alt="" />
                     <div className="counter-carousel">
                     <Paragraph variant="base" >{id+1}/{images.length}</Paragraph>
                     </div>
                     </div>)}
             </Slider>
             <div className="carousel-icons" >
                 <Icon width="md" icon="share" onClick={()=>setShare(!share)} />
                 <Icon width="md" icon={props.liked?'favorite':'bEmptyHeart'} onClick={()=>props.handleFavorite()}/>
             </div>
            </div>
      
     </div>}
   
  </>
    
  );
}
