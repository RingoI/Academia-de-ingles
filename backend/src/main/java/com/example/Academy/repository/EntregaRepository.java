package com.example.Academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Academy.entity.Entrega;

public interface EntregaRepository extends JpaRepository<Entrega, Long> {
	@Query("SELECT e FROM Entrega e WHERE e.curso.id = :cursoId")
	List<Entrega> buscarPorCurso(@Param("cursoId") Long cursoId);
}