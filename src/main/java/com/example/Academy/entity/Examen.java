package com.example.Academy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "Examen")
public class Examen {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private Date fecha;
    private String tipo;
    private double puntaje;

    
    @ManyToOne 
    @JoinColumn(name = "nivel_id") 
    private Nivel nivel;
    
    @ManyToOne 
    @JoinColumn(name = "docente_id") 
    private Docente docente;

    @ManyToOne
    @JoinColumn(name = "asistencia_id")
    private Asistencia asistencia;


    @ManyToMany(mappedBy = "examen")
    private List<Alumno> alumnos = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Nivel niveles;
}
