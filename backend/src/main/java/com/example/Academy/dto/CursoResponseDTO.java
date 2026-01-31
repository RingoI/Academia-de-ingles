package com.example.Academy.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CursoResponseDTO {

    private Long id;
    private String nombre;
    private List<String> niveles;
    private List<String> docentes;
    private List<String> alumnos;
    private Integer cupo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}

