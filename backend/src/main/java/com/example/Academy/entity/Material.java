package com.example.Academy.entity;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "Material")
public class Material {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String tipo;

    @ManyToMany(mappedBy = "materiales")
    private List<Docente> docentes = new ArrayList<>();

    @ManyToMany(mappedBy = "materiales")
    private List<Curso> cursos = new ArrayList<>();
}
