package com.example.Academy.service;

import java.util.List;

import com.example.Academy.dto.CreateCursoRequestDTO;
import com.example.Academy.dto.CursoResponseDTO;
import com.example.Academy.dto.CursosAlumnoDTO;
import com.example.Academy.dto.CursosPorDocenteDTO;
import com.example.Academy.dto.UpdateCursoRequestDTO;
import com.example.Academy.dto.AlumnoResponseDTO;

public interface CursoService {
    
    CursoResponseDTO crearCurso(CreateCursoRequestDTO dto);
    List<CursoResponseDTO> obtenerCursos();
    CursoResponseDTO obtenerCursoPorId(Long id);
    void eliminarCurso(Long id);
    CursoResponseDTO actualizarCurso(Long id, UpdateCursoRequestDTO dto);
    List<CursosPorDocenteDTO> obtenerCursosPorDocente(Long id);
    // Nuevos metodos
    void asignarAlumno (Long cursoID, Long alumnoID);
    void asignarDocente(Long cursoId, Long docenteId);
    void desvincularAlumno(Long cursoId, Long alumnoId);
    void desvincularDocente(Long cursoId, Long docenteId);
    List<AlumnoResponseDTO> obtenerAlumnosPorCurso(Long cursoId);
    List<CursosAlumnoDTO> cursosPorAlumno(Long alumnoId);

}
