import React,{useState,useEffect} from 'react'
import Label from '../Label/Label'
import { SpacerHorizontal } from '../Spacer/SpacerHorizontal'
import './SelectPicker.css'
export const SelectPicker = ({submitData,setSelectValue,selected}) => {
  
  
  const handleChange=(value)=>{
    console.log(value);
    setSelectValue(value)
  }
  return (
    <div className="selectPicker">
      <Label required={true} label="Indica tu horario estimado de llegada" />
      <SpacerHorizontal height={"xxs"} />
      <select
        
        onChange={handleChange}
        name=""
        id="selectTime"
      >
        <option disabled selected>
          Seleccionar hora de llegada
        </option>
        <option className="options">01:00 AM</option>
        <option className="options">02:00 AM</option>
        <option className="options">03:00 AM</option>
        <option className="options">04:00 AM</option>
        <option className="options">05:00 AM</option>
        <option className="options">06:00 AM</option>
        <option className="options">07:00 AM</option>
        <option className="options">08:00 AM</option>
        <option className="options">09:00 AM</option>
        <option className="options">10:00 AM</option>
        <option className="options">11:00 AM</option>
        <option className="options">12:00 AM</option>
        <option className="options">13:00 PM</option>
        <option className="options">14:00 PM</option>
        <option className="options">15:00 PM</option>
        <option className="options">16:00 PM</option>
        <option className="options">17:00 PM</option>
        <option className="options">18:00 PM</option>
        <option className="options">19:00 PM</option>
        <option className="options">20:00 PM</option>
        <option className="options">21:00 PM</option>
        <option className="options">22:00 PM</option>
        <option className="options">23:00 PM</option>
        <option className="options">00:00 PM</option>
      </select>
    </div>
  );
}
