package com.example.ProyectoIntegradorGrupo2.repository;

import com.example.ProyectoIntegradorGrupo2.model.Caracteristicas;
import com.example.ProyectoIntegradorGrupo2.model.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IImagenRepository extends JpaRepository<Imagen, Long> {
    @Query("SELECT i FROM Imagen i where i.producto.id =?1")
    List<Optional<Imagen>> findImagesByProductId(Long id);
}
