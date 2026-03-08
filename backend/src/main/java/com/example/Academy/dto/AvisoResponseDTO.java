package com.example.Academy.dto;

import java.time.LocalDateTime;

import com.example.Academy.entity.Persona;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AvisoResponseDTO {
	private Long id;
	private String titulo;
	private String cuerpo;
	private LocalDateTime fechaCreacion;
	private boolean institucional;
	private Persona creador;
	private String nombreCurso;
}
