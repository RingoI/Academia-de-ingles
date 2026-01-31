package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class UpdateDocenteRequestDTO {

    private String username;
    private String password;
    private String titulo;
    private Boolean estado;
    private String cuit;
    private String nombre;
    private String email;
    private String direccion;
    private LocalDate fechanacimiento;
}

