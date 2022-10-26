package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO.PuntuacionDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reaccionDTO.ReaccionDTO;

import java.util.List;

public interface IReaccionService {

    ReaccionDTO agregarReaccion(ReaccionDTO reaccionDTO) throws BadRequestException;
    ReaccionDTO obtenerReaccionPorId(Long id) throws ResourceNotFoundException;
    List<ReaccionDTO> listarTodas();
    ReaccionDTO editar(ReaccionDTO reaccionDTO)throws ResourceNotFoundException,BadRequestException;
    void eliminar(Long id)throws ResourceNotFoundException;
    List<ReaccionDTO> findReaccionesByUsuarioId(Long id) throws ResourceNotFoundException;
    ReaccionDTO findReaccionByProductoIdAndUsuarioId (Long id_producto, Long id_usuario) throws ResourceNotFoundException;
    void eliminarReaccionByProductoIdAndUsuarioId(Long id_producto, Long id_usuario) throws ResourceNotFoundException;
}
