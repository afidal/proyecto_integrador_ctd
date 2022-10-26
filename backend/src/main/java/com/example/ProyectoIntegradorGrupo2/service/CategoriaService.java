package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.Categoria;
import com.example.ProyectoIntegradorGrupo2.model.dto.categoriaDTO.CategoriaDTO;
import com.example.ProyectoIntegradorGrupo2.repository.ICategoriaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class CategoriaService implements ICategoriaService{

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    ObjectMapper mapper;

    //Método compartido entre la función aqgregarCategoría y editarCategoria
    //Guarda una categoria en la base de datos y retorna una categoriaDTO
    private CategoriaDTO cargarCategoria(CategoriaDTO categoriaDTO){
        Categoria categoria = mapper.convertValue(categoriaDTO, Categoria.class);
        Categoria categoriaGuardadaEnDB = categoriaRepository.save(categoria);
        return mapper.convertValue(categoriaGuardadaEnDB, CategoriaDTO.class);
    }

    //Guarda una categoria en la base de datos y retorna una categoriaDTO
    @Override
    public CategoriaDTO agregarCategoria(CategoriaDTO categoriaDTO) throws BadRequestException {
        if (categoriaDTO.getTitulo() ==null || categoriaDTO.getDescripcion()==null || categoriaDTO.getUrl_imagen()==null || categoriaDTO.getTitulo().equals("") || categoriaDTO.getDescripcion().equals("") || categoriaDTO.getUrl_imagen().equals("")){
            throw new BadRequestException("No se puede agregar una categoria con campos nulos o vacíos");
        }
        return cargarCategoria(categoriaDTO);
    }


    //Busca las categorias en la base de datos y retorna una coleccion de categoriasDTO
    @Override
    public List<CategoriaDTO> listarTodas() {
        List<Categoria> categoriasList = categoriaRepository.findAll();

        List<CategoriaDTO> categoriaDTOList = new ArrayList<CategoriaDTO>();

        for (Categoria c:categoriasList) {
            categoriaDTOList.add(mapper.convertValue(c, CategoriaDTO.class));

        }

        categoriaDTOList.sort(Comparator.comparing(CategoriaDTO::getId));

        return categoriaDTOList;
    }



    //Busca una categoria por su id en la base de datos y retorna una categoriasDTO
    @Override
    public CategoriaDTO obtenerCategoriaPorId(Long id) throws ResourceNotFoundException{
        Optional<Categoria> categoriaPorId = categoriaRepository.findById(id);

        CategoriaDTO categoriaDTOPorId = null;

        if (categoriaPorId.isEmpty()){
            throw new ResourceNotFoundException("No se pudo encontrar la categoria con el id indicado");
        }

        if (categoriaPorId.isPresent()) {
            categoriaDTOPorId= mapper.convertValue(categoriaPorId, CategoriaDTO.class);
        }
        return categoriaDTOPorId;
    }

    //Busca una categoria a editar por su id. Si no existe devuelve exceptcion
    // y si existe guarda la categoria con los cambios
    @Override
    public CategoriaDTO editar(CategoriaDTO categoriaDTO) throws ResourceNotFoundException {
        Optional<Categoria> c = categoriaRepository.findById(categoriaDTO.getId());

        if (c.isEmpty()){
            throw new ResourceNotFoundException("No se pudo encontrar la categoria para editar");
        }

        return cargarCategoria(categoriaDTO);
    }

    //Elimina una categoria de la base de datos
    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Categoria> c = categoriaRepository.findById(id);

        if (c.isEmpty()){
            throw new ResourceNotFoundException("No se pudo encontrar la categoria a eliminar");
        }

        categoriaRepository.deleteById(id);
    }


}
