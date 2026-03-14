package com.example.Academy.entity;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
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
import java.util.HashSet;

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
    private Double costo;
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
    @JsonManagedReference
    private List<Nivel> niveles = new ArrayList<>();


    
    @OneToMany(mappedBy = "curso")
    private List<Administrador> administrador = new ArrayList<>();

    @ManyToMany(mappedBy = "cursos")
    @JsonIgnore
    private List<Docente> docentes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "alumno_curso", // <--- Asegurate que tu INSERT sea en ESTA tabla
        joinColumns = @JoinColumn(name = "curso_id"),
        inverseJoinColumns = @JoinColumn(name = "alumno_id")
    )
    private Set<Alumno> alumnos = new HashSet<>();
     
    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Aviso> avisos;
    
    @ManyToMany
    @JoinTable(
        name = "curso_material",
        joinColumns = @JoinColumn(name = "curso_id"),
        inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materiales = new ArrayList<>();

    @OneToMany(mappedBy = "curso")
    private List<Asistencia> asistencias = new ArrayList<>();

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tema> temas;
    
}
