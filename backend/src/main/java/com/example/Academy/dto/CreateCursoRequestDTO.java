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
    private Double costo;
    private LocalDate fechaFin;
    private List<Long> nivelesIds;
    private List<Long> docentesIds;
    private List<Long> alumnosIds;

    @Override
    public String toString() {
        return "CreateCursoRequestDTO{" +
                "nombre='" + nombre + '\'' +
                ", cupo=" + cupo +
                ", fechaInicio=" + fechaInicio +
                ", fechaFin=" + fechaFin +
                ", nivelesIds=" + nivelesIds +
                ", docentesIds=" + docentesIds +
                ", alumnosIds=" + alumnosIds +
                '}';
    }

}

