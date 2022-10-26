package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.ciudadDTO.CiudadDTO;

import java.util.List;

public interface ICiudadService {
    CiudadDTO agregarCiudad(CiudadDTO ciudadDTO) throws BadRequestException;
    CiudadDTO obtenerCiudadPorId(Long id) throws ResourceNotFoundException;
    List<CiudadDTO> listarTodas();
    CiudadDTO editar(CiudadDTO ciudadDTO)throws ResourceNotFoundException;
    void eliminar(Long id)throws ResourceNotFoundException;
}
