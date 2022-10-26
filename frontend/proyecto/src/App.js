import React,{useState} from 'react'
 import { Routes, Route, BrowserRouter } from "react-router-dom";
 import { Home } from "./components/pages/Home";
 import { Login } from './components/pages/Login';
 import { SignUp } from "./components/pages/SignUp";
 import {Product} from './components/pages/Product';
import {Mapa} from './components/pages/Mapa'
import {Reserve} from './components/pages/Reserve'
import { SuccessBooking } from "./components/pages/SuccessBooking";
import { SuccessAdd } from "./components/pages/SuccessAdd";
import {Favorite} from './components/pages/Favorite'
import {ProductsPagination} from './components/organisms/ProductsPagination/ProductsPagination';
import { Error404 } from './components/pages/Error404';
import { Administracion } from './components/pages/Administracion';
import { MyReservePage } from './components/pages/MyReservePage';

function App() {
  const [failReserve,setFailReserve] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <Login
                setFailReserve={setFailReserve}
                failReserve={failReserve}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUp
                setFailReserve={setFailReserve}
                failReserve={failReserve}
              />
            }
          />
          <Route
            path="/productos/:id"
            element={<Product setFailReserve={setFailReserve} />}
          />
          <Route
            path="/productos/:id/reserva"
            element={<Reserve setFailReserve={setFailReserve} />}
          ></Route>
          <Route path="/mapa" element={<Mapa />}></Route>
          <Route path="/reserva-exitosa" element={<SuccessBooking />}></Route>
          <Route path="/favoritos" element={<Favorite />}></Route>
          <Route
            path="/productsPagination"
            element={<ProductsPagination />}
          ></Route>
          <Route path="/:id/misreservas" element={<MyReservePage />}></Route>
          <Route path="/administracion" element={<Administracion />}></Route>
          <Route path="/producto-exitoso" element={<SuccessAdd />}></Route>
          <Route path="*" element={<Error404/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;