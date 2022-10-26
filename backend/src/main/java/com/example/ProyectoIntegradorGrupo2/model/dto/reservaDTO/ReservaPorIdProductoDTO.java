package com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReservaPorIdProductoDTO {
    private Long id;

    private LocalDate fechaInicioReserva;

    private LocalDate fechaFinReserva;
}
