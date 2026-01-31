package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateExamenRequestDTO;
import com.example.Academy.dto.ExamenResponseDTO;
import com.example.Academy.dto.UpdateExamenRequestDTO;

@Service
public interface ExamenService {

    ExamenResponseDTO crearExamen(CreateExamenRequestDTO dto);
    List<ExamenResponseDTO> obtenerExamenes();
    ExamenResponseDTO obtenerExamenPorId(Long id);
    void eliminarExamen(Long id);
    ExamenResponseDTO actualizarExamen(Long id, UpdateExamenRequestDTO dto);
}
