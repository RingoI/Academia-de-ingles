package com.example.Academy.resource;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Academy.config.ModelMapperConfig;
import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.CreateAlumnoDTO;
import com.example.Academy.dto.CreateDocenteDTO;
import com.example.Academy.dto.UpdateDocenteRequestDTO;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Persona;
import com.example.Academy.repository.PersonaRepository;
import com.example.Academy.service.AuthService;
import com.example.Academy.service.PersonaService;

@RestController
@RequestMapping("/docentes")
public class DocenteResource {

    private final PersonaService personaService;
    private final AuthService authService;
    private final PersonaRepository personaRepository;
    

    public DocenteResource(PersonaService personaService, ModelMapperConfig modelMapperConfig, AuthService authService, PersonaRepository personaRepository){ 
        this.personaService = personaService;
        this.authService = authService;
        this.personaRepository = personaRepository;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponseDTO<Void>> registerDocente(@RequestBody CreateDocenteDTO dto) throws Exception {
        personaService.createDocente(dto);
        return ResponseEntity.ok(new ApiResponseDTO<>("Docente creado correctamente", null));
    }

    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponseDTO<Void>> updateDocente(
            @PathVariable Long id,
            @RequestBody UpdateDocenteRequestDTO requestDTO) throws Exception {

        personaService.updateDocente(id, requestDTO);

           
        return ResponseEntity.ok(
            new ApiResponseDTO<Void>("Docente updated successfully", null));
    }
    

    @PostMapping(path = "/auth", produces = "application/json")
    public ResponseEntity<?> authenticateAlumno(@RequestBody CreateAlumnoDTO createAlumnoDTO) {
        try {

            Persona persona = personaRepository
                    .findByUsername(createAlumnoDTO.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (!persona.getActivo()) {
                return ResponseEntity.status(403)
                        .body(new ApiResponseDTO<>("El usuario está desactivado", null));
            }

            String token = authService.authenticate(
                    createAlumnoDTO.getUsername(),
                    createAlumnoDTO.getPassword()
            );

            return ResponseEntity.ok("{\"token\":\"" + token + "\"}");

        } catch (Exception e) {
            return ResponseEntity.status(401)
                    .body(new ApiResponseDTO<>("Authentication failed", null));
        }
    }


    @PatchMapping ("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
    public ResponseEntity<ApiResponseDTO<Void>> deleteDocente(@PathVariable Long id) {
        try {
            personaService.deleteDocente(id);
            return ResponseEntity.ok(new ApiResponseDTO<>("Docente modificado correctamente", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponseDTO<>("Error al modificar el docente", null));
        }
    }

        @GetMapping
        @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
        public ResponseEntity<List<Docente>> getDocente() {
            return ResponseEntity.ok(personaService.findAllDocentes());
        }

        @GetMapping("/{id}")
        @PreAuthorize("hasAnyRole('ADMIN', 'DOCENTE')")
        public ResponseEntity<Docente> getDocenteById(@PathVariable Long id) {
            return ResponseEntity.ok(personaService.findDocenteById(id));
        }

}