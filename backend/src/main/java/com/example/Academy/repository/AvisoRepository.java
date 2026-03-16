package com.example.Academy.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Aviso;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Persona;

public interface AvisoRepository extends JpaRepository<Aviso, Long> {
	List<Aviso> findByCursoId(Long cursoId);
	List<Aviso> findByInstitucionalTrue();

	List<Aviso> findByCursoIn(Collection<Curso> cursos);
	
	List<Aviso> findByCreador(Persona creador);

	List<Aviso> findAllByOrderByFechaCreacionDesc();
}
