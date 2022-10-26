package com.example.ProyectoIntegradorGrupo2;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.model.dto.categoriaDTO.CategoriaDTO;
import com.example.ProyectoIntegradorGrupo2.service.CategoriaService;
import org.apache.log4j.Logger;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@SpringBootTest
public class CategoriaServiceTest {

    private static final Logger logger = Logger.getLogger(CategoriaServiceTest.class);
    @Autowired
    private CategoriaService categoriaService;

    @Test
    public void guardarCategoriaPass() throws BadRequestException {
        logger.debug("Inicializando categoria");
        CategoriaDTO categoriaDTO = new CategoriaDTO();
        categoriaDTO.setTitulo("Hostels");
        categoriaDTO.setDescripcion("Descripcion categoria test");
        categoriaDTO.setUrl_imagen("https://images.unsplash.com/photoTest");

        logger.debug("Guardando categoria");
        CategoriaDTO categoriaDTOGuardada = this.categoriaService.agregarCategoria(categoriaDTO);

        Assertions.assertNotNull(categoriaDTOGuardada.getId());
    }

    @Test
    public void guardarCategoriaBadRequest() throws BadRequestException {
        logger.debug("Inicializando categoria");
        CategoriaDTO categoriaDTO2 = new CategoriaDTO();
        categoriaDTO2.setTitulo("Hostels");
        categoriaDTO2.setDescripcion("Descripcion categoria test");


        logger.debug("Guardando categoria arroja exception");


        Throwable exception = Assertions.assertThrows(BadRequestException.class,() -> {
            this.categoriaService.agregarCategoria(categoriaDTO2);
        });

        Assertions.assertEquals("No se puede agregar una categoria con campos nulos o vacíos", exception.getMessage());
    }
}
