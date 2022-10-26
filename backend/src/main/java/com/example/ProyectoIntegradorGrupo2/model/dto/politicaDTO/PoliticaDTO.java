package com.example.ProyectoIntegradorGrupo2.model.dto.politicaDTO;

import com.example.ProyectoIntegradorGrupo2.model.Producto;
import com.example.ProyectoIntegradorGrupo2.model.TipoDePoliticas;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Getter
@Setter
@ToString

public class PoliticaDTO {


    private Long id;


    private String descripcion;



    //private ProductoDTO productoDTO;


    private Long tipo_politica_id;

    public PoliticaDTO() {
    }
}
