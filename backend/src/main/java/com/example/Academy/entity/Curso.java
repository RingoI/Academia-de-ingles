package com.example.Academy.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.ArrayList;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

@Entity
@Table(name = "Curso")
public class Curso {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private double costo;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Integer cupo;
    private String tipo;

    
    
    @ManyToMany
    @JoinTable(
        name = "curso_nivel",
        joinColumns = @JoinColumn(name = "curso_id"),
        inverseJoinColumns = @JoinColumn(name = "nivel_id")
    )
    private List<Nivel> niveles = new ArrayList<>();


    
    @OneToMany(mappedBy = "curso")
    private List<Administrador> administrador = new ArrayList<>();

    @ManyToMany(mappedBy = "cursos")
    @JsonIgnore
    private List<Docente> docentes = new ArrayList<>();

    @ManyToMany(mappedBy = "cursos")
    @JsonIgnore
    private List<Alumno> alumnos = new ArrayList<>();
    
    @ManyToMany
    @JoinTable(
        name = "curso_material",
        joinColumns = @JoinColumn(name = "curso_id"),
        inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materiales = new ArrayList<>();

    @OneToMany(mappedBy = "curso")
    private List<Asistencia> asistencias = new ArrayList<>();

    
}
