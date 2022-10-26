package com.example.ProyectoIntegradorGrupo2.repository;


import com.example.ProyectoIntegradorGrupo2.model.Producto;
import com.example.ProyectoIntegradorGrupo2.model.Role;
import com.example.ProyectoIntegradorGrupo2.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {

    @Query("select r from Role r where r.nombre = ?1")
    Optional<Role> findRoleByName(String nombre);


}
