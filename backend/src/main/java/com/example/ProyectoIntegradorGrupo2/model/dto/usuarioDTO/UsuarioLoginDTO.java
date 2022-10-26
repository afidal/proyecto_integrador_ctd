package com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@NoArgsConstructor
public class UsuarioLoginDTO {

    private String email;
    private String password;

}
