package com.example.ProyectoIntegradorGrupo2.controller;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.categoriaDTO.CategoriaDTO;
import com.example.ProyectoIntegradorGrupo2.service.ICategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/*@CrossOrigin("*")*/
//@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private ICategoriaService categoriaService;

    @Operation(summary = "Agregar una categoría")
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarCategoria(@RequestBody CategoriaDTO categoriaDTO) throws BadRequestException {
        CategoriaDTO categoriaAgregada = categoriaService.agregarCategoria(categoriaDTO);

        return ResponseEntity.ok(categoriaAgregada.getId());
    }

    @Operation(summary = "Obtener una lista de todas las categorias")
    @GetMapping("/todas")
    public ResponseEntity<Collection<CategoriaDTO>> listarCategorias(){
        return ResponseEntity.ok(categoriaService.listarTodas());
    }

    @Operation(summary = "Modificar una categoría")
    @PutMapping("/editar")
    public ResponseEntity<?> editarCategoria(@RequestBody CategoriaDTO categoriaDTO) throws ResourceNotFoundException {
        categoriaService.editar(categoriaDTO);

        return ResponseEntity.ok().body("UPDATED");
    }

    @Operation(summary = "Borrar una categoría")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        categoriaService.eliminar(id);

        return ResponseEntity.ok().body("DELETED");
    }

    @Operation(summary = "Obtener una categoría por su id")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCategoriaPorId(@PathVariable Long id) throws ResourceNotFoundException {


        return ResponseEntity.ok(categoriaService.obtenerCategoriaPorId(id));
    }
}
