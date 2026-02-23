package com.example.Academy.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.EntregaResponseDTO;

import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Entrega;

import com.example.Academy.repository.CursoRepository;
import com.example.Academy.repository.DocenteRepository;
import com.example.Academy.repository.EntregaRepository;

import org.springframework.core.io.Resource;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class EntregaServiceImp implements EntregaService{

    private final EntregaRepository entregaRepository;
    private final CursoRepository cursoRepository;
    private final DocenteRepository docenteRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @Override
    public EntregaResponseDTO subirArchivo(Long cursoId, Long usuarioId, String rol, MultipartFile file, String tipo){
        Curso curso = cursoRepository.findById(cursoId).orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        if(file.isEmpty()){
            throw new RuntimeException("Archivo Vacío");
        }

        String nombreArchivo = guardarArchivo(file);

        Entrega entrega = new Entrega();
        entrega.setCurso(curso);
        entrega.setNombreArchivo(nombreArchivo);
        entrega.setTipo(tipo);
        entrega.setFechaSubida(LocalDate.now());
        entrega.setSubidoPor(rol);
        entrega.setUsuarioId(usuarioId);
        

        Entrega guardada = entregaRepository.save(entrega);

        return mapearDTO(guardada);

    }

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

    private EntregaResponseDTO mapearDTO(Entrega entrega){
        return new EntregaResponseDTO(
            entrega.getId(),
            entrega.getCurso().getNombre(),
            entrega.getNombreArchivo(),
            entrega.getTipo(),
            entrega.getFechaSubida(),
            entrega.getSubidoPor(),
            entrega.getUsuarioId()
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
    public List<EntregaResponseDTO> buscarPorDocente(Long docenteId){
        docenteRepository.findById(docenteId).orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        return entregaRepository.findByUsuarioId(docenteId).stream().map(this::mapearDTO).toList();

    }

}

