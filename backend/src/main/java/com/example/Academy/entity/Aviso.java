package com.example.Academy.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
public class Aviso {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String titulo;
	private String cuerpo;

	@ManyToOne
	@JoinColumn(name = "usuario_id")
	private Persona creador;

	@ManyToOne
	@JoinColumn(name = "curso_id") //si el docente especifica el curso
	@JsonIgnore
	private Curso curso;

	//por si el aviso es a todo el instituto
	private boolean institucional;

	private LocalDateTime fechaCreacion = LocalDateTime.now();

}
