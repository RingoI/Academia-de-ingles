package com.example.Academy.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAlumnoDTO {

   private String username;
    private String password;
    private String dni;
    private Long nivelId;
    private String nombre;
    private String email;
    private String direccion;
    private LocalDate fechanacimiento;
    private Boolean estado;
}
