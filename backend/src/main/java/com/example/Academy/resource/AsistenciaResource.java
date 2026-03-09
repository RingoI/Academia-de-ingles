package com.example.Academy.resource;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.AsistenciaRequestDTO;
import com.example.Academy.dto.AsistenciaResponseDTO;
import com.example.Academy.dto.RegistroAsistenciaLoteDTO;
import com.example.Academy.dto.UpdateAsistenciaDTO;
import com.example.Academy.service.AsistenciaService;

@RestController
@RequestMapping("/asistencias")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class AsistenciaResource {

    private final AsistenciaService asistenciaService;

    public AsistenciaResource(AsistenciaService asistenciaService) {
        this.asistenciaService = asistenciaService;
    }

    // =========================
    // REGISTRAR ASISTENCIA
    // =========================
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<AsistenciaResponseDTO>> tomarAsistencia(
            @Valid @RequestBody AsistenciaRequestDTO dto) {

        AsistenciaResponseDTO response = asistenciaService.tomarAsistencia(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>(
                        "Asistencia registrada correctamente",
                        response
                ));
    }

    // =========================
    // MODIFICAR ASISTENCIA
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<AsistenciaResponseDTO>> modificarAsistencia(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAsistenciaDTO dto) {

        AsistenciaResponseDTO response = asistenciaService.updateAsistencia(id, dto);

        return ResponseEntity.ok(
                new ApiResponseDTO<>(
                        "Asistencia actualizada correctamente",
                        response
                )
        );
    }

    // =========================
    // ELIMINAR ASISTENCIA
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> eliminarAsistencia(@PathVariable Long id) {

        asistenciaService.eliminarAsistencia(id);

        return ResponseEntity.ok(
                new ApiResponseDTO<>(
                        "Asistencia eliminada correctamente",
                        null
                )
        );
    }

    // =========================
    // LISTAR HISTORIAL POR CURSO
    // =========================
    @GetMapping("/curso/{cursoId}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<List<AsistenciaResponseDTO>>> listarPorCurso(
            @PathVariable Long cursoId) {

        List<AsistenciaResponseDTO> response =
                asistenciaService.obtenerHistorialPorCurso(cursoId);

        return ResponseEntity.ok(
                new ApiResponseDTO<>(
                        "Historial del curso obtenido correctamente",
                        response
                )
        );
    }

    // =========================
    // BUSCAR POR FECHA
    // =========================
    @GetMapping("/curso/{cursoId}/fecha/{fecha}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<List<AsistenciaResponseDTO>>> buscarPorFecha(
            @PathVariable Long cursoId,
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {

        List<AsistenciaResponseDTO> response =
                asistenciaService.obtenerPorFecha(cursoId, fecha);

        return ResponseEntity.ok(
                new ApiResponseDTO<>(
                        "Asistencias de la fecha obtenidas correctamente",
                        response
                )
        );
    }

    
@PostMapping("/lote")
@PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
public ResponseEntity<ApiResponseDTO<Void>> guardarAsistenciaLote(@RequestBody RegistroAsistenciaLoteDTO dto) {
    asistenciaService.guardarAsistenciaLote(dto);
    return ResponseEntity.ok(new ApiResponseDTO<>("Asistencia procesada correctamente", null));
}
}