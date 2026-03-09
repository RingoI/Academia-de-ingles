package com.example.Academy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AvisoRequestDTO {
	private String titulo;
	private String cuerpo;
	private Long curso_id;
	private boolean institucional;
}
