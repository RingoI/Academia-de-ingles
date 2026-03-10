package com.example.Academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Tema;

public interface TemaRepository extends JpaRepository<Tema, Long> {

    List<Tema> findByCursoIdOrderByFechaCreacionDesc(Long cursoId);
    List<Tema> findByCursoIdAndEliminadoFalseOrderByFijadoDescFechaCreacionDesc(Long cursoId);
}
