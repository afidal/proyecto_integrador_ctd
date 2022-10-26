package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.*;
import com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO.CaracteristicasDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.imagenDTO.ImagenDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.politicaDTO.PoliticaDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.CiudadYFechaReservaDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.DisponibilidadDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.ProductoCardDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.productoDTO.ProductoDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO.PuntuacionDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reaccionDTO.ReaccionDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.reservaDTO.ReservaDTO;
import com.example.ProyectoIntegradorGrupo2.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepository productoRepository;

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    private ICaracteristicasRepository caracteristicasRepository;

    @Autowired
    private ICiudadRepository ciudadRepository;

    @Autowired
    private IImagenRepository imagenRepository;

    @Autowired
    private IReservaRepository reservaRepository;

    @Autowired
    private IPoliticaRepository politicaRepository;

    @Autowired
    private ITipoDePoliticasRepository tipoDePoliticasRepository;

    @Autowired
    private IPuntuacionRepository puntuacionRepository;

    @Autowired
    private IReaccionRepository reaccionRepository;

    @Autowired
    private IUsuarioRepository usuarioRepository;


    @Autowired
    ObjectMapper mapper;

    private ProductoDTO cargarProductoYRetornarDTO(ProductoDTO productoDTO){
        Producto producto = mapper.convertValue(productoDTO, Producto.class);


        Optional<Categoria> categoriaDesdeDB = categoriaRepository.findById(productoDTO.getCategoria_id());
        producto.setCategoria(categoriaDesdeDB.get());

        Optional<Ciudad> ciudadDesdeDB = ciudadRepository.findById(productoDTO.getCiudad_id());
        producto.setCiudad(ciudadDesdeDB.get());

        Producto pConId = productoRepository.save(producto);
        Optional<Producto> productoDesdeDB = productoRepository.findById(pConId.getId());


        List<CaracteristicasDTO> caracteristicasDTOList = productoDTO.getCaracteristicasDTOList();

        for (CaracteristicasDTO caracteristicasDTO : caracteristicasDTOList) {
            Caracteristicas caracteristica = mapper.convertValue(caracteristicasDTO, Caracteristicas.class);
            caracteristica.setProducto(productoDesdeDB.get());
            caracteristicasRepository.save(caracteristica);
            productoDesdeDB.get().getCaracteristicasList().add(caracteristica);
        }

        /*List<ReservaDTO> reservaDTOList = productoDTO.getReservaDTOList();

        for (ReservaDTO r : reservaDTOList) {
            Reserva reserva = mapper.convertValue(r, Reserva.class);
            reserva.setProducto(productoDesdeDB.get());
            reservaRepository.save(reserva);
            productoDesdeDB.get().getReservaSet().add(reserva);
        }*/

        List<ImagenDTO> imagenDTOList = productoDTO.getImagenDTOList();

        for (ImagenDTO i : imagenDTOList) {
            Imagen imagen = mapper.convertValue(i, Imagen.class);
            imagen.setProducto(productoDesdeDB.get());
            imagenRepository.save(imagen);
            productoDesdeDB.get().getImagenesList().add(imagen);
        }

        List<PoliticaDTO> politicaDTOList = productoDTO.getPoliticaListDTO();

        for (PoliticaDTO p : politicaDTOList) {
            Politica politica = mapper.convertValue(p, Politica.class);
            politica.setProducto(productoDesdeDB.get());
            Optional<TipoDePoliticas> tipoDePoliticas = tipoDePoliticasRepository.findById(p.getTipo_politica_id());
            politica.setTipoDePoliticas(tipoDePoliticas.get());
            politicaRepository.save(politica);
            tipoDePoliticas.get().getPoliticaList().add(politica);
            productoDesdeDB.get().getPoliticaList().add(politica);
        }

        productoDTO.setId(productoDesdeDB.get().getId());
        return productoDTO;
    }

    private ProductoCardDTO obteberProductoDTOConTodosLosAtributos(Producto producto, Long id){
        ProductoCardDTO productoDTO = mapper.convertValue(producto, ProductoCardDTO.class);

        productoDTO.setCategoria_id(producto.getCategoria().getId());
        productoDTO.setCiudad_id(producto.getCiudad().getId());

        List<Optional<Imagen>> optionalImagenesList = imagenRepository.findImagesByProductId(id);
        for (Optional<Imagen> i : optionalImagenesList) {
            ImagenDTO imagenDTO = mapper.convertValue(i.get(), ImagenDTO.class);
            productoDTO.getImagenDTOList().add(imagenDTO);
        }

        List<Optional<Caracteristicas>> optionalCaracteristicasList = caracteristicasRepository.findCaracteristicasByProductoId(id);
        for (Optional<Caracteristicas> c : optionalCaracteristicasList) {
            CaracteristicasDTO caracteristicasDTO = mapper.convertValue(c.get(), CaracteristicasDTO.class);
            productoDTO.getCaracteristicasDTOList().add(caracteristicasDTO);

        }

        /*List<Optional<Puntuacion>> optionalPuntuacionesList = puntuacionRepository.findPuntuacionesByProductoId(id);
        for (Optional<Puntuacion> p : optionalPuntuacionesList) {
            Usuario usuario = p.get().getUsuario();
            Producto prod = p.get().getProducto();
            PuntuacionDTO puntuacionDTO = mapper.convertValue(p.get(), PuntuacionDTO.class);
            puntuacionDTO.setUsuario_id(usuario.getId());
            puntuacionDTO.setProducto_id(prod.getId());
            productoDTO.getPuntuacionDTOList().add(puntuacionDTO);

        }*/

        return productoDTO;
    }

    @Override
    public ProductoDTO agregarProducto(ProductoDTO productoDTO) throws BadRequestException {
       if (productoDTO.getCategoria_id() ==null || productoDTO.getCiudad_id()==null)
           throw new BadRequestException("No se puede guardar un producto sin asignarle una ciudad y/o categoria");

       return cargarProductoYRetornarDTO(productoDTO);
    }

    @Override
    public ProductoDTO obtenerProductoPorId(Long id) throws ResourceNotFoundException {
        Optional<Producto> producto = productoRepository.findById(id);

        if (producto.isEmpty())
            throw new ResourceNotFoundException("No se ha encontrado el producto con el id indicado");

        ProductoCardDTO productoCardDTO = obteberProductoDTOConTodosLosAtributos(producto.get(),id);
        ProductoDTO productoDTO = mapper.convertValue(producto, ProductoDTO.class);
        productoDTO.setCategoria_id(producto.get().getCategoria().getId());
        productoDTO.setCiudad_id(producto.get().getCiudad().getId());
        productoDTO.setImagenDTOList(productoCardDTO.getImagenDTOList());
        productoDTO.setCaracteristicasDTOList(productoCardDTO.getCaracteristicasDTOList());



        /*List<Optional<Reserva>> optionalReservaList = reservaRepository.findReservasByProductoId(id);
        for (Optional<Reserva> r : optionalReservaList) {
            ReservaDTO reservaDTO = mapper.convertValue(r.get(), ReservaDTO.class);
            productoDTO.getReservaDTOList().add(reservaDTO);

        }*/
        List<Optional<Politica>> optionalPoliticaList = politicaRepository.findPoliticasByProductId(id);
        for (Optional<Politica> pol : optionalPoliticaList) {
            PoliticaDTO politicaDTO = mapper.convertValue(pol.get(), PoliticaDTO.class);
            politicaDTO.setTipo_politica_id(pol.get().getTipoDePoliticas().getId());
            productoDTO.getPoliticaListDTO().add(politicaDTO);

        }


        return productoDTO;
    }

    @Override
    public List<ProductoCardDTO> listarTodos(){
        List<Producto> productosList = productoRepository.findAll();


        List<ProductoCardDTO> productoDTOList = new ArrayList<>();
        for (Producto producto : productosList
        ) {
            ProductoCardDTO productoDTO = obteberProductoDTOConTodosLosAtributos(producto, producto.getId());

            productoDTOList.add(productoDTO);

        }

        Collections.shuffle(productoDTOList);

        return productoDTOList;

    }

    @Override
    public List<ProductoCardDTO> listarTodosOrdenados() {
        List<Producto> productosList = productoRepository.findAll();


        List<ProductoCardDTO> productoDTOList = new ArrayList<>();
        for (Producto producto : productosList
        ) {
            ProductoCardDTO productoDTO = obteberProductoDTOConTodosLosAtributos(producto, producto.getId());

            productoDTOList.add(productoDTO);

        }

        productoDTOList.sort(Comparator.comparing(ProductoCardDTO::getId));

        return productoDTOList;
    }

    @Override
    public ProductoDTO editar(ProductoDTO productoDTO) throws ResourceNotFoundException ,BadRequestException {

        Optional<Producto> producto = productoRepository.findById(productoDTO.getId());

        if (productoDTO.getCiudad_id()==null || productoDTO.getCategoria_id()==null)
            throw new BadRequestException("El producto debe tener asignada una ciudad y una categoria");

        if (producto.isEmpty())
            throw new ResourceNotFoundException("No se ha encontrado el producto con ese id" + productoDTO.getId());

        ProductoDTO productoDTOConId = cargarProductoYRetornarDTO(productoDTO);

        /*List<ReservaDTO> reservaDTOList = productoDTO.getReservaDTOList();

        for (ReservaDTO r : reservaDTOList) {
            Reserva reserva = mapper.convertValue(r, Reserva.class);
            reserva.setProducto(producto.get());
            reservaRepository.save(reserva);
            producto.get().getReservaSet().add(reserva);
        }

        List<PuntuacionDTO> puntuacionDTOList = productoDTO.getPuntuacionDTOList();

        for (PuntuacionDTO punt:puntuacionDTOList) {
            Puntuacion puntuacion =mapper.convertValue(punt, Puntuacion.class);
            puntuacion.setProducto(producto.get());
            puntuacionRepository.save(puntuacion);
            producto.get().getPuntuacionList().add(puntuacion);
        }

        List<ReaccionDTO> reaccionDTOList = productoDTO.getReaccionDTOList();

        for (ReaccionDTO reaccionDTO: reaccionDTOList) {
            Reaccion reaccion = mapper.convertValue(reaccionDTO, Reaccion.class);
            reaccion.setProducto(producto.get());
            reaccionRepository.save(reaccion);
            producto.get().getReaccionList().add(reaccion);
        }*/


        return productoDTOConId;
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {

        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isEmpty()){
            throw new ResourceNotFoundException("No se pudo encontrar el producto a eliminar");
        }
        productoRepository.deleteById(id);
    }

    @Override
    public List<ProductoCardDTO> buscarProductosPorCategoria(Long id) throws ResourceNotFoundException {
        List<Optional<Producto>> productosList = productoRepository.listarProductosByCategoryId(id);
        if (productosList.isEmpty())
            throw new ResourceNotFoundException("No se encontraron productos con ésa categoria");


        List<ProductoCardDTO> productoDTOList = new ArrayList<>();
        for (Optional<Producto> producto : productosList
        ) {
            ProductoCardDTO productoDTO = obteberProductoDTOConTodosLosAtributos(producto.get(), producto.get().getId());

            productoDTOList.add(productoDTO);

        }

        productoDTOList.sort(Comparator.comparing(ProductoCardDTO::getId));

        return productoDTOList;
    }


    @Override
    public List<ProductoCardDTO> buscarProductosPorCiudad(Long id) throws ResourceNotFoundException {

        List<Optional<Producto>> productosList = productoRepository.listarProductosByCiudadId(id);
        if (productosList.isEmpty())
            throw new ResourceNotFoundException("No se encontraron productos de ésa ciudad");
        List<ProductoCardDTO> productoDTOList = new ArrayList<>();
        for (Optional<Producto> producto : productosList
        ) {

            ProductoCardDTO productoDTO = obteberProductoDTOConTodosLosAtributos(producto.get(), producto.get().getId());

            productoDTOList.add(productoDTO);
        }

        productoDTOList.sort(Comparator.comparing(ProductoCardDTO::getId));

        return productoDTOList;
    }

    @Override
    public List<ProductoCardDTO> buscarProductosPorDisponibilidad(DisponibilidadDTO disponibilidadDTO) throws ResourceNotFoundException {
        List<Optional<Producto>> productosDisponiblesDB = productoRepository.listarProductosByDisponibilidad(disponibilidadDTO.getFechaInicioReserva(), disponibilidadDTO.getFechaFinReserva());
        if (productosDisponiblesDB.isEmpty())
            throw new ResourceNotFoundException("No se encontraron productos disponibles en ése rango de fechas");

        List<ProductoCardDTO> productoDTOList = new ArrayList<>();
        for (Optional<Producto> producto : productosDisponiblesDB
        ) {

            ProductoCardDTO productoDTO = obteberProductoDTOConTodosLosAtributos(producto.get(), producto.get().getId());

            productoDTOList.add(productoDTO);
        }

        productoDTOList.sort(Comparator.comparing(ProductoCardDTO::getId));

        return productoDTOList;
    }

    @Override
    public List<ProductoCardDTO> buscarProductosPorCiudadYRangoFecha(CiudadYFechaReservaDTO ciudadYFechaReservaDTO) throws ResourceNotFoundException {
        List<Optional<Producto>> productosDisponiblesEnCiudadYFechaIndicada = productoRepository.listarProductosDisponiblesByCiudadYFecha(ciudadYFechaReservaDTO.getFechaInicioReserva(),ciudadYFechaReservaDTO.getFechaFinReserva(),ciudadYFechaReservaDTO.getId_ciudad());

        if (productosDisponiblesEnCiudadYFechaIndicada.isEmpty())
            throw new ResourceNotFoundException("No se encontraron productos disponibles en ése rango de fechas");

        List<ProductoCardDTO> productoDTOList = new ArrayList<>();
        for (Optional<Producto> producto : productosDisponiblesEnCiudadYFechaIndicada
        ) {

            ProductoCardDTO productoDTO = obteberProductoDTOConTodosLosAtributos(producto.get(), producto.get().getId());

            productoDTOList.add(productoDTO);
        }

        productoDTOList.sort(Comparator.comparing(ProductoCardDTO::getId));

        return productoDTOList;
    }

    @Override
    public List<ProductoCardDTO> listarProductosFavoritosByUsuarioId(Long id) throws ResourceNotFoundException {

        Optional<Usuario> usuarioEncontrado = usuarioRepository.findById(id);
        if (usuarioEncontrado.isEmpty()) throw new ResourceNotFoundException("No se ha encontrado el usuario con el id indicado");

        List<Optional<Producto>> productosFavoritosPorUsuario = productoRepository.listarProductosFavoritosByUsuarioId(id);

        if (productosFavoritosPorUsuario.isEmpty())
            throw new ResourceNotFoundException("El usuario no ha agregado ningún producto a sus favoritos");

        List<ProductoCardDTO> productoDTOList = new ArrayList<>();
        for (Optional<Producto> producto :productosFavoritosPorUsuario
        ) {

            ProductoCardDTO productoDTO = obteberProductoDTOConTodosLosAtributos(producto.get(), producto.get().getId());

            productoDTOList.add(productoDTO);
        }

        productoDTOList.sort(Comparator.comparing(ProductoCardDTO::getId));

        return productoDTOList;
    }


}