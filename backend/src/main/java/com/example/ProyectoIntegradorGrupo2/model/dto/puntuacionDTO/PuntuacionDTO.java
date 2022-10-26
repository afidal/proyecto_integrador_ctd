package com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class PuntuacionDTO {

    private Long id;
    private int puntuacion;
    private Long producto_id;
    private Long usuario_id;

}
