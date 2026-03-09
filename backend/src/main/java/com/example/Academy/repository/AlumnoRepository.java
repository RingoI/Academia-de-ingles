package com.example.Academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Academy.entity.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    
    @Query("SELECT a FROM Alumno a LEFT JOIN FETCH a.nivel WHERE a.activo = true")
    List<Alumno> findAllWithNiveles();

    List<Alumno> findByCursosIsEmpty();

}
