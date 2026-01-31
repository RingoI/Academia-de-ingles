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

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.CorregirEntregaDTO;
import com.example.Academy.dto.EntregaResponseDTO;
import com.example.Academy.service.EntregaService;

@RestController
@RequestMapping("/entregas")
public class EntregaResource {

    private final EntregaService entregaService;

    public EntregaResource(EntregaService entregaService) {
        this.entregaService = entregaService;
    }


    @PostMapping(
        value = "/examen/{examenId}/alumno/{alumnoId}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ALUMNO')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> realizarEntrega(
            @PathVariable Long examenId,
            @PathVariable Long alumnoId,
            @RequestParam("file") MultipartFile file) {

        EntregaResponseDTO entrega =
                entregaService.realizarEntrega(examenId, alumnoId, file);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>("Entrega realizada correctamente", entrega));
    }


    @GetMapping("/examen/{examenId}")
    public ResponseEntity<List<EntregaResponseDTO>> obtenerEntregasPorExamen(
            @PathVariable Long examenId) {

        return ResponseEntity.ok(
            entregaService.obtenerEntregasPorExamen(examenId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntregaResponseDTO> obtenerEntregaPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(entregaService.obtenerEntregaPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<EntregaResponseDTO>> obtenerEntregas() {
        return ResponseEntity.ok(entregaService.obtenerEntregas());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<EntregaResponseDTO>> corregirEntregas(
        @PathVariable Long id,
        @RequestBody CorregirEntregaDTO dto) {

    return ResponseEntity.ok(
        new ApiResponseDTO<>("Entrega corregida exitosamente",
            entregaService.corregirEntrega(id, dto))
    );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> eliminarEntrega(@PathVariable Long id) {
        entregaService.eliminarEntrega(id);
        return ResponseEntity.ok(
            new ApiResponseDTO<Void>("Entrega eliminada exitosamente", null)
        );

    }


    @GetMapping("/alumno/{alumnoId}")
    @PreAuthorize("hasAnyRole('DOCENTE', 'ADMIN')")
    public ResponseEntity<ApiResponseDTO<List<EntregaResponseDTO>>> 
            obtenerHistorialPorAlumno(@PathVariable Long alumnoId) {

        return ResponseEntity.ok(
            new ApiResponseDTO<>(
                "Historial de entregas del alumno",
                entregaService.obtenerEntregasPorAlumno(alumnoId)
            )
        );
    }

}
