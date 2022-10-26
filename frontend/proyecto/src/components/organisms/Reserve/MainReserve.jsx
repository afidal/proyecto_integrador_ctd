import React,{useState,useEffect} from 'react'
import { ReserveDesktop } from './Versions/ReserveDesktop'
import {ReserveTablet} from './Versions/ReserveTablet'
import { ReserveMobile } from './Versions/ReserveMobile'
import { useParams } from 'react-router-dom'
import { Payment } from '../../molecules/Payment/Payment'
import axios from 'axios'
import { urlAPI } from '../../../global'

export const MainReserve = ({setFailReserve}) => {
    const {id}=useParams()
    const [productData,setProductData]=useState([])
    const [categoria, setCategoria] = useState('cargando');
    const [locationData, setLocationData] = useState();
    const [reservedDays, setReservedDays] = useState({startDate: {day:'',month:'',year:''}, endDate: {day:'',month:'',year:''}});
    const [getDate, setGetDate] = useState([]);
    const [submitData,setSubmitData]=useState([])
    const [showPayment,setShowPayment]=useState(false)
    const [price,setPrice]=useState(0)
    const [stars,setStars]=useState(0)
     useEffect(() => {
            
            setSubmitData([])
            window.scrollTo(0, 0);
            axios.get(`${urlAPI}productos/${id}`).then(data => {
                console.log(data.data);
            setCategoria(data.data.categoria_id == 1 ? 'Hoteles' : data.data.categoria_id == 2 ? 'Hosteles' : data.data.categoria_id == 3 ? 'Departamentos' : 'Bed & Breakfast')
            setProductData(data.data)
            setLocationData(data.data.ciudad_id==1?'San Carlos de Bariloche, Argentina':data.data.ciudad_id==2?'Buenos Aires, Argentina':data.data.ciudad_id==3?'Mendoza, Argentina':'Córdoba, Argentina')
        })
            
           
            
             axios.get(`${urlAPI}reservas/porProductoId/${id}`).then(data=>setGetDate(data.data))
            //  
        // setSubmitData({producto_id:Number(id)?Number(id):0,usuario_id:JSON.parse(localStorage.getItem('userData')).id})
        
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

  }, [id]);
  useEffect(() => {
    if (submitData.fechaInicioReserva && submitData.fechaFinReserva) {
        
        console.log(
          (new Date(submitData.fechaInicioReserva).getTime() -
            new Date(submitData.fechaFinReserva).getTime()) /
            (1000 * 3600 * 24)
        );
        console.log(new Date(submitData.fechaFinReserva));
      setPrice(
        (productData.precio *
          (((new Date(submitData.fechaInicioReserva) -
            new Date(submitData.fechaFinReserva))) /
          (1000 * 3600 * 24))*-1)+productData.precio
      );
    }
  }, [submitData]);
 
  useEffect(() => {
    console.log(stars);
  }, [stars]);
  

    const [reserveDisplayed, setReserveDisplayed] = useState(
      <>
        <ReserveDesktop
          stars={stars}
          price={price}
          setShowPayment={setShowPayment}
          reservedDays={reservedDays}
          setReservedDays={setReservedDays}
          productData={productData}
          categoria={categoria}
          locationData={locationData}
        />
      </>
    );
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    useEffect(() => {
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    useEffect(() => {
      console.log(price);
        if(windowWidth <= 800){
            setReserveDisplayed(
              <>
                <ReserveMobile
                  stars={stars}
                  price={price}
                  setShowPayment={setShowPayment}
                  setSubmitData={setSubmitData}
                  submitData={submitData}
                  setFailReserve={setFailReserve}
                  reservedDays={reservedDays}
                  reservedDates={getDate}
                  setReservedDays={setReservedDays}
                  productData={productData}
                  categoria={categoria}
                  locationData={locationData}
                />
              </>
            );
        }
        else if(windowWidth<=1365){
            setReserveDisplayed(
              <ReserveTablet
                stars={stars}
                price={price}
                setShowPayment={setShowPayment}
                setSubmitData={setSubmitData}
                submitData={submitData}
                setFailReserve={setFailReserve}
                reservedDays={reservedDays}
                reservedDates={getDate}
                setReservedDays={setReservedDays}
                productData={productData}
                categoria={categoria}
                locationData={locationData}
              />
            );
        }
        else if(windowWidth>=1366){
            setReserveDisplayed(
              <ReserveDesktop
                stars={stars}
                price={price}
                setShowPayment={setShowPayment}
                setSubmitData={setSubmitData}
                submitData={submitData}
                setFailReserve={setFailReserve}
                reservedDays={reservedDays}
                reservedDates={getDate}
                setReservedDays={setReservedDays}
                productData={productData}
                categoria={categoria}
                locationData={locationData}
              />
            );

        }
        
        
    },[windowWidth,reservedDays,productData,submitData,price]);


    

  return (
    <>
      {showPayment && <Payment placeName={productData.titulo} price={price} submitData={submitData} setShowPayment={setShowPayment} />}
      {reserveDisplayed}
    </>
  );
}
