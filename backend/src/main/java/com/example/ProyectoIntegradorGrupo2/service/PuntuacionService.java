package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.*;
import com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO.PuntuacionDTO;
import com.example.ProyectoIntegradorGrupo2.repository.IProductoRepository;
import com.example.ProyectoIntegradorGrupo2.repository.IPuntuacionRepository;
import com.example.ProyectoIntegradorGrupo2.repository.IUsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class PuntuacionService implements IPuntuacionService{

    @Autowired
    private IPuntuacionRepository puntuacionRepository;

    @Autowired
    private IProductoRepository productoRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    ObjectMapper mapper;

    private PuntuacionDTO crearPuntuacion (PuntuacionDTO puntuacionDTO) throws BadRequestException {

        if (puntuacionDTO.getPuntuacion() < 1 || puntuacionDTO.getPuntuacion() > 5) throw new BadRequestException("La puntuación debe ser un número del 1 al 5");

            Puntuacion puntuacion = mapper.convertValue(puntuacionDTO, Puntuacion.class);

            Math.floor(puntuacion.getPuntuacion());

            Optional<Producto> productoDesdeDB = productoRepository.findById(puntuacionDTO.getProducto_id());
            puntuacion.setProducto(productoDesdeDB.get());

            Optional<Usuario> usuarioDesdeDB = usuarioRepository.findById(puntuacionDTO.getUsuario_id());
            puntuacion.setUsuario(usuarioDesdeDB.get());

            if (puntuacion.getUsuario().getId() == null || puntuacion.getProducto().getId() == null)
                throw new BadRequestException("Debe indicar un usuario y un producto para agregar una puntuación");

            Puntuacion puntuacionGuardada = puntuacionRepository.save(puntuacion);

            puntuacionDTO.setId(puntuacionGuardada.getId());

            return puntuacionDTO;
    }

    @Override
    public PuntuacionDTO agregarPuntuacion(PuntuacionDTO puntuacionDTO) throws BadRequestException {

    if (!(puntuacionRepository.findPuntuacionByProductoIdAndUsuarioId(puntuacionDTO.getProducto_id(), puntuacionDTO.getUsuario_id()).isEmpty())) throw new BadRequestException("El usuario ya ha agregado una puntuación para este producto");
    return crearPuntuacion(puntuacionDTO);

    }

    @Override
    public PuntuacionDTO editar(PuntuacionDTO puntuacionDTO) throws ResourceNotFoundException, BadRequestException {

        if (puntuacionDTO.getUsuario_id()==null || puntuacionDTO.getProducto_id()==null)
            throw new BadRequestException("La puntuación debe tener asignado un producto y un usuario");
        Optional<Puntuacion> puntuacion = puntuacionRepository.findById(puntuacionDTO.getId());
        if (puntuacion.isEmpty()) {
            throw new ResourceNotFoundException("No se pudo encontrar la puntuacion para editar");
        }
        return crearPuntuacion(puntuacionDTO);
    }


    @Override
    public PuntuacionDTO obtenerPuntuacionPorId(Long id) throws ResourceNotFoundException {

        Optional<Puntuacion> puntuacionPorId = puntuacionRepository.findById(id);
        PuntuacionDTO puntuacionDTOPorId = null;
        if (puntuacionPorId.isEmpty()) {
            throw new ResourceNotFoundException("No se pudo encontrar la puntuacion con el ID indicado");
        }
        puntuacionDTOPorId = mapper.convertValue(puntuacionPorId, PuntuacionDTO.class);
        puntuacionDTOPorId.setProducto_id(puntuacionPorId.get().getProducto().getId());
        puntuacionDTOPorId.setUsuario_id(puntuacionPorId.get().getUsuario().getId());
        return puntuacionDTOPorId;
    }

    @Override
    public List<PuntuacionDTO> listarTodas() {

        List<Puntuacion> puntuacionList = puntuacionRepository.findAll();
        List<PuntuacionDTO> puntuacionDTOList = new ArrayList<>();
        for (Puntuacion p : puntuacionList
        ) {
            Usuario usuario = p.getUsuario();
            Producto prod = p.getProducto();
            PuntuacionDTO puntuacionDTO = mapper.convertValue(p, PuntuacionDTO.class);
            puntuacionDTO.setUsuario_id(usuario.getId());
            puntuacionDTO.setProducto_id(prod.getId());
            puntuacionDTOList.add(puntuacionDTO);
        }
        return puntuacionDTOList;

    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Puntuacion> puntuacion = puntuacionRepository.findById(id);
        if (puntuacion.isEmpty()){
            throw new ResourceNotFoundException("No se pudo encontrar la puntuación a eliminar");
        }
    puntuacionRepository.deleteById(id);

    }

    @Override
    public List<PuntuacionDTO> findPuntuacionesByProductoId(Long id) throws ResourceNotFoundException {

        Optional<Producto> productoEncontrado = productoRepository.findById(id);

        if (productoEncontrado.isEmpty()) throw new ResourceNotFoundException("No se ha encontrado el producto con el ID indicado");
        List<Optional<Puntuacion>> puntuacionList =puntuacionRepository.findPuntuacionesByProductoId(id);
        if (puntuacionList.isEmpty())
            throw new ResourceNotFoundException("El producto no ha recibido puntuaciones");
        List<PuntuacionDTO> puntuacionDTOList = new ArrayList<>();
        for (Optional<Puntuacion> p : puntuacionList
        ) {
            PuntuacionDTO puntuacionDTO = mapper.convertValue(p, PuntuacionDTO.class);
            puntuacionDTO.setUsuario_id(p.get().getUsuario().getId());
            puntuacionDTO.setProducto_id(p.get().getProducto().getId());
            puntuacionDTOList.add(puntuacionDTO);
        }
        return puntuacionDTOList;
    }

    @Override
    public PuntuacionDTO findPuntuacionByProductoIdAndUsuarioId(Long id_producto, Long id_usuario) throws ResourceNotFoundException {

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findById(id_usuario);
        if (usuarioEncontrado.isEmpty()) throw new ResourceNotFoundException("No se ha encontrado el usuario con el ID indicado");

        Optional<Producto> productoEncontrado = productoRepository.findById(id_producto);
        if (productoEncontrado.isEmpty()) throw new ResourceNotFoundException("No se ha encontrado el producto con el ID indicado");

        Optional<Puntuacion> puntuacion = puntuacionRepository.findPuntuacionByProductoIdAndUsuarioId(id_producto, id_usuario);
        if (puntuacion.isEmpty())
            throw new ResourceNotFoundException("El usuario no ha agregado una puntuación al producto con el ID solicitado");

        PuntuacionDTO puntuacionDTO = mapper.convertValue(puntuacion, PuntuacionDTO.class);
        puntuacionDTO.setUsuario_id(puntuacion.get().getUsuario().getId());
        puntuacionDTO.setProducto_id(puntuacion.get().getProducto().getId());
        return puntuacionDTO;
        }

    @Override
    public void eliminarPuntuacionByProductoIdAndUsuarioId(Long id_producto, Long id_usuario) throws ResourceNotFoundException {
        Optional<Puntuacion> puntuacion = puntuacionRepository.findPuntuacionByProductoIdAndUsuarioId(id_producto, id_usuario);
        if (puntuacion.isEmpty()){
            throw new ResourceNotFoundException("No se pudo encontrar la puntuación a eliminar");
        }
       puntuacionRepository.deleteById(puntuacion.get().getId());
    }

}



