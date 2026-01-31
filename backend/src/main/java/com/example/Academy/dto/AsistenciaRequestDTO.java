package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AsistenciaRequestDTO {

    private Long alumnoId;
    private Long cursoId;
    private LocalDate fecha;
    private boolean presente;
}
