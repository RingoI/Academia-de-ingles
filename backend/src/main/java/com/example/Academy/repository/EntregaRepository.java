package com.example.Academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.Entrega;

@Repository
public interface EntregaRepository extends JpaRepository<Entrega, Long> {
	@Query("SELECT e FROM Entrega e WHERE e.curso.id = :cursoId")
	List<Entrega> buscarPorCurso(@Param("cursoId") Long cursoId);

	List<Entrega> findByUsuarioId(Long usuarioId); //El usuarioid sería el id del docente
}