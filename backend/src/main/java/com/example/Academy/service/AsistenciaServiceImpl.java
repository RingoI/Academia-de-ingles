package com.example.Academy.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.AlumnoAsistenciaDTO;
import com.example.Academy.dto.AsistenciaRequestDTO;
import com.example.Academy.dto.AsistenciaResponseDTO;
import com.example.Academy.dto.RegistroAsistenciaLoteDTO;
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
            throw new IllegalArgumentException("La asistencia ya fue registrada");
        });

        Alumno alumno = alumnoRepository.findById(dto.getAlumnoId())
                .orElseThrow(() -> new IllegalArgumentException("Alumno no encontrado"));

        Curso curso = cursoRepository.findById(dto.getCursoId())
                .orElseThrow(() -> new IllegalArgumentException("Curso no encontrado"));

        Asistencia asistencia = new Asistencia();
        asistencia.setAlumno(alumno);
        asistencia.setCurso(curso);
        asistencia.setFecha(dto.getFecha());
        asistencia.setPresente(dto.isPresente());

        return mapToDTO(asistenciaRepository.save(asistencia));
    }

    @Override
    @Transactional
    public AsistenciaResponseDTO updateAsistencia(Long asistenciaId, UpdateAsistenciaDTO dto) {

        Asistencia asistencia = asistenciaRepository.findById(asistenciaId)
                .orElseThrow(() -> new IllegalArgumentException("Asistencia no encontrada"));

        asistencia.setPresente(dto.getPresente());

        return mapToDTO(asistenciaRepository.save(asistencia));
    }

    @Override
    @Transactional
    public void eliminarAsistencia(Long asistenciaId) {

        if (!asistenciaRepository.existsById(asistenciaId)) {
            throw new IllegalArgumentException("Asistencia no encontrada");
        }

        asistenciaRepository.deleteById(asistenciaId);
    }

    @Override
    public List<AsistenciaResponseDTO> obtenerHistorialPorCurso(Long cursoId) {

        return asistenciaRepository.findByCursoId(cursoId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AsistenciaResponseDTO> obtenerPorFecha(Long cursoId, LocalDate fecha) {

        return asistenciaRepository.findByCursoIdAndFecha(cursoId, fecha)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    //Método privado para evitar repetir código
    private AsistenciaResponseDTO mapToDTO(Asistencia asistencia) {

        return new AsistenciaResponseDTO(
                asistencia.getId(),
                asistencia.getAlumno().getId(),  // alumnoId
                asistencia.getAlumno().getNombre(),
                asistencia.getCurso().getNombre(),
                asistencia.getFecha(),
                asistencia.isPresente()
        );
    }

    @Override
@Transactional
public void guardarProcesoCompleto(List<AsistenciaRequestDTO> dtos) {
    for (AsistenciaRequestDTO dto : dtos) {
        // Buscamos si ya existe para actualizar, o creamos uno nuevo
        Asistencia asistencia = asistenciaRepository
            .findByAlumnoIdAndCursoIdAndFecha(dto.getAlumnoId(), dto.getCursoId(), dto.getFecha())
            .orElse(new Asistencia());

        // Si es nuevo, necesitamos buscar las entidades
        if (asistencia.getId() == null) {
            Alumno alumno = alumnoRepository.findById(dto.getAlumnoId())
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado: " + dto.getAlumnoId()));
            Curso curso = cursoRepository.findById(dto.getCursoId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado: " + dto.getCursoId()));
            
            asistencia.setAlumno(alumno);
            asistencia.setCurso(curso);
            asistencia.setFecha(dto.getFecha());
        }

        // Seteamos el estado actual
        asistencia.setPresente(dto.isPresente());
        asistenciaRepository.save(asistencia);
    }
}

 @Override
@Transactional
public void guardarAsistenciaLote(RegistroAsistenciaLoteDTO dto) {
    // 1. Buscamos el curso una sola vez
    Curso curso = cursoRepository.findById(dto.getCursoId())
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

    // 2. Recorremos la lista de alumnos que viene del Front
    for (AlumnoAsistenciaDTO item : dto.getAlumnos()) {
        
        // Buscamos si ya existe la asistencia para este alumno/curso/fecha
        Asistencia asistencia = asistenciaRepository
            .findByAlumnoIdAndCursoIdAndFecha(item.getAlumnoId(), dto.getCursoId(), dto.getFecha())
            .orElseGet(() -> {
                // Si no existe, creamos una nueva y seteamos sus relaciones fijas
                Asistencia nueva = new Asistencia();
                nueva.setAlumno(alumnoRepository.findById(item.getAlumnoId())
                    .orElseThrow(() -> new RuntimeException("Alumno no encontrado")));
                nueva.setCurso(curso);
                nueva.setFecha(dto.getFecha());
                return nueva;
            });

        // 3. Seteamos (o actualizamos) el estado de presente
        asistencia.setPresente(item.isPresente());

        // 4. Guardamos (Hibernate hace un UPDATE si ya existía o un INSERT si es nueva)
        asistenciaRepository.save(asistencia);
    }
}
}

