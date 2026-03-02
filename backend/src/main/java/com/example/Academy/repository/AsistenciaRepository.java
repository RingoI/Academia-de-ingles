package com.example.Academy.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Asistencia;

public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

    Optional<Asistencia> findByAlumnoIdAndCursoIdAndFecha(
            Long alumnoId,
            Long cursoId,
            LocalDate fecha
    );

    List<Asistencia> findByCursoIdAndFecha(Long cursoId, LocalDate fecha);

}

