package com.example.Academy.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.MaterialCursoResponseDTO;

public interface MaterialCursoService {

    MaterialCursoResponseDTO subirMaterial(
            Long cursoId,
            Long docenteId,
            MultipartFile file,
            String nombre,
            String tipo
        );

    List<MaterialCursoResponseDTO> obtenerPorCurso(Long cursoId);

    Resource descargar(Long id);

    void eliminar(Long id);

    List<MaterialCursoResponseDTO> obtenerPorDocente(Long docenteId);



    
}
