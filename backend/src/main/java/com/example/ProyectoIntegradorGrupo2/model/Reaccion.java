package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "reacciones")
public class Reaccion {

    @Id
    @NotNull
    @SequenceGenerator(name = "reaccion_sequence", sequenceName = "reaccion_sequence", allocationSize = 1) // //initialValue=33
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reaccion_sequence")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "producto_id", nullable = false)
    @JsonIgnore
    private Producto producto;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonIgnore
    private Usuario usuario;
    /*private Cliente cliente;*/

    @Column(columnDefinition = "TINYINT")
    private boolean favorito;

   /* @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "tipo_reaccion_id", nullable = false)
    @JsonIgnore
    private TipoReaccion tipoReaccion;*/


    /*public Reaccion(Producto producto, Usuario usuario, TipoReaccion tipoReaccion) {
        this.producto = producto;
        this.usuario = usuario;
        this.tipoReaccion = tipoReaccion;
    }*/
}
