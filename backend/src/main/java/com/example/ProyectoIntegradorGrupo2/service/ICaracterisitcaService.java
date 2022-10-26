package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO.CaracteristicasDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO.CaracteristicasTodasDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.ProductoCardDTO;

import java.util.List;
import java.util.Set;

public interface ICaracterisitcaService {
    List<CaracteristicasTodasDTO> listarTodas();
}
