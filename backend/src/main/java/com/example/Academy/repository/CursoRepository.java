package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Curso;
import java.util.List;


public interface CursoRepository extends JpaRepository<Curso, Long> {
	List<Curso> findByDocentes_Id(Long docenteId);
}
