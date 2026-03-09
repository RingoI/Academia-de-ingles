package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateTareaRequestDTO;
import com.example.Academy.dto.TareaResponseDTO;
import com.example.Academy.dto.UpdateTareaRequestDTO;


@Service
public interface TareaService {

    TareaResponseDTO crearTarea(CreateTareaRequestDTO request);
    List<TareaResponseDTO> obtenerTareasPorCurso(Long cursoId);
    void eliminarTarea(Long tareaId);
    List<TareaResponseDTO> obtenerTareas();
    TareaResponseDTO actualizarTarea(Long id, UpdateTareaRequestDTO dto);

}
