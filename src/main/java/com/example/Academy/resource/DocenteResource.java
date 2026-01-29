package com.example.Academy.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.example.Academy.entity.Role;
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

    // Mala practica, cambiar luego
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerDocente(@RequestBody CreateDocenteDTO dto) {
        try {
            Docente docente = new Docente();
            docente.setUsername(dto.getUsername());
            docente.setPassword(dto.getPassword());
            docente.setTitulo(dto.getTitulo());
            docente.setEstado(dto.getEstado());
            docente.setCuit(dto.getCuit());
            docente.setRole(Role.DOCENTE);
            docente.setNombre(dto.getNombre());
            docente.setEmail(dto.getEmail());
            docente.setDireccion(dto.getDireccion());
            docente.setFechanacimiento(dto.getFechanacimiento());
            personaService.create(docente);
            return ResponseEntity.ok("Docente created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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
        personaService.delete(id);
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
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}