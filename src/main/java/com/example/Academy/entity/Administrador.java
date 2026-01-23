package com.example.Academy.entity;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity 
@Table(name = "Administrador")
@DiscriminatorValue("ADMIN")
public class Administrador extends Persona {

   @ManyToOne
   @JoinColumn(name = "curso_id")
   private Curso curso;
    
}
