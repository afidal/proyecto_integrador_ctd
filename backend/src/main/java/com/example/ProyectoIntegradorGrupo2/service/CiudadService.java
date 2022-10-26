package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.exceptions.BadRequestException;
import com.example.ProyectoIntegradorGrupo2.exceptions.ResourceNotFoundException;
import com.example.ProyectoIntegradorGrupo2.model.Ciudad;
import com.example.ProyectoIntegradorGrupo2.model.dto.ciudadDTO.CiudadDTO;
import com.example.ProyectoIntegradorGrupo2.repository.ICiudadRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
//@Transactional
public class CiudadService implements ICiudadService {

    @Autowired
    private ICiudadRepository ciudadRepository;

    @Autowired
    ObjectMapper mapper;

    private CiudadDTO cargarCiudad(CiudadDTO ciudadDTO) {
        Ciudad ciudad = mapper.convertValue(ciudadDTO, Ciudad.class);
        Ciudad ciudadGuardadaEnDB = ciudadRepository.save(ciudad);
        return mapper.convertValue(ciudadGuardadaEnDB, CiudadDTO.class);
    }

    @Override
    public CiudadDTO agregarCiudad(CiudadDTO ciudadDTO) throws BadRequestException {
        if (ciudadDTO.getNombre() == null || ciudadDTO.getProvincia() == null || ciudadDTO.getPais() == null ||
                ciudadDTO.getNombre().equals("") || ciudadDTO.getProvincia().equals("") || ciudadDTO.getPais().equals("")) {
            throw new BadRequestException("No se puede agregar una ciudad con campos nulos o vacíos");
        }
        return cargarCiudad(ciudadDTO);
    }

    @Override
    public CiudadDTO obtenerCiudadPorId(Long id) throws ResourceNotFoundException {
        Optional<Ciudad> ciudadPorId = ciudadRepository.findById(id);
        CiudadDTO ciudadDTOPorId = null;
        if (ciudadPorId.isEmpty()) {
            throw new ResourceNotFoundException("No se pudo encontrar la ciudad con el id indicado");
        }
        if (ciudadPorId.isPresent()) {
            ciudadDTOPorId = mapper.convertValue(ciudadPorId, CiudadDTO.class);
        }
        return ciudadDTOPorId;
    }

    @Override
    public List<CiudadDTO> listarTodas() {
        List<Ciudad> ciudadesList = ciudadRepository.findAll();
        List<CiudadDTO> ciudadDTOList = new ArrayList<>();
        for (Ciudad ciudad:ciudadesList) {
            ciudadDTOList.add(mapper.convertValue(ciudad, CiudadDTO.class));
        }
        ciudadDTOList.sort(Comparator.comparing(CiudadDTO::getId));
        return ciudadDTOList;
    }

    @Override
    public CiudadDTO editar(CiudadDTO ciudadDTO) throws ResourceNotFoundException {
        Optional<Ciudad> ciudad = ciudadRepository.findById(ciudadDTO.getId());
        if (ciudad.isEmpty()) {
            throw new ResourceNotFoundException("No se pudo encontrar la ciudad para editar");
        }
        return cargarCiudad(ciudadDTO);
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Ciudad> ciudad = ciudadRepository.findById(id);
        if (ciudad.isEmpty()) {
            throw new ResourceNotFoundException("No se pudo encontrar la ciudad a eliminar");
        }
        ciudadRepository.deleteById(id);
    }
}
