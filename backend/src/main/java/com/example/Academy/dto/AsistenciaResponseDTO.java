package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AsistenciaResponseDTO {

    private Long id;
    private Long alumnoId;     // El ID numérico
    private String alumnoNombre; // El nombre para mostrar 
    private String cursoNombre;  // El nombre del curso
    private LocalDate fecha;
    private boolean presente;
}
