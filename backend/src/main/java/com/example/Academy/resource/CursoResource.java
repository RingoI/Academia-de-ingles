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
import com.example.Academy.dto.CreateCursoRequestDTO;
import com.example.Academy.dto.CursoResponseDTO;
import com.example.Academy.dto.CursosPorDocenteDTO;
import com.example.Academy.dto.UpdateCursoRequestDTO;
import com.example.Academy.service.CursoService;

@RestController
@RequestMapping("/cursos")
public class CursoResource {


    private final CursoService cursoService;

    public CursoResource(CursoService cursoService) {
        this.cursoService = cursoService;
    }
    
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<CursoResponseDTO>> crearCurso(
            @RequestBody CreateCursoRequestDTO dto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>("Curso creado exitosamente",
                        cursoService.crearCurso(dto)));
    }
 

    @GetMapping
    public ResponseEntity<List<CursoResponseDTO>> obtenerCursos() {
        return ResponseEntity.ok(cursoService.obtenerCursos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoResponseDTO> obtenerCursoPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(cursoService.obtenerCursoPorId(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> eliminarCurso(@PathVariable Long id) {
        cursoService.eliminarCurso(id);
        return ResponseEntity.ok(
            new ApiResponseDTO<Void>("Curso eliminado exitosamente", null)
        );

    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<CursoResponseDTO>> actualizarCurso(
        @PathVariable Long id,
        @RequestBody UpdateCursoRequestDTO dto) {

        return ResponseEntity.ok(
            new ApiResponseDTO<>("Curso actualizado exitosamente",
                cursoService.actualizarCurso(id, dto))
        );
    }

    @GetMapping("/docente/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<List<CursosPorDocenteDTO>>> obtenerCursosPorDocente(@PathVariable Long id){
        List<CursosPorDocenteDTO> cursos = cursoService.obtenerCursosPorDocente(id);
        return ResponseEntity.ok(new ApiResponseDTO<>("Cursos encontrados", cursos));
    }

}
