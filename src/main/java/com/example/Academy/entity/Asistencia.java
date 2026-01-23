package com.example.Academy.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

@Entity
@Table(name = "Asistencia")
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private Alumno alumno;

    private Boolean estado;
    private Date fecha;

    @ManyToOne 
    @JoinColumn(name = "docentes") 
    private Docente docente;

    @ManyToMany(mappedBy = "asistencias")
    private List<Docente> docentes = new ArrayList<>();

    @OneToMany(mappedBy = "asistencia")
    private List<Alumno> alumnos = new ArrayList<>();

    @OneToMany(mappedBy = "asistencia")
    private List<Curso> cursos   = new ArrayList<>();

}