package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateExamenRequestDTO;
import com.example.Academy.dto.ExamenResponseDTO;
import com.example.Academy.dto.UpdateExamenRequestDTO;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Examen;
import com.example.Academy.repository.CursoRepository;
import com.example.Academy.repository.DocenteRepository;
import com.example.Academy.repository.ExamenRepository;
import org.springframework.transaction.annotation.Transactional;



@Service
@Transactional
public class ExamenServiceImp implements ExamenService {

    private final ExamenRepository examenRepository;
    private final DocenteRepository docenteRepository;
    private final CursoRepository cursoRepository;

    public ExamenServiceImp(
            ExamenRepository examenRepository,
            DocenteRepository docenteRepository,
            CursoRepository cursoRepository) {

        this.examenRepository = examenRepository;
        this.docenteRepository = docenteRepository;
        this.cursoRepository = cursoRepository;
    }

    @Override
    public ExamenResponseDTO crearExamen(CreateExamenRequestDTO dto) {

        Curso curso = cursoRepository.findById(dto.getCursoId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        Docente docente = docenteRepository.findById(dto.getDocenteId())
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        Examen examen = new Examen();   

        examen.setNombre(dto.getNombre());
        examen.setFecha(dto.getFecha());
        examen.setTipo(dto.getTipo());
        examen.setPuntajeMaximo(dto.getPuntajeMaximo());
        examen.setCurso(curso);        
        examen.setDocente(docente);

        Examen guardado = examenRepository.save(examen);

        return mapToResponseDTO(guardado);
    }


    @Override
    @Transactional(readOnly = true)
    public List<ExamenResponseDTO> obtenerExamenes() {

        return examenRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ExamenResponseDTO obtenerExamenPorId(Long id) {

        Examen examen = examenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        return mapToResponseDTO(examen);
    }

    @Override
    public void eliminarExamen(Long id) {

        if (!examenRepository.existsById(id)) {
            throw new RuntimeException("Examen no encontrado");
        }

        examenRepository.deleteById(id);
    }

    @Override
    public ExamenResponseDTO actualizarExamen(Long id, UpdateExamenRequestDTO dto) {

        Examen examen = examenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        if (dto.getNombre() != null) {
            examen.setNombre(dto.getNombre());
        }

        if (dto.getFecha() != null) {
            examen.setFecha(dto.getFecha());
        }

        if (dto.getTipo() != null) {
            examen.setTipo(dto.getTipo());
        }

        if (dto.getPuntajeMaximo() != null) {
            examen.setPuntajeMaximo(dto.getPuntajeMaximo());
        }

        if (dto.getCursoId() != null) {
            Curso curso = cursoRepository.findById(dto.getCursoId())
                    .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
            examen.setCurso(curso);
        }

        if (dto.getDocenteId() != null) {
            Docente docente = docenteRepository.findById(dto.getDocenteId())
                    .orElseThrow(() -> new RuntimeException("Docente no encontrado"));
            examen.setDocente(docente);
        }

        return mapToResponseDTO(examenRepository.save(examen));
    }

    @Override
    public List<ExamenResponseDTO> obtenerExamenesPorCurso(Long cursoId) {

        return examenRepository.findByCursoId(cursoId)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    
    private ExamenResponseDTO mapToResponseDTO(Examen examen) {

        return new ExamenResponseDTO(
                examen.getId(),
                examen.getNombre(),
                examen.getFecha(),
                examen.getTipo(),
                examen.getPuntajeMaximo(),
                examen.getDocente().getId(),
                examen.getCurso().getId()
        );
    }

    
}
