package com.example.Academy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.ExamenAlumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    Optional<ExamenAlumno> findByUsername(String username);
    

    @Query("SELECT a FROM Alumno a LEFT JOIN FETCH a.nivel WHERE a.activo = true")
    List<Alumno> findAllWithNiveles();



}
