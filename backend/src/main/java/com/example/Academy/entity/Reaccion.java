package com.example.Academy.entity;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "reaccion")
public class Reaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TipoReaccion tipo;

    private LocalDateTime fecha;

    @ManyToOne
    @JoinColumn(name = "mensaje_id")
    @JsonIgnore
    private Mensaje mensaje;

    @ManyToOne
    @JoinColumn(name = "persona_id")
    private Persona persona;
}