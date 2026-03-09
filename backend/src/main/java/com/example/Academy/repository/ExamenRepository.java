package com.example.Academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.Examen;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, Long> {

    List<Examen> findByCursoId(Long cursoId);

}
