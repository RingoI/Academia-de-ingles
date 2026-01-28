package com.example.Academy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EntregaResponseDTO {

    
    
    private Long id;
    private String alumno;
    private String examen;
    private String archivoEntregado;
    private Double nota;
    private Boolean aprobado;

}   
