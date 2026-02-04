package com.example.Academy.resource;

import java.util.List;

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
import com.example.Academy.dto.CreateDocenteDTO;
import com.example.Academy.dto.UpdateDocenteRequestDTO;
import com.example.Academy.entity.Docente;
import com.example.Academy.service.AuthService;
import com.example.Academy.service.PersonaService;

@RestController
@RequestMapping("/docentes")
public class DocenteResource {

    private final PersonaService personaService;
    private final ModelMapperConfig modelMapperConfig;
    private final AuthService authService;
    

    public DocenteResource(PersonaService personaService, ModelMapperConfig modelMapperConfig, AuthService authService) {
        this.personaService = personaService;
        this.modelMapperConfig = modelMapperConfig;
        this.authService = authService;
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
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponseDTO<Void>> deleteDocente(@PathVariable Long id) throws Exception {
        personaService.deleteDocente(id);
        return ResponseEntity.ok(
            new ApiResponseDTO<Void>("Docente deleted successfully", null));
    }


    @PostMapping(path = "/auth", produces = "application/json")
    public ResponseEntity<?> authenticateDocente(@RequestBody CreateDocenteDTO createDocenteDTO) {
        try {
            var docente = modelMapperConfig.modelMapper().map(createDocenteDTO, com.example.Academy.entity.Docente.class);
            String token = authService.authenticate(docente.getUsername(), docente.getPassword());
            return ResponseEntity.ok("{\"token\":\"" + token + "\"}");
        } catch (Exception e) {
            return ResponseEntity.ok(
                new ApiResponseDTO<>("Authentication failed", null)     
            );
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