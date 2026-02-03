package com.example.Academy.resource;


import java.util.List;
import java.util.Map;

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
import com.example.Academy.config.ModelMapperConfig;
import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.CreateAlumnoDTO;
import com.example.Academy.dto.UpdateAlumnoDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.service.AuthService;
import com.example.Academy.service.PersonaService;

@RestController
@RequestMapping("/alumnos")
public class AlumnoResource {

    private final PersonaService personaService;
    private final ModelMapperConfig modelMapperConfig;
    private final AuthService authService;

    public AlumnoResource(PersonaService personaService, ModelMapperConfig modelMapperConfig, AuthService authService) {
        this.personaService = personaService;
        this.authService = authService;
        this.modelMapperConfig = modelMapperConfig;
        
    }

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> registerAlumno(@RequestBody CreateAlumnoDTO dto) {
        try {
            personaService.createAlumno(dto);
            return ResponseEntity.ok(new ApiResponseDTO<>("Alumno creado correctamente", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponseDTO<>(e.getMessage(), null));
        }
    } 

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<List<Alumno>> getAlumnos() {
        return ResponseEntity.ok(personaService.findAll());
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<?> getAlumnoById(@PathVariable Long id) {
        try {
            Alumno alumno = personaService.getAlumnoById(id);
            return ResponseEntity.ok(alumno);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping(path = "/auth", produces = "application/json")
    public ResponseEntity<?> authenticateAlumno(@RequestBody CreateAlumnoDTO createAlumnoDTO) {
        try {
            var alumno = modelMapperConfig.modelMapper().map(createAlumnoDTO, com.example.Academy.entity.Alumno.class);
            String token = authService.authenticate(alumno.getUsername(), alumno.getPassword());
            return ResponseEntity.ok("{\"token\":\"" + token + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ApiResponseDTO<>("Authentication failed", null));
        }
    }

    
    @DeleteMapping ("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> deleteAlumno(@PathVariable Long id) {
        try {
            personaService.deleteAlumno(id);
            return ResponseEntity.ok(new ApiResponseDTO<>("Alumno eliminado correctamente", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponseDTO<>("Error al eliminar el alumno", null));
        }
    }

    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<?> updateAlumno(
            @PathVariable Long id,
            @RequestBody UpdateAlumnoDTO dto) throws Exception {

        personaService.updateAlumno(id, dto);

        return ResponseEntity.ok(new ApiResponseDTO<>("Alumno actualizado correctamente", null));
    }

}
