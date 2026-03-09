package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class TareaResponseDTO {

    private Long id;
    private String nombre;
    private LocalDate fechaEntrega;
    private Long cursoId;
    private Long docenteId;

}
