package com.example.Academy.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

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
    private Date horario;
    private String tipo;

    
    
    @ManyToMany(mappedBy = "cursos" )
    private List<Nivel> niveles = new ArrayList<>();

    
    @OneToMany(mappedBy = "curso")
    private List<Administrador> administrador = new ArrayList<>();

    @ManyToMany(mappedBy = "cursos")
    private List<Docente> docentes = new ArrayList<>();

    @ManyToMany(mappedBy = "cursos")
    private List<Alumno> alumnos = new ArrayList<>();
    
    @ManyToMany
    @JoinTable(
        name = "curso_material",
        joinColumns = @JoinColumn(name = "curso_id"),
        inverseJoinColumns = @JoinColumn(name = "material_id")
    )
    private List<Material> materiales = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "asistencia_id")
    private Asistencia asistencia;
    
}
