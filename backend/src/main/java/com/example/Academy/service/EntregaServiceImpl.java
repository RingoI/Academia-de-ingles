package com.example.Academy.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.CorregirEntregaDTO;
import com.example.Academy.dto.EntregaResponseDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Examen;
import com.example.Academy.entity.ExamenAlumno;
import com.example.Academy.repository.AlumnoRepository;
import com.example.Academy.repository.ExamenAlumnoRepository;
import com.example.Academy.repository.ExamenRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EntregaServiceImpl implements EntregaService {

    private final ExamenAlumnoRepository examenAlumnoRepository;
    private final ExamenRepository examenRepository;
    private final AlumnoRepository alumnoRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @Override
    public EntregaResponseDTO realizarEntrega(Long examenId, Long alumnoId, MultipartFile file) {

        Examen examen = obtenerExamen(examenId);
        Alumno alumno = obtenerAlumno(alumnoId);

        validarEntregaUnica(examen, alumno);

        String nombreArchivo = guardarArchivo(file);

        ExamenAlumno entrega = new ExamenAlumno();
        entrega.setExamen(examen);
        entrega.setAlumno(alumno);
        entrega.setArchivoEntrega(nombreArchivo);
        entrega.setNota(null);
        entrega.setAprobado(false);

        ExamenAlumno guardada = examenAlumnoRepository.save(entrega);

        return mapearDTO(guardada);
    }

    @Override
    public void eliminarEntrega(Long entregaId) {

        ExamenAlumno entrega = (ExamenAlumno) examenAlumnoRepository.findById(entregaId)
            .orElseThrow(() -> new RuntimeException("Entrega no encontrada"));

        borrarArchivo(entrega.getArchivoEntrega());

        examenAlumnoRepository.delete((ExamenAlumno) entrega);
    }

    @Override
    public EntregaResponseDTO corregirEntrega(Long entregaId, CorregirEntregaDTO dto) {

        ExamenAlumno entrega = (ExamenAlumno) examenAlumnoRepository.findById(entregaId)
            .orElseThrow(() -> new RuntimeException("Entrega no encontrada"));

        entrega.setNota(dto.getNota());
        entrega.setAprobado(dto.getAprobado());

        ExamenAlumno corregida = examenAlumnoRepository.save(entrega);

        return mapearDTO(corregida);
    }

    @Override
    public List<EntregaResponseDTO> obtenerEntregasPorExamen(Long examenId) {

        return examenAlumnoRepository.findByExamenId(examenId)
            .stream()
            .map(this::mapearDTO)
            .toList();
    }

    @Override
    public EntregaResponseDTO obtenerEntregaPorId(Long entregaId) {

        ExamenAlumno entrega = examenAlumnoRepository.findById(entregaId)
            .orElseThrow(() -> new RuntimeException("Entrega no encontrada"));

        return mapearDTO(entrega);
    }

    @Override
    public List<EntregaResponseDTO> obtenerEntregas() {
        return examenAlumnoRepository.findAll()
            .stream()
            .map(this::mapearDTO)
            .toList();
    }

    @Override
    public List<EntregaResponseDTO> obtenerEntregasPorAlumno(Long alumnoId) {

        Alumno alumno = alumnoRepository.findById(alumnoId)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        List<ExamenAlumno> entregas = examenAlumnoRepository.findByAlumnoId(alumnoId);
        System.out.println("Entregas encontradas: " + entregas.size());



        return entregas.stream()
            .map(e -> new EntregaResponseDTO(
                e.getId(),
                alumno.getNombre(),
                e.getExamen().getNombre(),
                e.getArchivoEntrega(),
                e.getNota(),
                e.getAprobado()
            ))
            .toList();
    }

    


    
    private Examen obtenerExamen(Long id) {
        return examenRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Examen no encontrado"));
    }

    private Alumno obtenerAlumno(Long id) {
        return alumnoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
    }

    private void validarEntregaUnica(Examen examen, Alumno alumno) {
        if (examenAlumnoRepository.existsByExamenAndAlumno(examen, alumno)) {
            throw new RuntimeException("El examen ya fue entregado");
        }
    }

    private String guardarArchivo(MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("Archivo vacío");
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + fileName);

        try {
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar archivo");
        }

        return fileName;
    }

    private void borrarArchivo(String archivo) {
        if (archivo == null) return;

        Path path = Paths.get(UPLOAD_DIR + archivo);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo borrar el archivo");
        }
    }

    private EntregaResponseDTO mapearDTO(ExamenAlumno entrega) {
        return new EntregaResponseDTO(
            entrega.getId(),
            entrega.getAlumno().getNombre(),
            entrega.getExamen().getNombre(),
            entrega.getArchivoEntrega(),
            entrega.getNota(),
            entrega.getAprobado()
        );
    }

}
