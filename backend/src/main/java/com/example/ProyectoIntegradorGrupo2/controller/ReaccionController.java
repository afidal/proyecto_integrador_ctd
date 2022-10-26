package com.example.ProyectoIntegradorGrupo2.controller;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.reaccionDTO.ReaccionDTO;
import com.example.ProyectoIntegradorGrupo2.service.IReaccionService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/reacciones")
public class ReaccionController {

    @Autowired
    private IReaccionService reaccionService;

    @Operation(summary = "Agregar una reacción")
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarReaccion(@RequestBody ReaccionDTO reaccionDT0) throws BadRequestException {

        ReaccionDTO reaccionAgregada = reaccionService.agregarReaccion(reaccionDT0);
        return ResponseEntity.ok(reaccionAgregada.getId());

    }

    @Operation(summary = "Obtener una reacción por su id")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerReaccionPorId(@PathVariable Long id) throws ResourceNotFoundException {

        return ResponseEntity.ok(reaccionService.obtenerReaccionPorId(id));

    }

    @Operation(summary = "Borrar una reacción")
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarReaccion(@PathVariable Long id) throws ResourceNotFoundException {
        reaccionService.eliminar(id);
        return ResponseEntity.ok().body("DELETED");

    }

    @Operation(summary = "Obtener una lista de todas las reacciones")
    @GetMapping("/todas")
    public ResponseEntity<Collection<ReaccionDTO>> listarTodas() {
        return ResponseEntity.ok(reaccionService.listarTodas());
    }

    @Operation(summary = "Modificar una reacción")
    @PutMapping("/editar")
    public ResponseEntity<?> editarReaccion(@RequestBody ReaccionDTO reaccionDTO) throws ResourceNotFoundException, BadRequestException {
        reaccionService.editar(reaccionDTO);
        return ResponseEntity.ok().body("UPDATED");
    }

    @Operation(summary = "Listar todas las reacciones de un usuario")
    @GetMapping("/porUsuario/{id}")
    public  ResponseEntity<?> listarReaccionesPorIdUsuario(@PathVariable Long id) throws ResourceNotFoundException {

        return ResponseEntity.ok(reaccionService.findReaccionesByUsuarioId(id));
    }

    @Operation(summary = "Mostrar la reaccion que un usuario le dió a un determinado producto")
    @GetMapping("/porProducto/{id_producto}/porUsuario/{id_usuario}")
    ResponseEntity<?> findReaccionByProductoIdAndUsuarioId(@PathVariable Long id_producto, @PathVariable Long id_usuario) throws ResourceNotFoundException {
        return ResponseEntity.ok(reaccionService.findReaccionByProductoIdAndUsuarioId(id_producto, id_usuario));
    }

    @Operation(summary = "Borrar una reacción por id de producto y id de usuario")
    @DeleteMapping("/eliminar/porProducto/{id_producto}/porUsuario/{id_usuario}")
    public ResponseEntity<?> eliminarReaccion(@PathVariable Long id_producto, @PathVariable Long id_usuario) throws ResourceNotFoundException {
        ReaccionDTO reaccion = reaccionService.findReaccionByProductoIdAndUsuarioId(id_producto, id_usuario);
        reaccionService.eliminar(reaccion.getId());
        return ResponseEntity.ok().body("DELETED");

    }

}