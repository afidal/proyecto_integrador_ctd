package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString


@Entity
@Table(name = "tipo_de_politcas")
public class TipoDePoliticas {

    @Id
    @NotNull
    @SequenceGenerator(name = "tp_sequence", sequenceName = "tp_sequence", allocationSize = 1, initialValue = 4) // initialValue=4
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tp_sequence")
    private Long id;
    @NotNull
    private String nombre_tipo_politica;

    @OneToMany(mappedBy = "tipoDePoliticas", fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Politica> politicaList = new ArrayList<>();

    public TipoDePoliticas() {
    }

    public TipoDePoliticas(Long id, String nombre_tipo_politica, List<Politica> politicaList) {
        this.id = id;
        this.nombre_tipo_politica = nombre_tipo_politica;
        this.politicaList = politicaList;
    }

    public TipoDePoliticas(String nombre_tipo_politica) {
        this.nombre_tipo_politica = nombre_tipo_politica;
    }

    public TipoDePoliticas(String nombre_tipo_politica, List<Politica> politicaList) {
        this.nombre_tipo_politica = nombre_tipo_politica;
        this.politicaList = politicaList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre_tipo_politica() {
        return nombre_tipo_politica;
    }

    public void setNombre_tipo_politica(String nombre_tipo_politica) {
        this.nombre_tipo_politica = nombre_tipo_politica;
    }

    public List<Politica> getPoliticaList() {
        return politicaList;
    }

    public void setPoliticaList(List<Politica> politicaList) {
        this.politicaList = politicaList;
    }
}
