package com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReservaActualizarDTO {

    private Long id;
    @NotNull
    private LocalDate fechaInicioReserva;
    @NotNull
    private LocalDate fechaFinReserva;
    private double precioTotal;
    /*@NotNull
    private Long producto_id;*/
}
