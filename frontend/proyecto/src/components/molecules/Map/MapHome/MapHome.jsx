import React,{useMemo,useEffect,useState} from 'react'
import { Map } from '../Map'
import { Icon } from '../../../atoms/Icon/Icon'
import { MockUp } from '../../MockUpCard/MockUp'
import './MapHome.css'
export const MapHome = ({lat,lng,setShowMap}) => {
    const latitud=-41.133473922619125;
    const longitud=-71.3167240322848
    const [data,setData]=useState({longitud:-71.3167240322848,latitud:-41.133473922619125})
    const [fixedMockUp,setFixedMockup]=useState(true)
    useEffect(() => {
        
        if (lat) {
           setData({longitud:lng,latitud:lat})
          //console.log(data);
           setTimeout(()=>setFixedMockup(false),1500)
        }
        
    }, [lat,lng]);
  return (
      <>
      <div className='mapHome'>
        <div className='mapHome-container'>
         {fixedMockUp?<MockUp width='100%' height='100%'/>:
         <Map lng={data.longitud} lat={data.latitud} noTitle={true}/>}   
            
        <span className='mapHome-close-watch-more'><Icon onClick={()=>setShowMap(false)} icon='closeBlack' width='lg' /></span> 
        </div>
     </div>
     
     </>
  )
}
