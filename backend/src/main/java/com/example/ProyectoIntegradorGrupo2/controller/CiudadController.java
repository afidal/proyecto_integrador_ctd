package com.example.ProyectoIntegradorGrupo2.controller;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.dto.ciudadDTO.CiudadDTO;
import com.example.ProyectoIntegradorGrupo2.service.ICiudadService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/*@CrossOrigin("*")*/

@RestController
@RequestMapping("/ciudades")
public class CiudadController {

    @Autowired
    private ICiudadService ciudadService;

    @Operation(summary = "Agregar una ciudad")
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarCiudad(@RequestBody CiudadDTO ciudadDTO) throws BadRequestException {
        CiudadDTO ciudadAgregada = ciudadService.agregarCiudad(ciudadDTO);
        return ResponseEntity.ok(ciudadAgregada.getId());
    }

    @Operation(summary = "Obtener una lista de todas las ciudades")
    @GetMapping("/todas")
    public ResponseEntity<Collection<CiudadDTO>> listarCiudades() {
        return ResponseEntity.ok(ciudadService.listarTodas());
    }

    @Operation(summary = "Modificar una ciudad")
    @PutMapping("/editar")
    public ResponseEntity<?> editarCiudad(@RequestBody CiudadDTO ciudadDTO) throws ResourceNotFoundException {
        ciudadService.editar(ciudadDTO);
        return ResponseEntity.ok().body("UPDATED");
    }

    @Operation(summary = "Borrar una ciudad")
    @DeleteMapping("eliminar/{id}")
    public ResponseEntity<?> eliminarCiudad(@PathVariable Long id) throws ResourceNotFoundException {
        ciudadService.eliminar(id);
        return ResponseEntity.ok().body("DELETED");
    }

    @Operation(summary = "Obtener una ciudad por su id")
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCiudadPorId(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(ciudadService.obtenerCiudadPorId(id));
    }


}
