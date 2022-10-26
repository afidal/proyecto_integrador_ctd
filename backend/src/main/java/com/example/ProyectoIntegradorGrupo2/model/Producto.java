package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @NotNull
    @SequenceGenerator(name = "producto_sequence", sequenceName = "producto_sequence", allocationSize = 1) // //initialValue=33
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "producto_sequence")
    private Long id;
    @NotNull
    @NotBlank //trimea la propiedad y chequea si el length es mayor a uno
    private String titulo;

    private String titulo_descripcion;
    @Column(length = 5000)
    private String descripcion;

    private String direccion;

    private double latitud;

    private double longitud;

    private double precio;

    //@Size(min=1,max = 10)
    //@Min(value= 1) @Max(value=10)

    //private int puntaje;

    @OneToMany(mappedBy = "producto", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Politica> politicaList = new ArrayList<>();

    @OneToMany(mappedBy = "producto", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Reserva> reservaSet = new ArrayList<>();//hacer otra tabla



    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "categoria_id", nullable = false)
    @JsonIgnore
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "ciudad_id", nullable = false)
    @JsonIgnore
    private Ciudad ciudad;

    @OneToMany(mappedBy = "producto", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Imagen> imagenesList = new ArrayList<>();

    @OneToMany(mappedBy = "producto", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Caracteristicas> caracteristicasList = new ArrayList<>();

    @OneToMany(mappedBy = "producto", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Puntuacion> puntuacionList = new ArrayList<>();

    @OneToMany(mappedBy = "producto", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Reaccion> reaccionList = new ArrayList<>();

    public Producto(String titulo, String titulo_descripcion, String descripcion, String direccion, double latitud, double longitud, List<Politica> politicaList, List<Reserva> reservaSet, Categoria categoria, Ciudad ciudad, List<Imagen> imagenesList, List<Caracteristicas> caracteristicasList, List<Puntuacion> puntuacionList, List<Reaccion> reaccionList) {
        this.titulo = titulo;
        this.titulo_descripcion = titulo_descripcion;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.politicaList = politicaList;
        this.reservaSet = reservaSet;
        this.categoria = categoria;
        this.ciudad = ciudad;
        this.imagenesList = imagenesList;
        this.caracteristicasList = caracteristicasList;
        this.puntuacionList = puntuacionList;
        this.reaccionList = reaccionList;
    }

    public Producto(String titulo, String titulo_descripcion, String descripcion, String direccion, double latitud, double longitud, Categoria categoria, Ciudad ciudad) {
        this.titulo = titulo;
        this.titulo_descripcion = titulo_descripcion;
        this.descripcion = descripcion;
        this.direccion = direccion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.categoria = categoria;
        this.ciudad = ciudad;
    }
}
