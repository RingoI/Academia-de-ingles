package com.example.Academy.dto;


import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter

public class CreateCursoRequestDTO {

    private String nombre;
    private Integer cupo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Long nivelId;
    private Long docenteId;
    private Long alumnoId;
    private List<Long> nivelesIds;
    private List<Long> docentesIds;
    private List<Long> alumnosIds;
    
}
