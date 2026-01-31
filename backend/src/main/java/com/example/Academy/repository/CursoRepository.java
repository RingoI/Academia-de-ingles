package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {

}
