package com.example.ProyectoIntegradorGrupo2;

import com.example.ProyectoIntegradorGrupo2.model.dto.categoriaDTO.CategoriaDTO;
import com.example.ProyectoIntegradorGrupo2.service.CategoriaService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
public class CategoriaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoriaService categoriaService;

    @Test
    public void buscarCategoriaPorId() throws Exception{
        CategoriaDTO categoriaDTO = new CategoriaDTO();
        categoriaDTO.setTitulo("Hostels");
        categoriaDTO.setDescripcion("Una descripción para el hostel");
        categoriaDTO.setUrl_imagen("https://images.unsplash.com/photoTest");

        CategoriaDTO categoriaDTOGuardada = categoriaService.agregarCategoria(categoriaDTO);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/categorias/{id}", ""+categoriaDTOGuardada.getId()+"")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Assertions.assertFalse(mvcResult.getResponse().getContentAsString().isEmpty());
        Assertions.assertEquals("application/json", mvcResult.getResponse().getContentType());
    }
}
