package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.Role;
import com.example.ProyectoIntegradorGrupo2.model.Usuario;
import com.example.ProyectoIntegradorGrupo2.model.dto.usuarioDTO.*;
import com.example.ProyectoIntegradorGrupo2.repository.IRoleRepository;
import com.example.ProyectoIntegradorGrupo2.repository.IUsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class UsuarioService implements IUsuarioService, UserDetailsService {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    ObjectMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findUserByEmail(email);
        if (usuario.isEmpty()){
            throw new UsernameNotFoundException("No se ha encontrado al usuario con ése email");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(usuario.get().getRole().getNombre()));
        return new org.springframework.security.core.userdetails.User(usuario.get().getEmail(),usuario.get().getPassword(),authorities);
    }

    @Override
    public UsuarioDTO agregarUsuario(UsuarioDTO usuarioDTO) throws BadRequestException {

        if (usuarioDTO.getNombre_rol() == null || usuarioDTO.getNombre_rol().equals("")){
            throw new BadRequestException("No se puede guardar un usuario sin asignarle un rol");
        }
        Optional<Usuario> usuarioABuscar = usuarioRepository.findUserByEmail(usuarioDTO.getEmail());
        if (!usuarioABuscar.isEmpty()){
            throw new BadRequestException("Se ha encontrado un usuario con el email asignado. No se puede crear un usuario con el mismo email");
        }
        Optional<Role> roleDesdeDB = roleRepository.findRoleByName(usuarioDTO.getNombre_rol());

        Usuario usuario = mapper.convertValue(usuarioDTO, Usuario.class);
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setRole(roleDesdeDB.get());
        usuario.setActivo(true);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        Optional<Usuario> usuarioDesdeDB = usuarioRepository.findById(usuarioGuardado.getId());
        roleDesdeDB.get().getUsuarioList().add(usuarioDesdeDB.get());

        UsuarioDTO usuarioDTOGuardado = mapper.convertValue(usuarioDesdeDB, UsuarioDTO.class);

        /*RoleDTO roleUsuario = usuarioDTO.getRoleDTO();
        Role roleGuardado = roleRepository.save(mapper.convertValue(roleUsuario, Role.class));
        Optional<Role> roleDesdeDB = roleRepository.findById(roleGuardado.getId());

        Usuario usuario = mapper.convertValue(usuarioDTO, Usuario.class);
        usuario.setRole(roleDesdeDB.get());

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        Optional<Usuario> usuarioDesdeDB = usuarioRepository.findById(usuarioGuardado.getId());
        roleDesdeDB.get().setUsuario(usuarioDesdeDB.get());

        UsuarioDTO usuarioDTOGuardado = mapper.convertValue(usuarioDesdeDB, UsuarioDTO.class);*/



        return usuarioDTOGuardado;
    }

    @Override
    public UsuarioGETByIdOrEmailDTO obtenerUsuarioPorId(Long id) throws ResourceNotFoundException {
       Optional<Usuario> usuario = usuarioRepository.findById(id);
       if (usuario.isEmpty()){
           throw new ResourceNotFoundException("No se ha encontrado el usuario con el id indicado");
       }
       UsuarioGETByIdOrEmailDTO usuarioGETByIdDTO = mapper.convertValue(usuario, UsuarioGETByIdOrEmailDTO.class);
       usuarioGETByIdDTO.setNombre_rol(usuario.get().getRole().getNombre());
        return usuarioGETByIdDTO;
    }



    @Override
    public List<UsuarioListarTodosDTO> listarTodos() {
        List<Usuario> usuarioList = usuarioRepository.findAll();

        List<UsuarioListarTodosDTO> usuarioListarTodosDTOList = new ArrayList<>();
        for (Usuario u:usuarioList) {
            UsuarioListarTodosDTO usuarioListarTodosDTO = mapper.convertValue(u,UsuarioListarTodosDTO.class);
            usuarioListarTodosDTO.setNombre_rol(u.getRole().getNombre());
            usuarioListarTodosDTOList.add(usuarioListarTodosDTO);
        }
        usuarioListarTodosDTOList.sort(Comparator.comparing(UsuarioListarTodosDTO::getId));
        return usuarioListarTodosDTOList;
    }

    @Override
    public UsuarioEditarDTO editar(UsuarioEditarDTO usuarioEditarDTO) throws ResourceNotFoundException, BadRequestException {

        if (usuarioEditarDTO.getId() == null){
            throw new BadRequestException("Se debe conocer el id del usuario a actualizar");
        }

        Optional<Usuario> usuario = usuarioRepository.findById(usuarioEditarDTO.getId());
        if (usuario.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado el usuario con el id indicado");
        }
        /*usuario.get().setNombre(usuarioEditarDTO.getNombre());
        usuario.get().setApellido(usuarioEditarDTO.getApellido());
        usuario.get().setCiudad(usuarioEditarDTO.getCiudad());*/
        if (usuarioEditarDTO.getNombre() != null){
            usuario.get().setNombre(usuarioEditarDTO.getNombre());
        }
        if (usuarioEditarDTO.getApellido() != null){
            usuario.get().setApellido(usuarioEditarDTO.getApellido());
        }
        if (usuarioEditarDTO.getCiudad() != null){
            usuario.get().setCiudad(usuarioEditarDTO.getCiudad());
        }

        Usuario usuarioActualizado = usuarioRepository.save(usuario.get());
        UsuarioEditarDTO usuarioEditarDTOActualizado = mapper.convertValue(usuarioActualizado, UsuarioEditarDTO.class);

        return usuarioEditarDTOActualizado;
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado el usuario con el id indicado");
        }
        usuarioRepository.deleteById(id);

    }

    @Override
    public UsuarioGETByIdOrEmailDTO obtenerUsuarioPorEmail(UsuarioPorEmailDTO usuarioPorEmailDTO) throws ResourceNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findUserByEmail(usuarioPorEmailDTO.getEmail());
        if (usuario.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado el usuario con el email indicado");
        }
        UsuarioGETByIdOrEmailDTO usuarioGETByIdDTO = mapper.convertValue(usuario, UsuarioGETByIdOrEmailDTO.class);
        usuarioGETByIdDTO.setNombre_rol(usuario.get().getRole().getNombre());
        return usuarioGETByIdDTO;
    }

    @Override
    public Usuario getUsuario(Long id) {
        return usuarioRepository.findById(id).get();
    }


}
