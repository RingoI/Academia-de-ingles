package com.example.Academy.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.MaterialCursoResponseDTO;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.MaterialCurso;
import com.example.Academy.repository.CursoRepository;
import com.example.Academy.repository.DocenteRepository;
import com.example.Academy.repository.MaterialCursoRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MaterialCursoServiceImpl implements MaterialCursoService {

    private static final String UPLOAD_DIR = "uploads/";
    private final MaterialCursoRepository materialRepository;
    private final CursoRepository cursoRepository;
    private final DocenteRepository docenteRepository;

    @Override
    public MaterialCursoResponseDTO subirMaterial(
            Long cursoId,
            Long docenteId,
            MultipartFile file,
            String nombre,
            String tipo
        ) {

        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        Docente docente = docenteRepository.findById(docenteId)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        if (file.isEmpty()) {
            throw new RuntimeException("Archivo vacío");
        }

         if (tipo == null ||
        (!tipo.equalsIgnoreCase("MATERIAL") &&
         !tipo.equalsIgnoreCase("TAREA") &&
         !tipo.equalsIgnoreCase("EXAMEN"))) {
        throw new RuntimeException("Tipo inválido");
    }

        String nombreArchivo = guardarArchivo(file);

        MaterialCurso material = new MaterialCurso();
        material.setCurso(curso);
        material.setDocente(docente);
        material.setNombre(nombre);
        material.setNombreArchivo(nombreArchivo);
        material.setFechaSubida(LocalDate.now());
        material.setTipo(tipo.toUpperCase());

        MaterialCurso guardado = materialRepository.save(material);

        return mapearDTO(guardado);
    }

    @Override
    public List<MaterialCursoResponseDTO> obtenerPorCurso(Long cursoId) {
        return materialRepository.findByCursoId(cursoId)
                .stream()
                .map(this::mapearDTO)
                .toList();
    }
    private String guardarArchivo(MultipartFile file) {

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);

            Files.write(path, file.getBytes());

            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar archivo");
        }
    }
    private Resource cargarArchivo(String nombreArchivo) {
    try {
        Path path = Paths.get(UPLOAD_DIR).resolve(nombreArchivo);
        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("No se puede leer el archivo");
        }

    } catch (MalformedURLException e) {
        throw new RuntimeException("Error al cargar archivo");
    }

    }
    
    @Override
    public Resource descargar(Long id) {

        MaterialCurso material = materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material no encontrado"));

        return cargarArchivo(material.getNombreArchivo());
    }

    @Override
    public void eliminar(Long id) {
        materialRepository.deleteById(id);
    }

    private MaterialCursoResponseDTO mapearDTO(MaterialCurso material) {
        return new MaterialCursoResponseDTO(
                material.getId(),
                material.getCurso().getId(),
                material.getDocente().getId(),
                material.getNombre(),
                material.getNombreArchivo(),
                material.getFechaSubida(),
                material.getTipo(),
                material.getCurso().getNombre()
        );
    }

    @Override
    public List<MaterialCursoResponseDTO> obtenerPorDocente(Long docenteId) {
        return materialRepository.findByDocenteId(docenteId)
                .stream()
                .map(this::mapearDTO)
                .toList();
    }

    

}

