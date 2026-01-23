package com.example.Academy.entity;

import java.util.ArrayList;
import java.util.List;

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
    
    
    @OneToMany(mappedBy = "docente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Nivel> niveles = new ArrayList<>();
    
    @OneToMany(mappedBy = "docente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Examen> examenes = new ArrayList<>();
    
    @ManyToMany
    @JoinTable(
    name = "docente_material",
    joinColumns = @JoinColumn(name = "docente_id"),
    inverseJoinColumns = @JoinColumn(name = "material_id")
    )   
    private List<Material> materiales = new ArrayList<>();

    @ManyToMany
    @JoinTable(
    name = "curso_docente",
    joinColumns = @JoinColumn(name = "docente_id"),
    inverseJoinColumns = @JoinColumn(name = "curso_id")
    )   
    private List<Curso> cursos = new ArrayList<>();


    @ManyToMany
    @JoinTable(
    name = "docente_asistencia",
    joinColumns = @JoinColumn(name = "docente_id"),
    inverseJoinColumns = @JoinColumn(name = "asistencia_id")
    )   
    private List<Asistencia> asistencias = new ArrayList<>();

    
}