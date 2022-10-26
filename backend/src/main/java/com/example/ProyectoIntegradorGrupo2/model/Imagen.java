package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString


@Entity
@Table(name = "imagenes")
public class Imagen {

    @Id
    @NotNull
    @SequenceGenerator(name = "imagenes_sequence", sequenceName = "imagenes_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "imagenes_sequence")
    private Long id;
    @NotNull
    @Column(length = 500)
    private String url_img_producto;
    @NotNull
    private String titulo_img_producto;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "producto_id", nullable = false)
    @JsonIgnore
    private Producto producto;

    public Imagen() {
    }

    public Imagen(Long id, String url_img_producto, String titulo_img_producto, Producto producto) {
        this.id = id;
        this.url_img_producto = url_img_producto;
        this.titulo_img_producto = titulo_img_producto;
        this.producto = producto;
    }

    public Imagen(String url_img_producto, String titulo_img_producto, Producto producto) {
        this.url_img_producto = url_img_producto;
        this.titulo_img_producto = titulo_img_producto;
        this.producto = producto;
    }

    public Imagen(Long id, String url_img_producto, String titulo_img_producto) {
        this.id = id;
        this.url_img_producto = url_img_producto;
        this.titulo_img_producto = titulo_img_producto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl_img_producto() {
        return url_img_producto;
    }

    public void setUrl_img_producto(String url_img_producto) {
        this.url_img_producto = url_img_producto;
    }

    public String getTitulo_img_producto() {
        return titulo_img_producto;
    }

    public void setTitulo_img_producto(String titulo_img_producto) {
        this.titulo_img_producto = titulo_img_producto;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
}
