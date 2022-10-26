package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.categoriaDTO.CategoriaDTO;

import java.util.List;

public interface ICategoriaService {

    CategoriaDTO agregarCategoria(CategoriaDTO categoriaDTO) throws BadRequestException;
    CategoriaDTO obtenerCategoriaPorId(Long id) throws ResourceNotFoundException;
    List<CategoriaDTO> listarTodas();
    CategoriaDTO editar(CategoriaDTO categoriaDTO)throws ResourceNotFoundException;
    void eliminar(Long id)throws ResourceNotFoundException;
}
