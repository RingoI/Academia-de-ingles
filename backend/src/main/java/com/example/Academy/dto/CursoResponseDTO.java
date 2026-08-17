package com.example.Academy.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CursoResponseDTO {

    private Long id;
    private String nombre;
    private List<String> niveles;
    
    // Tuve que cambiar String por PersonaDTO para enviar ID y nombre, necesario para desvincular alumnos y docentes de cursos.
    private List<PersonaDTO> docentes; 
    private List<PersonaDTO> alumnos;
    
    private Integer cupo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private BigDecimal costo;
}

