package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.CiudadYFechaReservaDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.DisponibilidadDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.ProductoCardDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.ProductoDTO;

import java.util.List;

public interface IProductoService {
    ProductoDTO agregarProducto(ProductoDTO productoDTO) throws BadRequestException;
    ProductoDTO obtenerProductoPorId(Long id) throws ResourceNotFoundException;
    List<ProductoCardDTO> listarTodos();
    List<ProductoCardDTO> listarTodosOrdenados();
    ProductoDTO editar(ProductoDTO productoDTO)throws ResourceNotFoundException,BadRequestException;
    void eliminar(Long id)throws ResourceNotFoundException;
    List<ProductoCardDTO> buscarProductosPorCategoria(Long id) throws ResourceNotFoundException;
    List<ProductoCardDTO> buscarProductosPorCiudad(Long id) throws ResourceNotFoundException;
    List<ProductoCardDTO> buscarProductosPorDisponibilidad(DisponibilidadDTO disponibilidadDTO) throws ResourceNotFoundException;
    List<ProductoCardDTO> buscarProductosPorCiudadYRangoFecha(CiudadYFechaReservaDTO ciudadYFechaReservaDTO)throws ResourceNotFoundException;
    List<ProductoCardDTO> listarProductosFavoritosByUsuarioId(Long id) throws ResourceNotFoundException;

}
