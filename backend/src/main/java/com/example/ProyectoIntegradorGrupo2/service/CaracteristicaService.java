package com.example.ProyectoIntegradorGrupo2.service;

import com.example.ProyectoIntegradorGrupo2.model.Caracteristicas;
import com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO.CaracteristicasDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.caracteristicaDTO.CaracteristicasTodasDTO;
import com.example.ProyectoIntegradorGrupo2.model.dto.ciudadDTO.CiudadDTO;
import com.example.ProyectoIntegradorGrupo2.repository.ICaracteristicasRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class CaracteristicaService implements ICaracterisitcaService{

    @Autowired
    private ICaracteristicasRepository caracteristicasRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public List<CaracteristicasTodasDTO> listarTodas() {
        List<Optional<Caracteristicas>> caracteristicasList = caracteristicasRepository.findCaracteristicas();

        List<CaracteristicasTodasDTO> caracteristicasDTOList = new ArrayList<>();
        for (Optional<Caracteristicas> c:caracteristicasList) {
            caracteristicasDTOList.add(mapper.convertValue(c.get(),CaracteristicasTodasDTO.class));
        }
        //caracteristicasDTOList.sort(Comparator.comparing(CaracteristicasDTO::getId));
        return caracteristicasDTOList;
    }
}
