package com.example.Academy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.ExamenAlumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

    Optional<ExamenAlumno> findByUsername(String username);

}
