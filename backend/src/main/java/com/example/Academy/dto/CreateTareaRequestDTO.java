package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreateTareaRequestDTO {

    private String nombre;
    private LocalDate fechaEntrega;
    private Long cursoId;
    private Long docenteId;
    
}
