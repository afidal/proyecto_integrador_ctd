package com.example.ProyectoIntegradorGrupo2.repository;

import com.example.ProyectoIntegradorGrupo2.model.Caracteristicas;
import com.example.ProyectoIntegradorGrupo2.model.Producto;
import com.example.ProyectoIntegradorGrupo2.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Long> {
    @Query("SELECT r FROM Reserva r where r.producto.id =?1")
    List<Optional<Reserva>> findReservasByProductoId(Long id);

    @Query("SELECT r FROM Reserva r where r.usuario.id =?1")
    List<Optional<Reserva>> findReservasByUsuarioId(Long id);

    /*@Query( "SELECT r FROM Reserva r WHERE r.producto.id = ?1 AND (r.fechaInicioReserva BETWEEN ?2 AND ?3) AND (r.fechaFinReserva BETWEEN ?2 AND ?3)")*/
    @Query(
            "    select r\n" +
            "    from Reserva r\n" +
            "    where r.producto.id = ?1\n" +
            "   AND ( (?2 BETWEEN r.fechaInicioReserva AND r.fechaFinReserva) OR \n" +
            "    (?3 BETWEEN r.fechaInicioReserva AND r.fechaFinReserva) OR \n" +
            "((r.fechaInicioReserva BETWEEN ?2 AND ?3) OR (r.fechaFinReserva BETWEEN ?2 AND ?3)))")
    List<Optional<Reserva>> listarReservasGuardadas(Long id,LocalDate fechaInicio, LocalDate fechaFin);
}
