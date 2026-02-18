package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EntregaResponseDTO {

    private Long id;
    private String cursoNombre;
    private String nombreArchivo;
    private String tipo; 
    private LocalDate fechaSubida;
    private String subidoPor;
    private Long usuarioId;
    
/*     
    private Long id;
    private String alumno;
    private String examen;
    private String archivoEntregado;
    private Double nota;
    private Boolean aprobado; */

}
