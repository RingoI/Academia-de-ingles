package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CreateExamenRequestDTO {

    private String nombre;
    private LocalDate fecha;
    private String tipo;
    private Double puntajeMaximo;

    private Long nivelId;
    private Long docenteId;
}
