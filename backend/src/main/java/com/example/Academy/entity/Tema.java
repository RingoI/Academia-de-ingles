package com.example.Academy.entity;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "tema")
public class Tema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private LocalDateTime fechaCreacion;
    private boolean cerrado = false;
    private boolean eliminado = false;
    private boolean fijado = false;
    private boolean editado = false;

    // CURSO AL QUE PERTENECE EL TEMA
    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;

    // QUIEN CREO EL TEMA
    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Persona autor;

    // MENSAJES DEL TEMA
    @OneToMany(mappedBy = "tema", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("fecha ASC")
    private List<Mensaje> mensajes = new ArrayList<>();
}