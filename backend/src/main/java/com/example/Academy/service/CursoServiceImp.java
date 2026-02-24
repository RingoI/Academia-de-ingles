package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateCursoRequestDTO;
import com.example.Academy.dto.CursoResponseDTO;
import com.example.Academy.dto.PersonaDTO;
import com.example.Academy.dto.UpdateCursoRequestDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Nivel;
import com.example.Academy.repository.AlumnoRepository;
import com.example.Academy.repository.CursoRepository;
import com.example.Academy.repository.DocenteRepository;
import com.example.Academy.repository.NivelRepository;

import jakarta.transaction.Transactional;

@Service
public class CursoServiceImp implements CursoService {

private final CursoRepository cursoRepository;
private final NivelRepository nivelRepository;
private final DocenteRepository docenteRepository;
private final AlumnoRepository alumnoRepository;

public CursoServiceImp(CursoRepository cursoRepository, NivelRepository nivelRepository,
        DocenteRepository docenteRepository, AlumnoRepository alumnoRepository) {
    this.cursoRepository = cursoRepository;
    this.nivelRepository = nivelRepository;
    this.docenteRepository = docenteRepository;
    this.alumnoRepository = alumnoRepository;
}

@Override
public CursoResponseDTO crearCurso(CreateCursoRequestDTO dto) {

    Curso curso = new Curso();
    curso.setNombre(dto.getNombre());
    curso.setCupo(dto.getCupo());
    curso.setFechaInicio(dto.getFechaInicio());
    curso.setFechaFin(dto.getFechaFin());

    List<Docente> docentes = docenteRepository.findAllById(dto.getDocentesIds());
    List<Nivel> niveles = nivelRepository.findAllById(dto.getNivelesIds());
    List<Alumno> alumnos = alumnoRepository.findAllById(dto.getAlumnosIds());

    for (Nivel nivel : niveles) {
        curso.getNiveles().add(nivel);
        nivel.getCursos().add(curso);
    }

    cursoRepository.save(curso);

    for (Alumno a : alumnos) {
        a.getCursos().add(curso);
        curso.getAlumnos().add(a);
    }

    curso.setAlumnos(alumnos);

    for (Docente d : docentes) {
        d.getCursos().add(curso);
        curso.getDocentes().add(d);
    }

    curso.setDocentes(docentes);

    Curso guardado = cursoRepository.save(curso);

    return mapToResponse(guardado);
}

private CursoResponseDTO mapToResponse(Curso curso) {

    List<String> nombresNiveles = curso.getNiveles()
            .stream()
            .map(Nivel::getNombre)
            .toList();

    List<PersonaDTO> docentes = curso.getDocentes()
            .stream()
            .map(d -> new PersonaDTO(d.getId(), d.getNombre()))
            .toList();

    List<PersonaDTO> alumnos = curso.getAlumnos()
            .stream()
            .map(a -> new PersonaDTO(a.getId(), a.getNombre()))
            .toList();

    return new CursoResponseDTO(
            curso.getId(),
            curso.getNombre(),
            nombresNiveles,
            docentes,
            alumnos,
            curso.getCupo(),
            curso.getFechaInicio(),
            curso.getFechaFin()
    );
}

@Override
public List<CursoResponseDTO> obtenerCursos() {
    return cursoRepository.findAll()
            .stream()
            .map(c -> new CursoResponseDTO(
                    c.getId(),
                    c.getNombre(),
                    c.getNiveles().stream().map(n -> n.getNombre()).toList(),
                    c.getDocentes().stream().map(d -> new PersonaDTO(d.getId(), d.getNombre())).toList(),
                    c.getAlumnos().stream().map(a -> new PersonaDTO(a.getId(), a.getNombre())).toList(),
                    c.getCupo(),
                    c.getFechaInicio(),
                    c.getFechaFin()
            ))
            .toList();
}

@Override
public CursoResponseDTO obtenerCursoPorId(Long id) {
    Curso curso = cursoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    return mapToResponse(curso);

}

@Override
@Transactional
public void eliminarCurso(Long id) {

    Curso curso = cursoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

    for (Docente d : curso.getDocentes()) {
        d.getCursos().remove(curso);
    }
    curso.getDocentes().clear();

    for (Alumno a : curso.getAlumnos()) {
        a.getCursos().remove(curso);
    }
    curso.getAlumnos().clear();

    for (Nivel n : curso.getNiveles()) {
        n.getCursos().remove(curso);
    }

    curso.getNiveles().clear();

    cursoRepository.delete(curso);
}

@Override
public CursoResponseDTO actualizarCurso(Long id, UpdateCursoRequestDTO dto) {

    Curso curso = cursoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

    curso.setNombre(dto.getNombre());
    curso.setCupo(dto.getCupo());
    curso.setFechaInicio(dto.getFechaInicio());
    curso.setFechaFin(dto.getFechaFin());

    List<Nivel> niveles = nivelRepository.findAllById(dto.getNivelesIds());
    List<Docente> docentes = docenteRepository.findAllById(dto.getDocentesIds());
    List<Alumno> alumnos = alumnoRepository.findAllById(dto.getAlumnosIds());

    curso.setNiveles(niveles);

    curso.getDocentes().forEach(d -> d.getCursos().remove(curso));
    curso.getDocentes().clear();

    for (Alumno a : alumnos) {
        a.getCursos().add(curso);
        curso.getAlumnos().add(a);
    }
    curso.getAlumnos().clear();

    for (Docente d : docentes) {
        d.getCursos().add(curso);
        curso.getDocentes().add(d);
    }

    Curso actualizado = cursoRepository.save(curso);

    return mapToResponse(actualizado);
}


// NUEVOS METODOS (asignar y desvincular alumnos y docentes de cursos)

@Override
@Transactional
public void asignarAlumno(Long cursoId, Long alumnoId) {

    Curso curso = cursoRepository.findById(cursoId)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

    Alumno alumno = alumnoRepository.findById(alumnoId)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

    curso.getAlumnos().add(alumno);
    alumno.getCursos().add(curso);

    cursoRepository.save(curso);
}

@Override
@Transactional
public void asignarDocente(Long cursoId, Long docenteId) {
    Curso curso = cursoRepository.findById(cursoId)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

    Docente docente = docenteRepository.findById(docenteId)
            .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

    curso.getDocentes().add(docente);
    docente.getCursos().add(curso);

    cursoRepository.save(curso);
}

@Override
@Transactional
public void desvincularAlumno(Long cursoId, Long alumnoId) {
    Curso curso = cursoRepository.findById(cursoId)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    Alumno alumno = alumnoRepository.findById(alumnoId)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

    curso.getAlumnos().remove(alumno);
    alumno.getCursos().remove(curso);

    cursoRepository.save(curso);
}

@Override
@Transactional
public void desvincularDocente(Long cursoId, Long docenteId) {
    Curso curso = cursoRepository.findById(cursoId)
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    Docente docente = docenteRepository.findById(docenteId)
            .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

    curso.getDocentes().remove(docente);
    docente.getCursos().remove(curso);

    cursoRepository.save(curso);
}
}

