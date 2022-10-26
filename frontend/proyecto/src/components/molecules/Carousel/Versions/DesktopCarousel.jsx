import React,{useState,useEffect} from 'react'
import product1 from '../../../utils/images/productImg1.png'
import product2 from '../../../utils/images/productImg2.jpg'
import product3 from '../../../utils/images/productImg3.jpg'
import product4 from '../../../utils/images/productImg4.jpg'
import product5 from '../../../utils/images/productImg5.jpg'
import {FacebookShareButton,TwitterShareButton, WhatsappIcon, WhatsappShareButton,LinkedinIcon,LinkedinShareButton, TwitterIcon} from 'react-share'
import { FacebookIcon } from 'react-share'
import {WatchMore} from './WatchMore'
import { Icon } from "../../../atoms/Icon/Icon";
import { Paragraph } from "../../../atoms/paragraph/Paragraph";
import './DesktopCarousel.css'
import { MockUp } from '../../MockUpCard/MockUp'
import { useLocation, useParams } from 'react-router-dom'
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
export function DesktopCarousel(props){
   const { id } = useParams();
    // const imagesLocal=[product1,product2,product3,product4,product5]
   
    useEffect(() => {
      
      console.log(props.likedProducts);
      console.log(id);
      const likedProducts=props.likedProducts
      if (likedProducts.indexOf(Number(id))!=-1) {
        props.setLiked(true)
      }
    }, [props.likedProducts]);
    const images=props.images
   
    
    
    const [show,setShow]=useState(false)
    const [load,setLoad]=useState(true)
    const [share,setShare]=useState(false)
    const location=useLocation().pathname
    useEffect(() => {
        setTimeout(()=>{
          if (props.images) {
            if (props.images.length>3) {
              setLoad(false);
            }
            
          }
          },2000)
    }, [props.images]);
    const Share=()=>{
      return( <div className='desktop-share-icons'>
        <FacebookShareButton style={{display:'block'}} url={`https://www.digitalbooking.shop/productos/${id}`} quote='Mira este producto!!!' hashtag='#booking'>
            <FacebookIcon  size={30} logoFillIcon='white' round={true} ></FacebookIcon>
        </FacebookShareButton>
        <WhatsappShareButton style={{display:'block'}} className='icono'  url={`https://www.digitalbooking.shop/productos/${id}`} >
            <WhatsappIcon   size={30} logoFillIcon='white' round={true}  >
            </WhatsappIcon>
        </WhatsappShareButton>
        <TwitterShareButton style={{display:'block'}} className='icono' url={`https://www.digitalbooking.shop/productos/${id}`}>
            <TwitterIcon  size={30} logoFillIcon='white' round={true}></TwitterIcon>
        </TwitterShareButton>
        <LinkedinShareButton style={{display:'block'}} className='icono' url={`https://www.digitalbooking.shop/productos/${id}`}>
            <LinkedinIcon  size={30} logoFillIcon='white' round={true}></LinkedinIcon>
        </LinkedinShareButton>
    </div>)
    }
    const DesktopCarouselMockUp=()=>{
      return(<>
         <div className='desktop-icons-mockUp'>
            <div className='desktop-icons-container-mockUp'>
              <div style={{width:'40px', height:'40px'}} >
                <MockUp  width='100%' height='100%' />
              </div>
              
              <div style={{width:'40px',height:'40px'}} >
                <MockUp width='100%' height='100%' />
              </div>
            </div>
         </div>

        <div className='desktopCarousel-container-mockUp'>
    
      <div className="desktopCarousel-image-mockUp desktopCarousel-image-mockUp-1">     <MockUp width='100%' height='100%'/></div>
      <div className="desktopCarousel-image-mockUp desktopCarousel-image-mockUp-others"><MockUp width='100%' height='100%'/></div>
      <div className="desktopCarousel-image-mockUp desktopCarousel-image-mockUp-others"><MockUp width='100%' height='100%'/></div>
      <div className="desktopCarousel-image-mockUp desktopCarousel-image-mockUp-others"><MockUp width='100%' height='100%'/></div>
      <div className="desktopCarousel-image-mockUp desktopCarousel-image-mockUp-others"><MockUp width='100%' height='100%'/></div>
    
  </div>
  </>)
    }

    useEffect(() => {
      console.log(props.liked);
    }, [props.liked]);
  return (
    <>
      {load ? (
        <DesktopCarouselMockUp />
      ) : (
        <div className="desktopCarousel">
          <WatchMore images={images} setShow={setShow} show={show} />
          <div className="desktop-icons">
            <div className="desktop-icons-container">
              <div className="desktop-icons-content">
                
                <Icon
                  width="lg"
                  icon="share"
                  onClick={() => setShare(!share)}
                />
                <Icon
                  width="lg"
                  icon={props.liked?'favorite':"bEmptyHeart"}
                  onClick={()=>props.handleFavorite()}
                />
              </div>
            </div>
          </div>
          <div className="desktopCarousel-container">
            {share && <Share />}
            {images.map((image, id) => (
              <div
                className={`desktopCarousel-image desktopCarousel-image-${
                  id + 1
                } `}
              >
                {" "}
                <LazyLoadImage
                  effect="blur"
                  width={"100%"}
                  height="100%"
                  src={image}
                  alt=""
                />{" "}
              </div>
            ))}
            <div className="watch-more">
              <Paragraph onClick={() => setShow(true)} variant="base" size="lg">
                Ver más
              </Paragraph>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DesktopCarouselMockUp(){
  
}