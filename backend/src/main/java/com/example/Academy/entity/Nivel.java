package com.example.Academy.entity;



import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
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
 

    @ManyToMany
    @JoinTable(
        name = "curso_nivel",
        joinColumns = @JoinColumn(name = "nivel_id"),
        inverseJoinColumns = @JoinColumn(name = "curso_id")
    )
    private List<Curso> cursos = new ArrayList<>();


    @OneToMany(mappedBy = "nivel")
    private List<Examen> examenes = new ArrayList<>();
    
    @ManyToOne 
    @JoinColumn(name = "docente_id") 
    private Docente docente;

    @ManyToOne 
    @JoinColumn(name = "alumno_id") 
    private Alumno alumno;   
}
