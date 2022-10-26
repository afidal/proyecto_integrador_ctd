package com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenYIdDeRegistroDTO {

    private Long id;
    private String token_acceso_registro;


}
