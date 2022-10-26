import React,{useState,useEffect} from "react";
import "./CategoriesDesktop.css";
import { Heading } from "../../atoms/Heading/Heading";
import { CardCategory } from "../../molecules/CardCategory/CardCategory";
// import categories_data from "./categories_data.json";
import { MockUp } from "../../molecules/MockUpCard/MockUp";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { urlAPI } from '../../../global.js';


export const CategoriesDesktop = ({products,setFilterProducts,setFilterTitle,setCurrentPage,setReRender}) => {
  const [categoriesData,setCategoriesData]=useState({})
  const [mockUpFixed,setMockUpFixed]=useState(true)
  const [mockUpDinamic,setMockUpDinamic]=useState(true)
  const [prevId,setPrevId]=useState()
  const [totalPerCategory,setTotalPerCategory]=useState({hoteles:0,hostels:0,departamentos:0,'bed & breakfast':0})
  useEffect(() => {
    setTotalPerCategory({hoteles:0,hostels:0,departamentos:0,'bed & breakfast':0})
    if (products) {
     
      const arrayId=products.map(item=>item.categoria_id)
      
      arrayId.forEach(element => {
        
          if (element===1) {
            setTotalPerCategory((prevData)=>{
              
              return {...prevData,hoteles:prevData.hoteles+1}})
          }
          if (element===2) {
            setTotalPerCategory((prevData)=>{
              
              return {...prevData,hostels:prevData.hostels+1}})
          }
          if (element===3) {
            setTotalPerCategory((prevData)=>{
              
              return {...prevData,departamentos:prevData.departamentos+1}})
          }
          else if (element===4) {
            setTotalPerCategory((prevData)=>{
              
              return {...prevData,'bed & breakfast':prevData['bed & breakfast']+1}})
          }
             
          
          
      });
    }

    axios.get(`${urlAPI}categorias/todas`).then(res=>{
  
  setCategoriesData(res.data)
  setMockUpDinamic(false)
  
})
    setTimeout(()=>setMockUpFixed(false),1500)
  }, [products]);
  const navigate=useNavigate()
  const handleCategoryProducts=(id,title)=>{
    const filterTitle=document.getElementById('filterTitle')
    if (id===prevId) { 
      setReRender((prevValue) => prevValue + 1);
      setCurrentPage(1)
      axios.get(`${urlAPI}productos/todos`).then(res=>setFilterProducts(res.data))
      setFilterTitle('Recomendaciones')
      
      // navigate("/")
      //console.log(window.innerWidth);
      if (window.innerWidth<=768) {
        filterTitle.scrollIntoView({behavior: 'smooth'})
      }
      else{
        console.log('entro');
        // window.scrollTo({left:0,top:470,behavior:'smooth'})
      }
      
      return setPrevId(undefined)
    }
    
    else{
       setReRender((prevValue) => prevValue + 1);
      setCurrentPage(1);
       axios.get(`${urlAPI}productos/porCategoria/${id}`).then(data=>setFilterProducts(data.data))
       setFilterTitle(title)
      
       if (window.innerWidth<=768) {
        filterTitle.scrollIntoView({behavior: 'smooth'})
      }
      else{
        // window.scrollTo({left:0,top:470,behavior:'smooth'})
      }
      
      return setPrevId(id)
    }
  }
  return (
    <div className="categories-container">
      <section className="categories-content">
      <div className="category-title">
      <Heading title="h2" type="lg" variant="primary" > Busca por tipo de alojamiento</Heading>
      </div>
          
        {mockUpDinamic ?<div className="cards-container">
          <MockUp noContent={true}/><MockUp noContent={true}/><MockUp noContent={true}/><MockUp noContent={true}/>
          
      </div>:<>
        
      <div className="cards-container">
        
          {categoriesData.map((card,index)=>{
            // console.log(card.titulo.toLowerCase());
            
            return <div onClick={()=>handleCategoryProducts(card.id,card.titulo)}><CardCategory id={card.id} titulo={card.titulo} url={card.url_imagen} descripcion={`${totalPerCategory[card.titulo.toLowerCase()]} ${card.titulo}`} /></div>
          })}
          
      </div></>}
        <span id="filterTitle"></span>
    </section>
    </div>
  );
};
