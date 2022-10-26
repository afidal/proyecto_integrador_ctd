package com.example.ProyectoIntegradorGrupo2.model;

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


@Entity
@Table(name = "politicas")
public class Politica {

    @Id
    @NotNull
    @SequenceGenerator(name = "politica_sequence", sequenceName = "politica_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "politica_sequence")
    private Long id;

    @Column(length = 500)
    private String descripcion;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "producto_id", nullable = false)
    @JsonIgnore
    private Producto producto;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "tipo_politica_id", nullable = false)
    @JsonIgnore
    private TipoDePoliticas tipoDePoliticas;

    public Politica() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public TipoDePoliticas getTipoDePoliticas() {
        return tipoDePoliticas;
    }

    public void setTipoDePoliticas(TipoDePoliticas tipoDePoliticas) {
        this.tipoDePoliticas = tipoDePoliticas;
    }
}
