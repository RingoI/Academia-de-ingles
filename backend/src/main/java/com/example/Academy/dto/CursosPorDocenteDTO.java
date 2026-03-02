package com.example.Academy.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Nivel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CursosPorDocenteDTO {
    private Long id;
    private String nombre;
    private Integer cupo;
	private List<Docente> docentes;
	private LocalDate fechaInicio;	
	private LocalDate fechaFin;
	private List<Nivel> niveles;
	private Integer cantInscriptos;
}
