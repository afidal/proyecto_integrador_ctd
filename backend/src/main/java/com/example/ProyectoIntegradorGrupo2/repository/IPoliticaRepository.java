package com.example.ProyectoIntegradorGrupo2.repository;

import com.example.ProyectoIntegradorGrupo2.model.Imagen;
import com.example.ProyectoIntegradorGrupo2.model.Politica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IPoliticaRepository extends JpaRepository<Politica, Long> {
    @Query("SELECT p FROM Politica p where p.producto.id =?1")
    List<Optional<Politica>> findPoliticasByProductId(Long id);
}
