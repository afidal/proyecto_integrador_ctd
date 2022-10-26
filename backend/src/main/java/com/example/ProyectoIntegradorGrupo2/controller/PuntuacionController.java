package com.example.ProyectoIntegradorGrupo2.controller;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.puntuacionDTO.PuntuacionDTO;
import com.example.ProyectoIntegradorGrupo2.service.IPuntuacionService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/puntuaciones")
public class PuntuacionController {

    @Autowired
    private IPuntuacionService puntuacionService;

    @Operation(summary = "Agregar una puntuación")
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO) throws BadRequestException {

        PuntuacionDTO puntuacionAgregada = puntuacionService.agregarPuntuacion(puntuacionDTO);
        return ResponseEntity.ok(puntuacionAgregada.getId());

    }

    @Operation(summary = "Obtener una puntuación por su id")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPuntuacionPorId(@PathVariable Long id) throws ResourceNotFoundException {

        return ResponseEntity.ok(puntuacionService.obtenerPuntuacionPorId(id));

    }

    @Operation(summary = "Borrar una puntuación")
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarPuntuacion(@PathVariable Long id) throws ResourceNotFoundException {

       puntuacionService.eliminar(id);
        return ResponseEntity.ok().body("DELETED");

    }

    @Operation(summary = "Obtener una lista de todas las puntuaciones")
    @GetMapping("/todas")
    public ResponseEntity<Collection<PuntuacionDTO>> listarTodas() {
        return ResponseEntity.ok(puntuacionService.listarTodas());
    }

    @Operation(summary = "Modificar una puntuación")
    @PutMapping("/editar")
    public ResponseEntity<?> editarPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO) throws ResourceNotFoundException, BadRequestException {
        puntuacionService.editar(puntuacionDTO);
        return ResponseEntity.ok().body("UPDATED");
    }

    @Operation(summary = "Listar todas las puntuaciones de un producto")
    @GetMapping("/porProducto/{id}")
    public  ResponseEntity<?> listarPuntuacionesPorIdUsuario(@PathVariable Long id) throws ResourceNotFoundException {

        return ResponseEntity.ok(puntuacionService.findPuntuacionesByProductoId(id));
    }

    @Operation(summary = "Mostrar la puntuación que un usuario le dió a un determinado producto")
    @GetMapping("/porProducto/{id_producto}/porUsuario/{id_usuario}")
    ResponseEntity<?> encontrarPuntuacionByProductoIdAndUsuarioId(@PathVariable Long id_producto, @PathVariable Long id_usuario) throws ResourceNotFoundException {
        return ResponseEntity.ok(puntuacionService.findPuntuacionByProductoIdAndUsuarioId(id_producto, id_usuario));
    }

    @Operation(summary = "Borrar una puntuación por id de producto y id de usuario")
    @DeleteMapping("/eliminar/porProducto/{id_producto}/porUsuario/{id_usuario}")
    public ResponseEntity<?> eliminarPuntuacionByProductoIdAndUsuarioId(@PathVariable Long id_producto, @PathVariable Long id_usuario) throws ResourceNotFoundException {
        PuntuacionDTO puntuacion = puntuacionService.findPuntuacionByProductoIdAndUsuarioId(id_producto, id_usuario);
        puntuacionService.eliminar(puntuacion.getId());
        return ResponseEntity.ok().body("DELETED");

    }


}
