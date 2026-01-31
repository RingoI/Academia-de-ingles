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
    private String alumno;
    private String curso;
    private LocalDate fecha;
    private boolean presente;
}
