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
    private Long cursoId;

    private String nombreArchivo;
    private String nombreCurso;
    

    private LocalDate fechaSubida;

    private Long alumnoId;

    private Long tareaId;   // puede ser null
    private Long examenId;  // puede ser null

    private String estado;
    private Double nota;
    private String comentario;

    private String alumnoNombre;

    private String nombreTarea;

    private String examenNombre;
}