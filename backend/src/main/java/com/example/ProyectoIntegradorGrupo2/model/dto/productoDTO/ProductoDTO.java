package com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO;

import com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO.ReservaDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO.CaracteristicasDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.imagenDTO.ImagenDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.politicaDTO.PoliticaDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO.PuntuacionDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reaccionDTO.ReaccionDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString

public class ProductoDTO {


    private Long id;

    private String titulo;

    private String titulo_descripcion;

    private String descripcion;


    //private int puntaje;

    private String direccion;

    private double latitud;

    private double longitud;

    private double precio;


    private List<PoliticaDTO> politicaListDTO = new ArrayList<>(); //precargar



    private Long categoria_id;
    //private Long idCategoria;
    private Long ciudad_id;//precargar


    private List<ImagenDTO> imagenDTOList = new ArrayList<>();

    private List<CaracteristicasDTO> caracteristicasDTOList = new ArrayList<>();



    public ProductoDTO() {
    }


}
