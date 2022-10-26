package com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CiudadYFechaReservaDTO {

    private Long id_ciudad;
    private LocalDate fechaInicioReserva;
    private LocalDate fechaFinReserva;
}
