/*package com.example.ProyectoIntegradorGrupo2;*/

/*import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.model.Caracteristicas;
import com.example.ProyectoIntegradorGrupo2.model.dto.*;
import com.example.ProyectoIntegradorGrupo2.service.ICategoriaService;
import com.example.ProyectoIntegradorGrupo2.service.IProductoService;
import org.apache.log4j.Logger;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;*/

//@FixMethodOrder(MethodSorters.NAME_ASCENDING)
//@SpringBootTest
/*public class ProductoServiceTest {*/

    /*private static final Logger logger = Logger.getLogger(ProductoServiceTest.class);
    @Autowired
    private IProductoService productoService;

    @Autowired
    private ICategoriaService categoriaService;

    @Test
    public void guardarProducto() throws BadRequestException{
        logger.debug("Inicializando categoria");
        CategoriaDTO categoriaDTO = new CategoriaDTO();
        categoriaDTO.setTitulo("Hostels");
        categoriaDTO.setDescripcion("Descripcion categoria test");
        categoriaDTO.setUrl_imagen("https://images.unsplash.com/photoTest");

        logger.debug("Guardando categoria");
        CategoriaDTO categoriaDTOGuardada = this.categoriaService.agregarCategoria(categoriaDTO);

        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setTitulo("Casona");
        productoDTO.setDescripcion("La mejor casona");
        productoDTO.setCategoriaDTO(categoriaDTOGuardada);
        CiudadDTO ciudadDTO = new CiudadDTO();
        ciudadDTO.setNombre("CABA");
        ciudadDTO.setProvincia("Buenas Aires");
        ciudadDTO.setPais("Argentina");
        productoDTO.setCiudadDTO(ciudadDTO);
        ImagenDTO imagenDTO = new ImagenDTO();
        imagenDTO.setTitulo_img_producto("la imagen de casona");
        imagenDTO.setUrl_img_producto("http://urlImagen");
        ImagenDTO imagenDTO1 = new ImagenDTO();
        imagenDTO1.setTitulo_img_producto("imagen interior casona");
        imagenDTO1.setUrl_img_producto("http://urlImagen");
        List<ImagenDTO> imagenDTOList = new ArrayList<>();
        imagenDTOList.add(imagenDTO);
        imagenDTOList.add(imagenDTO1);
        productoDTO.setImagenDTOList(imagenDTOList);
        *//*productoDTO.getImagenDTOList().add(imagenDTO);
        productoDTO.getImagenDTOList().add(imagenDTO1);*//*
        CaracteristicasDTO caracteristicasDTO = new CaracteristicasDTO();
        caracteristicasDTO.setTitulo("wifi");
        caracteristicasDTO.setNombre_icono("wifi");
        CaracteristicasDTO caracteristicasDTO1 = new CaracteristicasDTO();
        caracteristicasDTO1.setTitulo("cocina");
        caracteristicasDTO1.setNombre_icono("cocina");
        List<CaracteristicasDTO> caracteristicasDTOList = new ArrayList<>();
        caracteristicasDTOList.add(caracteristicasDTO);
        caracteristicasDTOList.add(caracteristicasDTO1);
        productoDTO.setCaracteristicasDTOList(caracteristicasDTOList);

        PoliticaDTO politicaDTO = new PoliticaDTO();
        politicaDTO.setCancelacion_descripcion("hasta 10 días antes");
        politicaDTO.setNorma_descripcion("No se aceptan mascotas");
        politicaDTO.setSeguridad_descripcion("Usar barbijo en áreas comunes");
        productoDTO.setPoliticaDTO(politicaDTO);
        ReservaDTO reservaDTO = new ReservaDTO();
        reservaDTO.setFechaInicioReserva(new Date());
        reservaDTO.setFechaFinReserva(new Date(1900,11,3));
        ReservaDTO reservaDTO1 = new ReservaDTO();
        reservaDTO1.setFechaInicioReserva(new Date(1900, 12,05));
        reservaDTO1.setFechaFinReserva(new Date(1900,12,15));
        List<ReservaDTO> reservaDTOList = new ArrayList<>();
        reservaDTOList.add(reservaDTO);
        reservaDTOList.add(reservaDTO1);
        productoDTO.setReservaDTOList(reservaDTOList);

        ProductoDTO productoDTOGuardado = this.productoService.agregarProducto(productoDTO);

        Assertions.assertNotNull(categoriaDTOGuardada.getId());
    }*/
/*}*/
