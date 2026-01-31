package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.EntregaResponseDTO;
import com.example.Academy.dto.CorregirEntregaDTO;

@Service
public interface EntregaService {

    void eliminarEntrega(Long entregaId);
    EntregaResponseDTO corregirEntrega(Long examenId, CorregirEntregaDTO dto);
    EntregaResponseDTO realizarEntrega(Long examenId, Long alumnoId, MultipartFile file);
    EntregaResponseDTO obtenerEntregaPorId(Long entregaId);
    List<EntregaResponseDTO> obtenerEntregasPorExamen(Long examenId);
    List<EntregaResponseDTO> obtenerEntregas();
    List<EntregaResponseDTO> obtenerEntregasPorAlumno(Long alumnoId);


}


