package com.example.ProyectoIntegradorGrupo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor


@Entity
@Table(name = "usuarios")
/*@Inheritance(strategy=InheritanceType.JOINED)*/
public class Usuario implements UserDetails {

    @Id
    @NotNull
    @SequenceGenerator(name = "usuario_sequence", sequenceName = "usuario_sequence", allocationSize = 1) //  initialValue = 4
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_sequence")
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String ciudad;

    @Column(columnDefinition = "TINYINT")
    private boolean activo;

    /*@OneToOne(cascade = CascadeType.ALL,fetch= FetchType.LAZY)
    @JoinColumn(name="role_id", referencedColumnName = "id")
    private Role role;*/

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role_id", nullable = false)
    @JsonIgnore
    private Role role;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Reaccion> reaccionList = new ArrayList<>();

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Puntuacion> puntuacionList = new ArrayList<>();

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"})
    private List<Reserva> reservaList = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> listRole = new ArrayList<GrantedAuthority>();

        listRole.add(new SimpleGrantedAuthority(role.getNombre()));
        return listRole;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public Usuario(Long id) {
        this.id = id;
    }

    public Usuario(Long id, String nombre, String apellido, String email, String password, String ciudad, boolean activo, Role role) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.ciudad = ciudad;
        this.activo = activo;
        this.role = role;
    }
}
