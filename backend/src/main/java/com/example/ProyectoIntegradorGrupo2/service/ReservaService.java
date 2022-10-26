package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.Producto;
import com.example.ProyectoIntegradorGrupo2.model.Reserva;
import com.example.ProyectoIntegradorGrupo2.model.Usuario;
import com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO.*;
import com.example.ProyectoIntegradorGrupo2.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReservaService implements IReservaService{

    @Autowired
    private IReservaRepository reservaRepository;

    @Autowired
    private IProductoRepository productoRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;



    @Autowired
    ObjectMapper mapper;

    @Override
    public ReservaDTO agregarReserva(ReservaDTO reservaDTO) throws BadRequestException , ResourceNotFoundException{
        Reserva reserva = mapper.convertValue(reservaDTO, Reserva.class);
       List<Optional<Reserva>> reservaList = reservaRepository.listarReservasGuardadas(reservaDTO.getProducto_id(),reservaDTO.getFechaInicioReserva(),reservaDTO.getFechaFinReserva());
       if (!reservaList.isEmpty()){
           throw new BadRequestException("El producto ya tiene reservas para ese rango de fechas");
       }
       if (reservaDTO.getProducto_id()== null || reservaDTO.getUsuario_id()== null){
           throw new BadRequestException("Se debe conocer el id del producto a reservar y el id del usuario que reserva");
       }
        //reservaDTO.setFechaEnLaQueSeHaceLaReserva(new Date());
        if (reservaDTO.getFechaInicioReserva() == null || reservaDTO.getFechaFinReserva() == null){
            throw new BadRequestException("Se debe conocer la fecha de inicio y la fecha de fin para la reserva");
        }

        LocalDate hoy = LocalDate.now();
        LocalTime ahora = LocalTime.now();

        LocalDateTime fecha = LocalDateTime.of(hoy, ahora);
        reserva.setFechaEnLaQueSeHaceLaReserva(fecha);


        Optional<Producto> productoDesdeDB = productoRepository.findById(reservaDTO.getProducto_id());
        if (productoDesdeDB.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado el producto con el id indicado");
        }
        reserva.setProducto(productoDesdeDB.get());

        Optional<Usuario> usuarioDesdeDB = usuarioRepository.findById(reservaDTO.getUsuario_id());
        if (usuarioDesdeDB.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado el usuario con el id indicado");
        }
        reserva.setUsuario(usuarioDesdeDB.get());
        /*Cliente clienteAGuardar = (Cliente) usuarioDesdeDB.get();*/
        /*Cliente cliente = (Cliente) usuarioDesdeDB.get();
        clienteRepository.save(cliente);

        reserva.setCliente(cliente);*/




        Reserva reservaGuardada = reservaRepository.save(reserva);

        reservaDTO.setId(reservaGuardada.getId());


        return reservaDTO;
    }

    @Override
    public ReservaDTO obtenerReservaPorId(Long id) throws ResourceNotFoundException {
        Optional<Reserva> reservaDesdeDB = reservaRepository.findById(id);
        if (reservaDesdeDB.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado la reserva con ese id");
        }

        ReservaDTO reservaDTO = mapper.convertValue(reservaDesdeDB, ReservaDTO.class);
        reservaDTO.setUsuario_id(reservaDesdeDB.get().getUsuario().getId());
        reservaDTO.setProducto_id(reservaDesdeDB.get().getProducto().getId());
        return reservaDTO;
    }

    @Override
    public List<ReservaListarTodasDTO> listarTodas() {
        List<Reserva> reservasList = reservaRepository.findAll();

        List<ReservaListarTodasDTO> reservaDTOList = new ArrayList<>();
        for (Reserva r:reservasList) {
            ReservaListarTodasDTO reservaDTO = mapper.convertValue(r,ReservaListarTodasDTO.class);
            reservaDTO.setProducto_id(r.getProducto().getId());
            reservaDTOList.add(reservaDTO);

        }

        reservaDTOList.sort(Comparator.comparing(ReservaListarTodasDTO::getId));
        return reservaDTOList;
    }

    @Override
    public ReservaActualizarDTO editar(ReservaActualizarDTO reservaActualizarDTO) throws ResourceNotFoundException, BadRequestException{
        if (reservaActualizarDTO.getId() == null /*|| reservaActualizarDTO.getProducto_id() ==null*/){
            throw new BadRequestException("Para actualizar la reserva se debe conocer el id");
        }
        Optional<Reserva> reserva = reservaRepository.findById(reservaActualizarDTO.getId());
        if (reserva.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado la reserva con ése id para actualizar");
        }

        List<Optional<Reserva>> reservaList = reservaRepository.listarReservasGuardadas(reserva.get().getProducto().getId(),reservaActualizarDTO.getFechaInicioReserva(),reservaActualizarDTO.getFechaFinReserva());
        if (!reservaList.isEmpty()){
            throw new BadRequestException("El producto ya tiene reservas para ese rango de fechas");
        }

        reserva.get().setFechaInicioReserva(reservaActualizarDTO.getFechaInicioReserva());
        reserva.get().setFechaFinReserva(reservaActualizarDTO.getFechaFinReserva());
        Reserva reservaActualizada = reservaRepository.save(reserva.get());

        ReservaActualizarDTO reservaActualizarDTODesdeDB = mapper.convertValue(reservaActualizada, ReservaActualizarDTO.class);
        return reservaActualizarDTODesdeDB;
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Reserva> reserva = reservaRepository.findById(id);
        if (reserva.isEmpty()){
            throw new ResourceNotFoundException("No se ha encontrado la reserva a elimnar");
        }
        reservaRepository.deleteById(id);
    }

    @Override
    public List<ReservaPorIdProductoDTO> buscarReservasPorProductoId(Long id) throws ResourceNotFoundException {
        List<Optional<Reserva>> reservaList = reservaRepository.findReservasByProductoId(id);
        if (reservaList.isEmpty()){
            throw new ResourceNotFoundException("No se encontraron reservas para el producto indicado");
        }

        List<ReservaPorIdProductoDTO> reservaPorIdProductoDTOList = new ArrayList<>();
        for (Optional<Reserva> r:reservaList) {

            ReservaPorIdProductoDTO reservaPorIdProductoDTO = new ReservaPorIdProductoDTO(r.get().getId(), r.get().getFechaInicioReserva(),r.get().getFechaFinReserva());
            reservaPorIdProductoDTOList.add(reservaPorIdProductoDTO);


        }

        reservaPorIdProductoDTOList.sort(Comparator.comparing(ReservaPorIdProductoDTO::getId));
        return reservaPorIdProductoDTOList;
    }

    @Override
    public List<ReservaPorIdUsuarioDTO> buscarReservasPorUsuarioId(Long id) throws ResourceNotFoundException {
        List<Optional<Reserva>> reservaList = reservaRepository.findReservasByUsuarioId(id);
        if (reservaList.isEmpty()){
            throw new ResourceNotFoundException("No se encontraron reservas para el usuario indicado");
        }

        List<ReservaPorIdUsuarioDTO> reservaPorIdUsuarioDTOList = new ArrayList<>();
        for (Optional<Reserva> r:reservaList) {

            ReservaPorIdUsuarioDTO reservaPorIdUsuarioDTO = new ReservaPorIdUsuarioDTO(r.get().getId(), r.get().getFechaInicioReserva(),r.get().getFechaFinReserva(),r.get().getPrecioTotal(),r.get().getProducto().getId());
            reservaPorIdUsuarioDTOList.add(reservaPorIdUsuarioDTO);


        }

        reservaPorIdUsuarioDTOList.sort(Comparator.comparing(ReservaPorIdUsuarioDTO::getId));
        return reservaPorIdUsuarioDTOList;
    }
}
