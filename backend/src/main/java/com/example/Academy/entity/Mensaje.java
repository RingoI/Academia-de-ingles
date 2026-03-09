package com.example.Academy.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "mensaje")
public class Mensaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    private LocalDateTime fecha;

    // TEMA AL QUE PERTENECE EL MENSAJE
    @ManyToOne
    @JoinColumn(name = "tema_id")
    @JsonIgnore
    private Tema tema;

    // AUTOR DEL MENSAJE
    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Persona autor;

    // INDICA SI EL MENSAJE HA SIDO EDITADO
    @Column(name = "editado")
    private Boolean editado = false;

    // REACCIONES AL MENSAJE
    @OneToMany(mappedBy = "mensaje", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reaccion> reacciones = new ArrayList<>();
}
