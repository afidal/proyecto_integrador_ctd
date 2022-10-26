package com.example.ProyectoIntegradorGrupo2.model.dto.reaccionDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@ToString
public class ReaccionDTO {

    private Long id;
    private boolean favorito;
    private Long usuario_id;
    private Long producto_id;

}
