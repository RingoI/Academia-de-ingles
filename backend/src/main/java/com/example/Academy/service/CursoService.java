package com.example.Academy.service;

import java.util.List;

import com.example.Academy.dto.CreateCursoRequestDTO;
import com.example.Academy.dto.CursoResponseDTO;
import com.example.Academy.dto.UpdateCursoRequestDTO;

public interface CursoService {
    
    CursoResponseDTO crearCurso(CreateCursoRequestDTO dto);
    List<CursoResponseDTO> obtenerCursos();
    CursoResponseDTO obtenerCursoPorId(Long id);
    void eliminarCurso(Long id);
    CursoResponseDTO actualizarCurso(Long id, UpdateCursoRequestDTO dto);
    
    // Nuevos metodos
    void asignarAlumno (Long cursoID, Long alumnoID);
    void asignarDocente(Long cursoId, Long docenteId);
    void desvincularAlumno(Long cursoId, Long alumnoId);
    void desvincularDocente(Long cursoId, Long docenteId);
}
