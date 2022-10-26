package com.example.ProyectoIntegradorGrupo2.repository;

import com.example.ProyectoIntegradorGrupo2.model.Ciudad;
import com.example.ProyectoIntegradorGrupo2.model.TipoDePoliticas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITipoDePoliticasRepository extends JpaRepository<TipoDePoliticas, Long> {
}
