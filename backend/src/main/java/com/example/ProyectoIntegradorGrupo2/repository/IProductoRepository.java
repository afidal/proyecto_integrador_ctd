package com.example.ProyectoIntegradorGrupo2.repository;

import com.example.ProyectoIntegradorGrupo2.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Long> {
   @Query( "SELECT p FROM Producto p WHERE p.categoria.id = ?1 ")
   List<Optional<Producto>> listarProductosByCategoryId(Long id);


   @Query( "SELECT p FROM Producto p WHERE p.ciudad.id = ?1 ")
   List<Optional<Producto>> listarProductosByCiudadId(Long id);


   @Query( "select p\n" +
           "from Producto p\n" +
           "where not exists (\n" +
           "    select r\n" +
           "    from Reserva r\n" +
           "    where r.producto.id = p.id\n" +
           "   AND ( (?1 BETWEEN r.fechaInicioReserva AND r.fechaFinReserva) OR \n" +
           "    (?2 BETWEEN r.fechaInicioReserva AND r.fechaFinReserva) OR \n" +
           "((r.fechaInicioReserva BETWEEN ?1 AND ?2) OR (r.fechaFinReserva BETWEEN ?1 AND ?2)))\n" +
           ")")
   List<Optional<Producto>> listarProductosByDisponibilidad(LocalDate fechaInicio, LocalDate fechaFin);

   /*@Query( "SELECT p FROM Producto p LEFT JOIN Reserva r ON p.id = r.producto.id \n" +
           "WHERE NOT (r.fechaInicioReserva > ?1 OR r.fechaFinReserva < ?2)")
   List<Optional<Producto>> listarProductosByDisponibilidad(LocalDate fechaInicio, LocalDate fechaFin);*/
   /*@Query( "select p\n" +
           "from Producto p\n" +
           "where not exists (\n" +
           "    select r\n" +
           "    from Reserva r\n" +
           "    where r.producto.id = p.id\n" +
           "      and r.fechaFinReserva   >= ?2\n" + //08-10 es, pregunta 08-11
           "      and r.fechaInicioReserva <= ?1\n" + //08-05 es, pregunta 08-07
           "     or( r.fechaFinReserva   >= ?1\n" + //08-10 es, pregunta 08-11
           "      and r.fechaInicioReserva <= ?1\n)" +
           "     or( r.fechaFinReserva   >= ?2\n" + //08-10 es, pregunta 08-11
           "      and r.fechaInicioReserva <= ?2\n)" +
           ")")
   List<Optional<Producto>> listarProductosByDisponibilidad(LocalDate fechaInicio, LocalDate fechaFin);*/

   /*@Query( "SELECT DISTINCT p FROM Producto p LEFT JOIN Reserva r ON p.id = r.producto.id WHERE (r.fechaInicioReserva NOT BETWEEN ?1 AND ?2) AND (r.fechaFinReserva NOT BETWEEN ?1 AND ?2) OR r.producto.id IS NULL")
   List<Optional<Producto>> listarProductosByDisponibilidad(LocalDate fechaInicio, LocalDate fechaFin);*/

   /*@Query( "SELECT p FROM Producto p INNER JOIN Reserva r ON p.id = r.producto.id WHERE (r.fechaInicioReserva NOT BETWEEN ?1 AND ?2) AND (r.fechaFinReserva NOT BETWEEN ?1 AND ?2) AND p.ciudad.id = ?3")*/
   @Query( "select p\n" +
           "from Producto p\n" +
           "where p.ciudad.id = ?3 and not exists (\n" +
           "    select r\n" +
           "    from Reserva r\n" +
           "    where r.producto.id = p.id\n" +
           "   AND ( (?1 BETWEEN r.fechaInicioReserva AND r.fechaFinReserva) OR \n" +
           "    (?2 BETWEEN r.fechaInicioReserva AND r.fechaFinReserva) OR \n" +
           "((r.fechaInicioReserva BETWEEN ?1 AND ?2) OR (r.fechaFinReserva BETWEEN ?1 AND ?2)))\n" +
           ")")
   List<Optional<Producto>> listarProductosDisponiblesByCiudadYFecha(LocalDate fechaInicio, LocalDate fechaFin, Long id_ciudad);

   /*

   SELECT *
FROM product p INNER JOIN orders o
ON p.id=o.product_id
WHERE (from_date NOT BETWEEN '2017-06-13' AND '2017-06-21')
AND (to_date NOT BETWEEN '2017-06-13' AND '2017-06-21')
AND p.id=$pid;*/
    @Query("SELECT p FROM Producto p INNER JOIN Reaccion r ON p.id = r.producto.id WHERE r.usuario.id = ?1 AND r.favorito = true")
   List<Optional<Producto>> listarProductosFavoritosByUsuarioId(Long id);


}
