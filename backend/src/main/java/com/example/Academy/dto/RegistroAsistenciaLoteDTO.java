package com.example.Academy.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data 
public class RegistroAsistenciaLoteDTO {
    private Long cursoId;
    private LocalDate fecha;
    private List<AlumnoAsistenciaDTO> alumnos;
}