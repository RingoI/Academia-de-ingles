package com.example.Academy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateTareaRequestDTO;
import com.example.Academy.dto.TareaResponseDTO;
import com.example.Academy.dto.UpdateTareaRequestDTO;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Tarea;
import com.example.Academy.repository.CursoRepository;
import com.example.Academy.repository.DocenteRepository;
import com.example.Academy.repository.TareaRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TareaServiceImp implements TareaService {

    private final TareaRepository tareaRepository;
    private final CursoRepository cursoRepository;
    private final DocenteRepository docenteRepository;

    @Override
    public TareaResponseDTO crearTarea(CreateTareaRequestDTO dto) {

        Curso curso = cursoRepository.findById(dto.getCursoId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        Docente docente = docenteRepository.findById(dto.getDocenteId())
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        Tarea tarea = new Tarea();
        tarea.setNombre(dto.getNombre());
        tarea.setFechaEntrega(dto.getFechaEntrega());
        tarea.setCurso(curso);
        tarea.setDocente(docente);

        Tarea guardada = tareaRepository.save(tarea);

        return mapToDTO(guardada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TareaResponseDTO> obtenerTareas() {
        return tareaRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<TareaResponseDTO> obtenerTareasPorCurso(Long cursoId) {

        return tareaRepository.findByCursoId(cursoId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public void eliminarTarea(Long id) {

        if (!tareaRepository.existsById(id)) {
            throw new RuntimeException("Tarea no encontrada");
        }

        tareaRepository.deleteById(id);
    }

        @Override
        public TareaResponseDTO actualizarTarea(Long id, UpdateTareaRequestDTO dto) {

            Tarea tarea = tareaRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

            if (dto.getNombre() != null) {
                tarea.setNombre(dto.getNombre());
            }

            if (dto.getFechaEntrega() != null) {
                tarea.setFechaEntrega(dto.getFechaEntrega());
            }

            if (dto.getCursoId() != null) {
                Curso curso = cursoRepository.findById(dto.getCursoId())
                        .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
                tarea.setCurso(curso);
            }

            if (dto.getDocenteId() != null) {
                Docente docente = docenteRepository.findById(dto.getDocenteId())
                        .orElseThrow(() -> new RuntimeException("Docente no encontrado"));
                tarea.setDocente(docente);
            }

            return mapToDTO(tareaRepository.save(tarea));
        }

    private TareaResponseDTO mapToDTO(Tarea tarea) {

        return new TareaResponseDTO(
                tarea.getId(),
                tarea.getNombre(),
                tarea.getFechaEntrega(),
                tarea.getCurso().getId(),
                tarea.getDocente().getId()
        );
    }
}