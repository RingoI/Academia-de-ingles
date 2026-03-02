package com.example.Academy.dto;

import java.time.LocalDate;
import java.util.List;

import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Nivel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CursoAlumnoDTO {
	private Long id;
	private String nombre;
	private Integer cupo;
	private List<Docente> docentes;
	private LocalDate fechaInicio;	
	private LocalDate fechaFin;
	private List<Nivel> niveles;
	private Integer cantInscriptos;

	public CursoAlumnoDTO(Long id, String nombre, Integer cupo, LocalDate fechaInicio, LocalDate fechaFin, List<Docente> docentes, List<Nivel> niveles, Integer cantInscriptos) { 
		this.id = id; 
		this.nombre = nombre; 
		this.cupo = cupo; 
		this.fechaInicio = fechaInicio; 
		this.fechaFin = fechaFin; 
		this.docentes = docentes;
		this.niveles = niveles;
		this.cantInscriptos = cantInscriptos;
	}
}
