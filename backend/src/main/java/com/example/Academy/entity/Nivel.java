package com.example.Academy.entity;



import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "Nivel")
public class Nivel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    private String nombre;
 

    @ManyToMany(mappedBy = "niveles")
    private List<Curso> cursos = new ArrayList<>();    

    @ManyToMany(mappedBy = "nivel")
    private List<Alumno> alumnos = new ArrayList<>();

    @ManyToMany(mappedBy = "nivel")
    private List<Alumno> docentes = new ArrayList<>();

}
