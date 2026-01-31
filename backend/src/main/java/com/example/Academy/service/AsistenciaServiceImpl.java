package com.example.Academy.service;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.AsistenciaRequestDTO;
import com.example.Academy.dto.AsistenciaResponseDTO;
import com.example.Academy.dto.UpdateAsistenciaDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Asistencia;
import com.example.Academy.entity.Curso;
import com.example.Academy.repository.AlumnoRepository;
import com.example.Academy.repository.AsistenciaRepository;
import com.example.Academy.repository.CursoRepository;

import jakarta.transaction.Transactional;

@Service
public class AsistenciaServiceImpl implements AsistenciaService {

    private final AsistenciaRepository asistenciaRepository;
    private final AlumnoRepository alumnoRepository;
    private final CursoRepository cursoRepository;
    

    public AsistenciaServiceImpl(
            AsistenciaRepository asistenciaRepository,
            AlumnoRepository alumnoRepository,
            CursoRepository cursoRepository) {

        this.asistenciaRepository = asistenciaRepository;
        this.alumnoRepository = alumnoRepository;
        this.cursoRepository = cursoRepository;
    }

    @Override
    @Transactional
    public AsistenciaResponseDTO tomarAsistencia(AsistenciaRequestDTO dto) {

        asistenciaRepository.findByAlumnoIdAndCursoIdAndFecha(
                dto.getAlumnoId(),
                dto.getCursoId(),
                dto.getFecha()
        ).ifPresent(a -> {
            throw new RuntimeException("La asistencia ya fue registrada");
        });

        Alumno alumno = alumnoRepository.findById(dto.getAlumnoId())
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        Curso curso = cursoRepository.findById(dto.getCursoId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        Asistencia asistencia = new Asistencia();
        asistencia.setAlumno(alumno);
        asistencia.setCurso(curso);
        asistencia.setFecha(dto.getFecha());
        asistencia.setPresente(dto.isPresente());

        Asistencia guardada = asistenciaRepository.save(asistencia);

        return new AsistenciaResponseDTO(
                guardada.getId(),
                alumno.getNombre(),
                curso.getNombre(),
                guardada.getFecha(),
                guardada.isPresente()
        );
    }

    

        @Override
        @Transactional
        public AsistenciaResponseDTO updateAsistencia(Long asistenciaId, UpdateAsistenciaDTO dto) {

        Asistencia asistencia = asistenciaRepository.findById(asistenciaId)
                .orElseThrow(() -> new RuntimeException("Asistencia no encontrada"));

        asistencia.setPresente(dto.getPresente());

        Asistencia actualizada = asistenciaRepository.save(asistencia);

        return new AsistenciaResponseDTO(
                actualizada.getId(),
                actualizada.getAlumno().getNombre(),
                actualizada.getCurso().getNombre(),
                actualizada.getFecha(),
                actualizada.isPresente()
        );
        }


    @Override
    @Transactional
    public void eliminarAsistencia(Long asistenciaId) {

        if (!asistenciaRepository.existsById(asistenciaId)) {
                throw new RuntimeException("Asistencia no encontrada");
        }

        asistenciaRepository.deleteById(asistenciaId);
        }


}

