package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.Usuario;
import com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO.*;

import java.util.List;

public interface IUsuarioService {
    UsuarioDTO agregarUsuario(UsuarioDTO usuarioDTO) throws BadRequestException;
    UsuarioGETByIdOrEmailDTO obtenerUsuarioPorId(Long id) throws ResourceNotFoundException;
    List<UsuarioListarTodosDTO> listarTodos();
    UsuarioEditarDTO editar(UsuarioEditarDTO usuarioEditarDTO)throws ResourceNotFoundException,BadRequestException;
    void eliminar(Long id)throws ResourceNotFoundException;
    UsuarioGETByIdOrEmailDTO obtenerUsuarioPorEmail(UsuarioPorEmailDTO usuarioPorEmailDTO) throws ResourceNotFoundException;
    Usuario getUsuario(Long id);


}
