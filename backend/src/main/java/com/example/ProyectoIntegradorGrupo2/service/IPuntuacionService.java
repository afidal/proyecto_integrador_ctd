package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO.PuntuacionDTO;

import java.util.List;

public interface IPuntuacionService {
    PuntuacionDTO agregarPuntuacion(PuntuacionDTO puntuacionDTO) throws BadRequestException;
    PuntuacionDTO obtenerPuntuacionPorId(Long id) throws ResourceNotFoundException;
    List<PuntuacionDTO> listarTodas();
    PuntuacionDTO editar(PuntuacionDTO puntuacionDTO)throws ResourceNotFoundException,BadRequestException;
    void eliminar(Long id)throws ResourceNotFoundException;
    List<PuntuacionDTO> findPuntuacionesByProductoId (Long id) throws ResourceNotFoundException;
    PuntuacionDTO findPuntuacionByProductoIdAndUsuarioId (Long id_producto, Long id_usuario) throws ResourceNotFoundException;
    void eliminarPuntuacionByProductoIdAndUsuarioId(Long id_producto, Long id_usuario) throws ResourceNotFoundException;
}
