package com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@NoArgsConstructor
public class UsuarioListarTodosDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String nombre_rol;
}
