package com.example.Academy.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "Alumno")
@DiscriminatorValue("Alumno")
public class Alumno extends Persona {

    private String dni;
    
    @ManyToMany
    @JoinTable( name = "alumno_telefono", 
    joinColumns = @JoinColumn(name = "alumno_id"), 
    inverseJoinColumns = @JoinColumn(name = "telefono_id") ) 
    
    private List<Telefono> telefonos = new ArrayList<>();


    @ManyToMany 
    @JoinTable( name = "alumno_curso", 
    joinColumns = @JoinColumn(name = "alumno_id"), 
    inverseJoinColumns = @JoinColumn(name = "curso_id") ) 
    
    private List<Curso> cursos = new ArrayList<>();

    @OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Nivel> nivel = new ArrayList<>();


    @OneToMany(mappedBy = "alumno")
    private List<Asistencia> asistencias = new ArrayList<>();


    @ManyToMany
    @JoinTable( name = "alumno_examen", 
    joinColumns = @JoinColumn(name = "alumno_id"), 
    inverseJoinColumns = @JoinColumn(name = "examen_id") )
    
    private List<Examen> examen = new ArrayList<>();

    @OneToMany(mappedBy = "alumno", fetch = FetchType.LAZY)
    private List<ExamenAlumno> entregas = new ArrayList<>();

}
