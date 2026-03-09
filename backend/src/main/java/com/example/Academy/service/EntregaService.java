package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.CorregirEntregaDTO;
import com.example.Academy.dto.EntregaAlumnoDTO;
import com.example.Academy.dto.EntregaResponseDTO;
import org.springframework.core.io.Resource;


@Service
public interface EntregaService {

    void eliminarArchivo(Long entregaId);
    List <EntregaResponseDTO> obtenerArchivosPorCurso(Long cursoId);
    EntregaResponseDTO obtenerArchivoPorId(Long entregaId);
    Resource descargarArchivo(Long entregaId);
    EntregaResponseDTO subirEntregaTarea(Long tareaId, Long alumnoId, MultipartFile file, String nombre);
    EntregaResponseDTO subirEntregaExamen(Long examenId, Long alumnoId, MultipartFile file, String nombre);
    EntregaResponseDTO corregirEntrega(Long entregaId, CorregirEntregaDTO dto);
    List<EntregaAlumnoDTO> obtenerHistorialAlumno(Long alumnoId);
    void reentregar(Long entregaId, MultipartFile file, String nombre);
}


