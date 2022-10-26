package com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO;

import com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO.CaracteristicasDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.imagenDTO.ImagenDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.politicaDTO.PoliticaDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO.PuntuacionDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reaccionDTO.ReaccionDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO.ReservaDTO;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductoCardDTO {


    private Long id;

    private String titulo;

    private String titulo_descripcion;

    private String descripcion;

    private String direccion;

    private double latitud;

    private double longitud;

    private double precio;

    private Long categoria_id;

    private Long ciudad_id;

    private List<ImagenDTO> imagenDTOList = new ArrayList<>();

    private List<CaracteristicasDTO> caracteristicasDTOList = new ArrayList<>();

}
