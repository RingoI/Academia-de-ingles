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

import com.example.Academy.dto.CreateTareaRequestDTO;
import com.example.Academy.dto.TareaResponseDTO;
import com.example.Academy.dto.UpdateTareaRequestDTO;
import com.example.Academy.service.TareaService;

import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/tareas")
@RequiredArgsConstructor
public class TareaResource {

    private final TareaService tareaService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<TareaResponseDTO> crearTarea(
            @RequestBody CreateTareaRequestDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tareaService.crearTarea(dto));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE','ALUMNO')")
    public ResponseEntity<List<TareaResponseDTO>> obtenerTareas() {
        return ResponseEntity.ok(tareaService.obtenerTareas());
    }

    @GetMapping("/curso/{cursoId}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE','ALUMNO')")
    public ResponseEntity<List<TareaResponseDTO>> obtenerPorCurso(
            @PathVariable Long cursoId) {

        return ResponseEntity.ok(
                tareaService.obtenerTareasPorCurso(cursoId)
        );
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<Void> eliminarTarea(@PathVariable Long id) {
        tareaService.eliminarTarea(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DOCENTE')")
    public ResponseEntity<TareaResponseDTO> actualizarTarea(
            @PathVariable Long id,
            @RequestBody UpdateTareaRequestDTO dto) {
        return ResponseEntity.ok(tareaService.actualizarTarea(id, dto) );  
    }
}