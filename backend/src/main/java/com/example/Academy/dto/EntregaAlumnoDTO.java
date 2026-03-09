package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EntregaAlumnoDTO {

    private Long id;

    private String tipo; // TAREA o EXAMEN

    private String nombreActividad;

    private String archivoNombre;

    private LocalDate fechaEntrega;

    private Double nota;

    private String comentario;

}