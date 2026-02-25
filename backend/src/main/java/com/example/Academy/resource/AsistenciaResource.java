package com.example.Academy.resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.AsistenciaRequestDTO;
import com.example.Academy.dto.AsistenciaResponseDTO;
import com.example.Academy.dto.UpdateAsistenciaDTO;
import com.example.Academy.service.AsistenciaService;

@RestController
@RequestMapping("/asistencias")
public class AsistenciaResource {

    private final AsistenciaService asistenciaService;

    public AsistenciaResource(AsistenciaService asistenciaService ) {
        this.asistenciaService = asistenciaService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<AsistenciaResponseDTO>> tomarAsistencia(
            @RequestBody AsistenciaRequestDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>(
                        "Asistencia registrada correctamente",
                        asistenciaService.tomarAsistencia(dto)
                    
                ));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<AsistenciaResponseDTO>> modificarAsistencia(
            @PathVariable Long id,
            @RequestBody UpdateAsistenciaDTO dto) {

        return ResponseEntity.ok(
            new ApiResponseDTO<>(
                "Asistencia actualizada correctamente",
                asistenciaService.updateAsistencia(id, dto)
            )
        );
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Object>> eliminarAsistencia(@PathVariable Long id) {

        asistenciaService.eliminarAsistencia(id);
        return ResponseEntity.ok(
            new ApiResponseDTO<>("Asistencia eliminada correctamente", null)
        );
    }

    


}
