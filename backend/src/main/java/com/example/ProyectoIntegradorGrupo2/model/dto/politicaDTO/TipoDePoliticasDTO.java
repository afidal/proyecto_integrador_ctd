package com.example.ProyectoIntegradorGrupo2.model.dto.politicaDTO;

import com.example.ProyectoIntegradorGrupo2.model.dto.politicaDTO.PoliticaDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString

public class TipoDePoliticasDTO {


    private Long id;

    private String nombre_tipo_politica;


    private List<PoliticaDTO> politicaListDTO = new ArrayList<>();

    public TipoDePoliticasDTO() {
    }
}
