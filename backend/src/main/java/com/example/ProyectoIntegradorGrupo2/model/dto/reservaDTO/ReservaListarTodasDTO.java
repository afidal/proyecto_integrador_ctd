package com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReservaListarTodasDTO {

    private Long id;

    private LocalDate fechaInicioReserva;

    private LocalDate fechaFinReserva;

    private Long producto_id;
}
