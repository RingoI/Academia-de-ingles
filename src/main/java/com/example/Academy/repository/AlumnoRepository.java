package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Alumno;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

}
