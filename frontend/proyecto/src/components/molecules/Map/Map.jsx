import React,{useMemo,useEffect,useState} from 'react'
import {GoogleMap,useLoadScript,Marker,useGoogleMap} from '@react-google-maps/api'
import credentials from '../../../credentials'
import './Map.css'
import { Heading } from '../../atoms/Heading/Heading'
import { Icon } from '../../atoms/Icon/Icon'
export const Map = ({lat,lng,location,noTitle}) => {
    const {isLoaded}=useLoadScript({googleMapsApiKey:credentials.mapsKey})

    if(!isLoaded)return <div>Loading...</div>;
    return <LoadedMap lat={lat} lng={lng} location={location} noTitle={noTitle}/>

}
function LoadedMap({lat,lng,location,noTitle}){
    
    
    
    const[random,setRandom]=useState('1')
    
    // const MockUp={lat:-37.335028,lng:-59.136085,location:'Buenos Aires, Argentina'}
    useEffect(() => {
        setTimeout(()=> setRandom('2'),1)
    
    
    }, []);
    const center={lat:lat,lng:lng}
    const myLatLng = { lat:lat,lng:lng }
    
    var createMapOptions={
        panControl:false,
        mapTypeControl: false,
        scrollwheel: false,
        fullscreenControl: false,
        zoomControl:true,
        streetViewControl:false,
        
        
    }
    
    return (
        <div className='map-loaded'>
            {!noTitle&&
            <><div className='map-loaded-container'>
            <Heading title='h3' variant='primary' type='lg' >¿Dónde vas a estar?</Heading>
            </div><hr /></>}
            
            
            <div className='map-loaded-container'>
                {location&&<div className='map-icon-location'> <Icon icon='location' width='md' /> <Heading title='h4' variant='secondary' type='sm' >{location}</Heading></div>}
            <GoogleMap zoom={17}
        center={center}
        mapContainerClassName='map-container' options={createMapOptions} >
        <Marker position={myLatLng} key={random} />

    </GoogleMap>
    </div>
        </div>)
}

 