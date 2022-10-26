package com.example.ProyectoIntegradorGrupo2.repository;

import com.example.ProyectoIntegradorGrupo2.model.Producto;
import com.example.ProyectoIntegradorGrupo2.model.Puntuacion;
import com.example.ProyectoIntegradorGrupo2.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface IPuntuacionRepository extends JpaRepository<Puntuacion, Long> {

    @Query("SELECT p FROM Puntuacion p WHERE p.producto.id =?1")
    List<Optional<Puntuacion>> findPuntuacionesByProductoId(Long id);

    @Query("SELECT p FROM Puntuacion p WHERE p.producto.id =?1 AND p.usuario.id = ?2")
    Optional<Puntuacion> findPuntuacionByProductoIdAndUsuarioId(Long id_producto, Long id_usuario);
}
