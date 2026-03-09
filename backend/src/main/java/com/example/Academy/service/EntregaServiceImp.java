package com.example.Academy.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.CorregirEntregaDTO;
import com.example.Academy.dto.EntregaAlumnoDTO;
import com.example.Academy.dto.EntregaResponseDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Entrega;
import com.example.Academy.entity.Examen;
import com.example.Academy.entity.Tarea;
import com.example.Academy.repository.AlumnoRepository;
import com.example.Academy.repository.EntregaRepository;
import com.example.Academy.repository.ExamenRepository;
import com.example.Academy.repository.TareaRepository;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.core.io.Resource;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EntregaServiceImp implements EntregaService{

    private final EntregaRepository entregaRepository;
    private final TareaRepository tareaRepository;
    private final AlumnoRepository alumnoRepository;
    private final ExamenRepository examenRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @Override
    public void eliminarArchivo(Long entregaId){
        Entrega entrega = entregaRepository.findById(entregaId).orElseThrow(() -> new RuntimeException("Entrega no encontrada"));

        borrarArchivo(entrega.getNombreArchivo());
        entregaRepository.delete(entrega);
    }


    @Override
    public List<EntregaResponseDTO> obtenerArchivosPorCurso(Long cursoId){
        return entregaRepository.buscarPorCurso(cursoId).stream().map(this::mapearDTO).toList();
    }

    @Override
    public EntregaResponseDTO obtenerArchivoPorId(Long entregaId){
        Entrega entrega = entregaRepository.findById(entregaId).orElseThrow(() -> new RuntimeException("Entrega no encontrada"));

        return mapearDTO(entrega);
    }



    //Funciones aparete del servicio

    private String guardarArchivo(MultipartFile file){
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + fileName);

        try {
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar Archivo");
        }

        return fileName;

    }


    private void borrarArchivo(String archivo){
        if(archivo == null) return;
        Path path = Paths.get(UPLOAD_DIR + archivo);
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo borrar el archivo");
        }
    }

private EntregaResponseDTO mapearDTO(Entrega entrega) {

    return new EntregaResponseDTO(
            entrega.getId(),
            entrega.getCurso().getNombre(),
            entrega.getCurso().getId(),
            entrega.getNombreArchivo(),
            entrega.getNombreCurso(),
            entrega.getFechaSubida(),
            entrega.getAlumno().getId(),
            entrega.getTarea() != null ? entrega.getTarea().getId() : null,
            entrega.getExamen() != null ? entrega.getExamen().getId() : null,
            entrega.getEstado(),
            entrega.getNota(),
            entrega.getComentario(),
            entrega.getAlumno().getNombre(),
            entrega.getTarea() != null ? entrega.getTarea().getNombre() : null,
            entrega.getExamen() != null ? entrega.getExamen().getNombre() : null
        
    );
}

    @Override
    public Resource descargarArchivo(Long entregaId) {
        Entrega entrega = entregaRepository.findById(entregaId)
                .orElseThrow(() -> new RuntimeException("Entrega no encontrada"));

        Path path = Paths.get(UPLOAD_DIR).resolve(entrega.getNombreArchivo());

        try {
            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                throw new RuntimeException("Archivo no encontrado en el servidor");
            }

            return resource;

        } catch (MalformedURLException e) {
            throw new RuntimeException("Error al cargar el archivo");
        }
    }

    @Override
    public EntregaResponseDTO subirEntregaTarea(
            Long tareaId,
            Long alumnoId,
            MultipartFile file,
            String nombre) {

        Tarea tarea = tareaRepository.findById(tareaId)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada"));

        Alumno alumno = alumnoRepository.findById(alumnoId)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        if (file.isEmpty()) {
            throw new RuntimeException("Archivo vacío");
        }

        String nombreArchivo = guardarArchivo(file);

        Entrega entrega = new Entrega();
        entrega.setNombreCurso(tarea.getCurso().getNombre());
        entrega.setNombreArchivo(nombreArchivo);
        entrega.setFechaSubida(LocalDate.now());
        entrega.setCurso(tarea.getCurso());
        entrega.setAlumno(alumno);
        entrega.setTarea(tarea);
        entrega.setEstado("PENDIENTE");

        Entrega guardada = entregaRepository.save(entrega);

        return mapearDTO(guardada);
    }

    @Override
    public EntregaResponseDTO subirEntregaExamen(
            Long examenId,
            Long alumnoId,
            MultipartFile file,
            String nombre) {

        Examen examen = examenRepository.findById(examenId)
                .orElseThrow(() -> new RuntimeException("Examen no encontrado"));

        Alumno alumno = alumnoRepository.findById(alumnoId)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        if (file.isEmpty()) {
            throw new RuntimeException("Archivo vacío");
        }

        String nombreArchivo = guardarArchivo(file);

        Entrega entrega = new Entrega();
        entrega.setNombreCurso(nombre);
        entrega.setNombreArchivo(nombreArchivo);
        entrega.setFechaSubida(LocalDate.now());
        entrega.setCurso(examen.getCurso());
        entrega.setAlumno(alumno);
        entrega.setExamen(examen);

        Entrega guardada = entregaRepository.save(entrega);

        return mapearDTO(guardada);
    }
    @Override
    public EntregaResponseDTO corregirEntrega(Long entregaId, CorregirEntregaDTO dto) {
    Entrega entrega = entregaRepository.findById(entregaId)
        .orElseThrow(() -> new ResourceNotFoundException("Entrega no encontrada"));

    entrega.setNota(dto.getNota());
    entrega.setComentario(dto.getComentario());

    // Cambiar el estado según la nota
    if (dto.getNota() >= 4.0) {
        entrega.setEstado("APROBADO");
    } else {
        entrega.setEstado("DESAPROBADO");
    }

    entregaRepository.save(entrega);

    return mapearDTO(entrega);
}
    
    @Override
    public List<EntregaAlumnoDTO> obtenerHistorialAlumno(Long alumnoId) {

        List<EntregaAlumnoDTO> historial = new ArrayList<>();

        List<Entrega> entregas = entregaRepository.findByAlumnoId(alumnoId);

        for (Entrega e : entregas) {

            EntregaAlumnoDTO dto = new EntregaAlumnoDTO();

            dto.setId(e.getId());
            dto.setArchivoNombre(e.getNombreArchivo());
            dto.setFechaEntrega(e.getFechaSubida());
            dto.setNota(e.getNota());
            dto.setComentario(e.getComentario());

            if (e.getTarea() != null) {

                dto.setTipo("TAREA");
                dto.setNombreActividad(e.getTarea().getNombre());

            } else if (e.getExamen() != null) {

                dto.setTipo("EXAMEN");
                dto.setNombreActividad(e.getExamen().getNombre());

            }

            historial.add(dto);
        }

        return historial;
    }
    @Override
    public void reentregar(Long entregaId, MultipartFile file, String nombre) {

        Entrega entrega = entregaRepository.findById(entregaId)
                .orElseThrow(() -> new RuntimeException("Entrega no encontrada"));

        if(entrega.getNota() == null || entrega.getNota() > 4.0){
            throw new RuntimeException("No se puede reentregar una entrega aprobada o sin corregir");
        }

        // guardar nuevo archivo
      String nombreArchivo = guardarArchivo(file);


        entrega.setNombreArchivo(nombreArchivo);
        entrega.setFechaSubida(LocalDate.now());
        entrega.setNota(null);
        entrega.setComentario(null);
        entrega.setEstado("Reentregado");
        entregaRepository.save(entrega);
    }



    }

