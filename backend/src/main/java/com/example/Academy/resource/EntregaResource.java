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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.core.io.Resource;
import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.CorregirEntregaDTO;
import com.example.Academy.dto.EntregaAlumnoDTO;
import com.example.Academy.dto.EntregaResponseDTO;
import com.example.Academy.service.EntregaService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/entregas")
@RequiredArgsConstructor
public class EntregaResource {
    private final EntregaService entregaService;

    @PostMapping(value = "/tarea/{tareaId}/alumno/{alumnoId}", 
                consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN' ,'ALUMNO', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> 
    subirEntregaTarea(
            @PathVariable Long tareaId,
            @PathVariable Long alumnoId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("nombre") String nombre) {

        EntregaResponseDTO entrega = 
            entregaService.subirEntregaTarea(tareaId, alumnoId, file, nombre);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>("Tarea subida correctamente", entrega));
    }

    @PostMapping(value = "/examen/{examenId}/alumno/{alumnoId}", 
             consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN' ,'ALUMNO', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> 
    subirEntregaExamen(
            @PathVariable Long examenId,
            @PathVariable Long alumnoId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("nombre") String nombre) {

        EntregaResponseDTO entrega = 
            entregaService.subirEntregaExamen(examenId, alumnoId, file, nombre);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>("Examen subido correctamente", entrega));
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
        return ResponseEntity.ok(new ApiResponseDTO<>("Archivo eliminado exitosamente", null));
    }


    //Poner Id del post que devuelve subir archivos
    @GetMapping("/download/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE', 'ALUMNO')")
    public ResponseEntity<Resource> descargarArchivo(@PathVariable Long id) {

        Resource resource = entregaService.descargarArchivo(id);

        String contentType = "application/octet-stream";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PutMapping("/{id}/corregir")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> corregirEntrega(
            @PathVariable Long id,
            @RequestBody CorregirEntregaDTO dto) {

        EntregaResponseDTO entregaCorregida = entregaService.corregirEntrega(id, dto);
        return ResponseEntity.ok(
                new ApiResponseDTO<>("Entrega corregida correctamente", entregaCorregida)
        );
    }

    @GetMapping("/alumno/{alumnoId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ALUMNO', 'DOCENTE')")
    public ResponseEntity<List<EntregaAlumnoDTO>> obtenerHistorialAlumno(
            @PathVariable Long alumnoId
    ) {

        List<EntregaAlumnoDTO> historial = entregaService.obtenerHistorialAlumno(alumnoId);

        return ResponseEntity.ok(historial);
    }

    @PutMapping("/reentrega/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE', 'ALUMNO')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> reentregar(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam("nombre") String nombre
    ) {

        entregaService.reentregar(id, file, nombre);
        return ResponseEntity.ok(new ApiResponseDTO<>("Entrega reentregada correctamente", null));
    }

}
