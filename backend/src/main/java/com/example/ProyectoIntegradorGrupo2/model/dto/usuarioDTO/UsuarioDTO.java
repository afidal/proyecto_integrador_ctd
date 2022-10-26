package com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO;

import com.example.ProyectoIntegradorGrupo2.model.Puntuacion;
import com.example.ProyectoIntegradorGrupo2.model.Reaccion;
import com.example.ProyectoIntegradorGrupo2.model.Reserva;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

@NoArgsConstructor
public class UsuarioDTO {


    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String ciudad;
    private String nombre_rol;

    /*private RoleDTO roleDTO;*/

}
