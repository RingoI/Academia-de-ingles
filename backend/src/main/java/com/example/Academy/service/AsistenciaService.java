package com.example.Academy.service;


import org.springframework.stereotype.Service;

import com.example.Academy.dto.AsistenciaRequestDTO;
import com.example.Academy.dto.AsistenciaResponseDTO;
import com.example.Academy.dto.UpdateAsistenciaDTO;

@Service
public interface AsistenciaService {
        
    public AsistenciaResponseDTO tomarAsistencia(AsistenciaRequestDTO dto);

    AsistenciaResponseDTO updateAsistencia(Long asistenciaId, UpdateAsistenciaDTO dto);

    public void eliminarAsistencia(Long asistenciaId);

    

}

    

