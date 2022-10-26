package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/*@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "tipo_de_reaccion")*/
public class TipoReaccion {

    /*@Id
    @NotNull
    @SequenceGenerator(name = "tr_sequence", sequenceName = "tr_sequence", allocationSize = 1) // //initialValue=33
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tr_sequence")
    private Long id;

    private String nombreTipoReaccion;

    @OneToMany(mappedBy = "tipoReaccion", fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Reaccion> reaccionList = new ArrayList<>();

    public TipoReaccion(String nombreTipoReaccion, List<Reaccion> reaccionList) {
        this.nombreTipoReaccion = nombreTipoReaccion;
        this.reaccionList = reaccionList;
    }*/
}
