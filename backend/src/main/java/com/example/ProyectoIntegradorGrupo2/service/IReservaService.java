package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO.*;

import java.util.List;

public interface IReservaService {
    ReservaDTO agregarReserva(ReservaDTO reservaDTO) throws BadRequestException, ResourceNotFoundException;
    ReservaDTO obtenerReservaPorId(Long id) throws ResourceNotFoundException;
    List<ReservaListarTodasDTO> listarTodas();
    ReservaActualizarDTO editar(ReservaActualizarDTO reservaActualizarDTO)throws ResourceNotFoundException,BadRequestException;
    void eliminar(Long id)throws ResourceNotFoundException;
    List<ReservaPorIdProductoDTO> buscarReservasPorProductoId(Long id) throws ResourceNotFoundException;
    List<ReservaPorIdUsuarioDTO> buscarReservasPorUsuarioId(Long id) throws ResourceNotFoundException;
}
