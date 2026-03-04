package com.example.Academy.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Academy.entity.Asistencia;

public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

    //Verificar si ya existe asistencia para ese alumno, curso y fecha
    Optional<Asistencia> findByAlumnoIdAndCursoIdAndFecha(
            Long alumnoId,
            Long cursoId,
            LocalDate fecha
    );

    //Obtener asistencia de un curso en una fecha específica
    List<Asistencia> findByCursoIdAndFecha(Long cursoId, LocalDate fecha);

    //Obtener todas las asistencias de un curso
    List<Asistencia> findByCursoId(Long cursoId);

    //Obtener resumen agrupado por fecha
    @Query("""
        SELECT a.fecha,
               SUM(CASE WHEN a.presente = true THEN 1 ELSE 0 END),
               SUM(CASE WHEN a.presente = false THEN 1 ELSE 0 END)
        FROM Asistencia a
        WHERE a.curso.id = :cursoId
        GROUP BY a.fecha
        ORDER BY a.fecha DESC
    """)
    List<Object[]> obtenerResumenPorCurso(@Param("cursoId") Long cursoId);
}