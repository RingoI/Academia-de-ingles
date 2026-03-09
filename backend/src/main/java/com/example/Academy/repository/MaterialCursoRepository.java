package com.example.Academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.MaterialCurso;

@Repository
public interface MaterialCursoRepository extends JpaRepository<MaterialCurso, Long> {

    List<MaterialCurso> findByCursoId(Long cursoId);

    List<MaterialCurso> findByDocenteId(Long docenteId);
}
