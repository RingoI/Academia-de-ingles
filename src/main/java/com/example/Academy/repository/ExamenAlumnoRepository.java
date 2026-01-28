package com.example.Academy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Examen;
import com.example.Academy.entity.ExamenAlumno;


@Repository
public interface ExamenAlumnoRepository extends JpaRepository<ExamenAlumno, Long> {

    Optional<ExamenAlumno> findByExamenIdAndAlumnoId(Long examenId, Long alumnoId);

    @SuppressWarnings("unchecked")
    ExamenAlumno save(ExamenAlumno entrega);

    boolean existsByExamenAndAlumno(Examen examen, Alumno alumno);

    List<ExamenAlumno> findByExamenId(Long examenId);

    List<ExamenAlumno> findByAlumnoId(Long alumnoId);




        


    
}
