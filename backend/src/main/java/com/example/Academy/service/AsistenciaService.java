package com.example.Academy.service;

import java.time.LocalDate;
import java.util.List;


import com.example.Academy.dto.AsistenciaRequestDTO;
import com.example.Academy.dto.AsistenciaResponseDTO;
import com.example.Academy.dto.RegistroAsistenciaLoteDTO;
import com.example.Academy.dto.UpdateAsistenciaDTO;

public interface AsistenciaService {
        
    public AsistenciaResponseDTO tomarAsistencia(AsistenciaRequestDTO dto);

    AsistenciaResponseDTO updateAsistencia(Long asistenciaId, UpdateAsistenciaDTO dto);

    public void eliminarAsistencia(Long asistenciaId);

    public List<AsistenciaResponseDTO> obtenerHistorialPorCurso(Long cursoId);

    public List<AsistenciaResponseDTO> obtenerPorFecha(Long cursoId, LocalDate fecha);

    void guardarProcesoCompleto(List<AsistenciaRequestDTO> dtos);
    
    public void guardarAsistenciaLote(RegistroAsistenciaLoteDTO dto);
}