package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "puntuaciones")
public class Puntuacion {
    @Id
    @NotNull
    @SequenceGenerator(name = "puntuacion_sequence", sequenceName = "puntuacion_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "puntuacion_sequence")
    private Long id;
    @Size(min=1, max=5)
    private int puntuacion;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "producto_id", nullable = false)
    @JsonIgnore
    private Producto producto;


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnore
    private Usuario usuario;
    /*private Cliente cliente;*/

    /*public Puntuacion(int puntuacion, Producto producto, Cliente cliente) {
        this.puntuacion = puntuacion;
        this.producto = producto;
        this.cliente = cliente;
    }*/

    public Puntuacion(int puntuacion, Producto producto, Usuario usuario) {
        this.puntuacion = puntuacion;
        this.producto = producto;
        this.usuario = usuario;
    }
}
