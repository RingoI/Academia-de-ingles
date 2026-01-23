package com.example.Academy.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.config.ModelMapperConfig;
import com.example.Academy.dto.CreateDocenteDTO;
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

    @PostMapping("/register")
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