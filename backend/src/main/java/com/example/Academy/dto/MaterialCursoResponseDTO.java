package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MaterialCursoResponseDTO {

    private Long id;
    private Long cursoId;
    private Long docenteId;
    private String nombre;
    private String nombreArchivo;
    private LocalDate fechaSubida;
    private String tipo;
    private String nombreCurso;
}