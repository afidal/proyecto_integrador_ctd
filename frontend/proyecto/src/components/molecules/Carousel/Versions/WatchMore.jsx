import React,{useState,useEffect} from 'react'
import { map } from 'rsuite/esm/utils/ReactChildren';
import { Paragraph } from '../../../atoms/paragraph/Paragraph';
import classNames from 'classnames';
import './WatchMore.css'
import { Icon } from '../../../atoms/Icon/Icon';
export const WatchMore = ({images,setShow,show}) => {
    useEffect(() => {
        if (images!=undefined) {
            setMainImage(images[0])
        }
        
        
    }, [images]);
    const WatchMoreClassNames=(idx)=>classNames('caja', 'caja-otras',{
        'selected':mainImage==images[idx]
    })
    
    const [mainImage,setMainImage]=useState()
    const handleMainImage=(key)=>setMainImage(images[key])
    const handleNextImage=()=>{
        let imagePosition=0;
        
        if(images.indexOf(mainImage)+1<images.length){
            imagePosition=images.indexOf(mainImage)+1
        }
        setMainImage(images[imagePosition])}
        const handleBackImage=()=>{
        let imagePosition=0
        if(images.indexOf(mainImage)===0){
            imagePosition=images.length-1
        }
        else{
            imagePosition=images.indexOf(mainImage)-1
        }
        
            
        
        setMainImage(images[imagePosition])}
  return (<>
    {/* <section> */}
         {show&&<div className='watch-more-general'>
    
    
    <div className="watch-more-general-container">
        
        </div>
        <div className='watch-more-container'>
        <div className="caja caja-1">
             <img src={mainImage} alt="" />
                <span className='close-watch-more'><Icon onClick={()=>setShow(false)} icon='closeBlack' width='lg' /></span> 
                <span className='next-watch-more' > <Icon onClick={handleNextImage} icon='rightArrow' width='md' /> </span>
                <span className='back-watch-more' > <Icon onClick={handleBackImage} icon='back' width='lg' /> </span>
                <div className="contador"><span className='counter-background'><Paragraph variant='base' size='lg'>{images.indexOf(mainImage)+1}/{images.length}</Paragraph></span></div>
              </div>
         
            {images.map((image,idx)=><div className={WatchMoreClassNames(idx)} onClick={()=>handleMainImage(idx)} > <img src={image} alt="" /> </div>)}
                
               
                {/* <div className="caja caja-otras" onClick={()=>handleMainImage(0)} > <img src={imagesArray[0].toString()} alt="" /> </div>
                <div className="caja caja-otras" onClick={()=>handleMainImage(1)} >{imagesArray[1]}</div>
                <div className="caja caja-otras" onClick={()=>handleMainImage(2)} >{imagesArray[2]}</div>
                <div className="caja caja-otras" onClick={()=>handleMainImage(3)} >{imagesArray[3]}</div> */}
                
        </div>
    </div>}
  
    {/* </section> */}
   
    
  </>
    
  )
}
