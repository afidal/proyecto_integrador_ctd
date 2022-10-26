package com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO;

import com.example.ProyectoIntegradorGrupo2.model.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

/*@Getter
@Setter
@NoArgsConstructor
@Entity
@DiscriminatorValue("C")*/
public class Cliente /*extends Usuario*/ {
    /*public Cliente(@NotNull Long id, String nombre, String apellido, String email, String password, String ciudad, boolean activo, Role role, List<Reaccion> reaccionList, List<Puntuacion> puntuacionList, List<Reserva> reservaList) {
        super(id, nombre, apellido, email, password, ciudad, activo, role, reaccionList, puntuacionList, reservaList);
    }

    public Cliente(@NotNull Long id) {
        super(id);
    }

    public Cliente(Long id, String nombre, String apellido, String email, String password, String ciudad, boolean activo, Role role) {
        super(id, nombre, apellido, email, password, ciudad, activo, role);
    }*/

    /*@OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Reaccion> reaccionList = new ArrayList<>();

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Puntuacion> puntuacionList = new ArrayList<>();

    @OneToMany(mappedBy = "cliente", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Reserva> reservaList = new ArrayList<>();*/
}
