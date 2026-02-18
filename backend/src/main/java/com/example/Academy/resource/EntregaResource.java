package com.example.Academy.resource;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.EntregaResponseDTO;
import com.example.Academy.service.EntregaService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/entregas")
@RequiredArgsConstructor
public class EntregaResource {
    private final EntregaService entregaService;

    @PostMapping(value = "/curso/{cursoId}/alumno/{alumnoId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN' ,'ALUMNO')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> subirTarea(@PathVariable Long cursoId, @PathVariable Long alumnoId, @RequestParam("file") MultipartFile file){
        EntregaResponseDTO entrega = entregaService.subirArchivo(cursoId, alumnoId, "ALUMNO", file, "TAREA");

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDTO<>("Tarea subida correctamente",entrega ));
    }

    @PostMapping(value = "/curso/{cursoId}/docente/{docenteId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> subirMaterial(@PathVariable Long cursoId, @PathVariable Long docenteId, @RequestParam("file") MultipartFile file){
        EntregaResponseDTO entrega = entregaService.subirArchivo(cursoId, docenteId, "DOCENTE", file, "MATERIAL");

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDTO<>("Material subido correctamente", entrega));
    }

    @GetMapping("/curso/{cursoId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE', 'ALUMNO')")
    public ResponseEntity<List<EntregaResponseDTO>> obtenerArchivosPorCurso(@PathVariable Long cursoId){
        return ResponseEntity.ok(entregaService.obtenerArchivosPorCurso(cursoId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE', 'ALUMNO')")
    public ResponseEntity<EntregaResponseDTO> obtenerArchivoPorId(@PathVariable Long id){
        return ResponseEntity.ok(entregaService.obtenerArchivoPorId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> eliminarArchivo(@PathVariable Long id){
        entregaService.eliminarArchivo(id);
        return ResponseEntity.ok(new ApiResponseDTO<>("Archivo leiminado exitosamente", null));
    }
}


