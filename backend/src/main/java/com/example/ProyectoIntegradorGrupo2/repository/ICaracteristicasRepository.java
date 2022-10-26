package com.example.ProyectoIntegradorGrupo2.repository;

import com.example.ProyectoIntegradorGrupo2.model.Caracteristicas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICaracteristicasRepository extends JpaRepository<Caracteristicas, Long> {
    @Query("SELECT c FROM Caracteristicas c where c.producto.id =?1")
    List<Optional<Caracteristicas>> findCaracteristicasByProductoId(Long id);

    @Query("SELECT c FROM Caracteristicas c GROUP BY c.nombre_icono")
    List<Optional<Caracteristicas>> findCaracteristicas();

}
