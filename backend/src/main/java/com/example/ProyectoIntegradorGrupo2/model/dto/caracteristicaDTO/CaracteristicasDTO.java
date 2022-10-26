package com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO;

import com.example.ProyectoIntegradorGrupo2.model.Producto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString

public class CaracteristicasDTO {


    private Long id;

    private String titulo;

    private String nombre_icono;

    //private ProductoDTO productoDTO;

    public CaracteristicasDTO() {
    }
}
