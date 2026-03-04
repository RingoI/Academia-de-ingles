package com.example.Academy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoAsistenciaDTO {
    private Long alumnoId;
    private boolean presente;
}