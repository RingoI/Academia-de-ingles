package com.example.Academy.entity;

import java.time.LocalDate;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

@Entity
@Table(name = "entrega")
public class Entrega {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombreArchivo;
	private String tipo; //La idea sería poner "TAREA", "EXAMEN o "MATERIAL"
	private LocalDate fechaSubida;

	@ManyToOne
	private Curso curso;

	private String subidoPor; // "ALUMNO" o "DOCENTE"
	private Long usuarioId;

}
