import React,{useState,useEffect,createContext} from 'react'
import { Header } from '../organisms/Header/Header'
import { Footer } from '../organisms/Footer/Footer'
import { CategoriesDesktop } from '../organisms/Categories/CategoriesDesktop'
import { DesktopHeader } from '../organisms/Header/Versions/DesktopHeader'
import { Products } from '../organisms/Products/Products'
import { Filter } from '../organisms/Filter/Filter'
import { Link } from "react-router-dom";
import { MapHome } from '../molecules/Map/MapHome/MapHome'
import products_data from '../organisms/Products/products_data.json'
import './Home.css'
import axios from 'axios'
import { urlAPI } from '../../global.js';
import { Paragraph } from '../atoms/paragraph/Paragraph'
import { Icon } from '../atoms/Icon/Icon'
import { ProductsPagination } from '../organisms/ProductsPagination/ProductsPagination'

export const Home = () => {

    const [productsData,setProductsData]=useState([])
    const [filterProducts,setFilterProducts]=useState([])
    const [mapHomeData,setMapHomeData]=useState({})
    const [showMap,setShowMap]=useState(false)
    const [filterTitle,setFilterTitle]=useState('Recomendaciones')
    const [reRender, setReRender] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
        
            axios.get(`${urlAPI}productos/todos`).then(data=>setProductsData(data.data)) 
         
    }, [filterProducts,currentPage]);
    
    
    
    return (
      <div className="wrapper">
        <Header firstname={undefined} lastname={undefined} />
        <div className="contenedor-pagina">
          {showMap ? (
            <MapHome
              setShowMap={setShowMap}
              lat={mapHomeData.lat}
              lng={mapHomeData.lng}
            />
          ) : (
            <></>
          )}
          <Filter
            reRender={reRender}
            setReRender={setReRender}
            setFilterTitle={setFilterTitle}
            setCurrentPage={setCurrentPage}
            setFilterProducts={setFilterProducts}
          />

          <CategoriesDesktop
            reRender={reRender}
            setReRender={setReRender}
            setCurrentPage={setCurrentPage}
            setFilterTitle={setFilterTitle}
            products={productsData}
            setFilterProducts={setFilterProducts}
          ></CategoriesDesktop>
          <ProductsPagination
            reRender={reRender}
            setReRender={setReRender}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            filterTitle={filterTitle}
            setShowMap={setShowMap}
            setMapHomeData={setMapHomeData}
            data={
              filterProducts && filterProducts.length > 0
                ? filterProducts
                : productsData
            }
          ></ProductsPagination>
          <Link to={"/mapa"}>
            <div className="show-mapa">
              <div className="show-mapa-container">
                <Paragraph variant="base" size="xs">
                  Mostrar Mapa
                </Paragraph>
                <Icon icon="mapa" />
              </div>
            </div>
          </Link>

          <Footer />
        </div>
      </div>
    );
}