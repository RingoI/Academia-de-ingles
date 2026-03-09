package com.example.Academy.resource;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
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
import com.example.Academy.dto.MaterialCursoResponseDTO;
import com.example.Academy.service.MaterialCursoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/materiales")
@RequiredArgsConstructor
public class MaterialCursoResource {

    private final MaterialCursoService materialCursoService;


    @PostMapping(value = "/curso/{cursoId}/docente/{docenteId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<MaterialCursoResponseDTO>> subirMaterial(
            @PathVariable Long cursoId,
            @PathVariable Long docenteId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("nombre") String nombre,
            @RequestParam("tipo") String tipo) {

        MaterialCursoResponseDTO material =
                materialCursoService.subirMaterial(cursoId, docenteId, file, nombre, tipo);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>("Material subido correctamente", material));
    }

    @GetMapping("/curso/{cursoId}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE','ALUMNO')")
    public ResponseEntity<List<MaterialCursoResponseDTO>> obtenerPorCurso(
            @PathVariable Long cursoId) {

        return ResponseEntity.ok(materialCursoService.obtenerPorCurso(cursoId));
    }

    @GetMapping("/descargar/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE','ALUMNO')")
    public ResponseEntity<Resource> descargar(@PathVariable Long id) {

        Resource resource = materialCursoService.descargar(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        materialCursoService.eliminar(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/docente/{docenteId}")
        @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
        public ResponseEntity<List<MaterialCursoResponseDTO>> obtenerPorDocente(
                @PathVariable Long docenteId) {

        return ResponseEntity.ok(materialCursoService.obtenerPorDocente(docenteId));
        }
}