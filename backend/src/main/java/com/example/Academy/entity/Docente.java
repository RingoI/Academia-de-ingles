package com.example.Academy.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
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
@Table(name = "Docente")
@DiscriminatorValue("Docente")
public class Docente  extends Persona {

    private String titulo;
    private Boolean estado;
    private String cuit;
    
    
   @ManyToMany
    @JoinTable(
        name = "alumno_nivel",
        joinColumns = @JoinColumn(name = "alumno_id"),
        inverseJoinColumns = @JoinColumn(name = "nivel_id")
    )
    private List<Nivel> nivel = new ArrayList<>();
    
    @OneToMany(mappedBy = "docente", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Examen> examenes = new ArrayList<>();
    
    @ManyToMany
    @JsonIgnore
    @JoinTable(
    name = "docente_material",
    joinColumns = @JoinColumn(name = "docente_id"),
    inverseJoinColumns = @JoinColumn(name = "material_id")
    )   
    private List<Material> materiales = new ArrayList<>();

    @ManyToMany
    @JsonIgnore
    @JoinTable(
    name = "curso_docente",
    joinColumns = @JoinColumn(name = "docente_id"),
    inverseJoinColumns = @JoinColumn(name = "curso_id")
    )   
    private List<Curso> cursos = new ArrayList<>();


    

    
}