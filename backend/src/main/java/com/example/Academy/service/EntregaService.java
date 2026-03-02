package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.EntregaResponseDTO;
import org.springframework.core.io.Resource;


@Service
public interface EntregaService {

    EntregaResponseDTO subirArchivo(Long cursoId, Long usuarioId, String rol, MultipartFile file, String tipo, String nombre);
    void eliminarArchivo(Long entregaId);
    List <EntregaResponseDTO> obtenerArchivosPorCurso(Long cursoId);
    EntregaResponseDTO obtenerArchivoPorId(Long entregaId);
    Resource descargarArchivo(Long entregaId);
    List<EntregaResponseDTO> buscarPorDocente(Long docenteId);
}


