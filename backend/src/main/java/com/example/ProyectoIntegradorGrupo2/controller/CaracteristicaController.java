package com.example.ProyectoIntegradorGrupo2.controller;

import com.example.ProyectoIntegradorGrupo2.service.ICaracterisitcaService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("caracteristicas")
public class CaracteristicaController {

    @Autowired
    private ICaracterisitcaService caracterisitcaService;

    @Operation(summary = "Obtener una lista de todas las caracteristicas ordenadas")
    @GetMapping("/todas")
    public ResponseEntity<?> listarCaracteristicas(){
        return ResponseEntity.ok(caracterisitcaService.listarTodas());
    }
}
