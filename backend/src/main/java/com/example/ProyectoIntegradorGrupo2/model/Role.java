package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.util.Arrays.stream;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor


@Entity
/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})*/
@Table(name = "roles")
public class Role {

    @Id
    @NotNull
    @SequenceGenerator(name = "role_sequence", sequenceName = "role_sequence", allocationSize = 1, initialValue = 3) // initialValue = 3
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_sequence")
    private Long id;
    private String nombre;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, orphanRemoval = true) //orphanRemoval = true
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Usuario> usuarioList = new ArrayList<>();

    /*@JsonIgnore
    @OneToOne(mappedBy = "role",  cascade = CascadeType.ALL)
    private Usuario usuario;*/

    public Role(String nombre) {
        this.nombre = nombre;
    }


}
