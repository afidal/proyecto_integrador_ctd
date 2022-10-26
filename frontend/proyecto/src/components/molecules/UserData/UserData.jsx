import React,{useState,useEffect} from 'react'
import { Heading } from '../../atoms/Heading/Heading'
import { Input } from '../../atoms/Input/Input'
import  Label  from '../../atoms/Label/Label'
import { SpacerHorizontal } from '../../atoms/Spacer/SpacerHorizontal'
import { InputLabel } from '../InputLabel/InputLabel'
import './UserData.css'
export const UserData = (props) => {
    const[user,setUser]=useState({})
    // const [dataForm,setDataForm]=useState({vacunadoCovid:false,mensajeUsuario:''})
    // const [checkValue,setCheckValue]=useState()
   useEffect(() => {
      if (props.submitData) {
          console.log(props.submitData.vacunadoCovid);
      }
   }, [props.submitData]);
    useEffect(() => {
      if (localStorage.getItem('userData')) {
        setUser({nombre:JSON.parse(localStorage.getItem('userData')).nombre,apellido:JSON.parse(localStorage.getItem('userData')).apellido,email:JSON.parse(localStorage.getItem('userData')).email})
      }
      else{
        setUser({nombre:'nombre',apellido:'apellido',email:'email@gmail.com'})
      }

      
      
      
    }, []);
  
    const handleChange=(e)=>{
      
        props.setSubmitData(prevData=>({...prevData,vacunadoCovid:!prevData.vacunadoCovid}))
       
    }
    const handleChangeText=(e)=>{
        props.setSubmitData(prevData=>({...prevData,mensajeUsuario:e.target.value}))
    }
  return (
    <div className="userData">
      <Heading title="h2" type="lg" variant="primary">
        Completá tus datos
      </Heading>
      <SpacerHorizontal height={"md"} />
      <div className="userData-container">
        <div className="userData-content">
          <InputLabel
            value={user.nombre}
            label="Nombre"
            disabled={true}
          ></InputLabel>
          <InputLabel
            value={user.apellido}
            label={"Apellido"}
            disabled={true}
          ></InputLabel>
          <InputLabel
            value={user.email}
            label={"Correo electronico"}
            disabled={true}
          ></InputLabel>
          <InputLabel
            label={"Ciudad de residencia"}
            placeholder="Ej: Buenos aires"
          ></InputLabel>
          <div className="vaccinated-container">
            <input
              checked={props.submitData?props.submitData.vacunadoCovid:false}
              onChange={handleChange}
              id="vaccinated"
              type={"checkbox"}
            ></input>
            <Label
              id={"vaccinated"}
              label="¿Estas vacunado contra el COVID-19?"
            ></Label>
          </div>
          <div className="additional-info">
            <Label id={"vaccinated"} label="Informacion adicional"></Label>

            <SpacerHorizontal height={"xs"} />
            <textarea
              onChange={handleChangeText}
              value={props.submitData?props.submitData.mensajeUsuario:""}
              placeholder="Ingresa aclaraciones sobre tu reserva"
              name=""
              id="additional-info"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
