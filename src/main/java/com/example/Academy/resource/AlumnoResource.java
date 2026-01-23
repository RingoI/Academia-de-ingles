package com.example.Academy.resource;


import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.config.ModelMapperConfig;
import com.example.Academy.dto.CreateAlumnoDTO;
import com.example.Academy.dto.UpdateAlumnoDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Nivel;
import com.example.Academy.entity.Role;
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

    @PostMapping("/register")
    public ResponseEntity<?> registerAlumno(@RequestBody CreateAlumnoDTO dto) {
        try {
            Alumno alumno = new Alumno();
            alumno.setUsername(dto.getUsername());
            alumno.setPassword(dto.getPassword());
            alumno.setDni(dto.getDni());
            alumno.setRole(Role.ALUMNO);
            alumno.setNombre(dto.getNombre());
            alumno.setEmail(dto.getEmail());
            alumno.setDireccion(dto.getDireccion());
            alumno.setFechanacimiento(dto.getFechanacimiento());

            Nivel nivel = new Nivel();
            nivel.setAlumno(alumno);

            alumno.getNivel().add(nivel);


            personaService.create(alumno);
            return ResponseEntity.ok("Alumno created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    
    @PostMapping(path = "/auth", produces = "application/json")
    public ResponseEntity<?> authenticateAlumno(@RequestBody CreateAlumnoDTO createAlumnoDTO) {
        try {
            var alumno = modelMapperConfig.modelMapper().map(createAlumnoDTO, com.example.Academy.entity.Alumno.class);
            String token = authService.authenticate(alumno.getUsername(), alumno.getPassword());
            return ResponseEntity.ok("{\"token\":\"" + token + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<?> deleteAlumno(@RequestBody Long id) {
        try {
            personaService.delete(id);
            return ResponseEntity.ok("Alumno deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAlumno(
            @PathVariable Long id,
            @RequestBody UpdateAlumnoDTO dto) throws Exception {

        personaService.updateAlumno(id, dto);

        return ResponseEntity.ok(
            Map.of("message", "Alumno actualizado correctamente")
        );
    }

}
