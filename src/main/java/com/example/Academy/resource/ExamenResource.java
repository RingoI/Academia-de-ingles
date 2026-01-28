package com.example.Academy.resource;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.CreateExamenRequestDTO;
import com.example.Academy.dto.ExamenResponseDTO;
import com.example.Academy.dto.UpdateExamenRequestDTO;
import com.example.Academy.service.ExamenService;


@RestController
@RequestMapping("/examenes")
public class ExamenResource {

    private final ExamenService examenService;

    public ExamenResource(ExamenService examenService) {
        this.examenService = examenService;
    }

    @PostMapping("create")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<ExamenResponseDTO>> crearExamen(
            @RequestBody CreateExamenRequestDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>("Examen creado exitosamente",
                        examenService.crearExamen(dto)));
    }

    @GetMapping
    public ResponseEntity<List<ExamenResponseDTO>> obtenerExamenes() {
        return ResponseEntity.ok(examenService.obtenerExamenes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamenResponseDTO> obtenerExamenPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(examenService.obtenerExamenPorId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> eliminarExamen(@PathVariable Long id) {
        examenService.eliminarExamen(id);
        return ResponseEntity.ok(
            new ApiResponseDTO<Void>("Examen eliminado exitosamente", null)
        );

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<ExamenResponseDTO>> actualizarExamen(
        @PathVariable Long id,
        @RequestBody UpdateExamenRequestDTO dto) {

    return ResponseEntity.ok(
        new ApiResponseDTO<>("Examen actualizado exitosamente",
            examenService.actualizarExamen(id, dto))
    );
    }
}
