package com.example.Academy.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Academy.dto.LoginRequestDTO;
import com.example.Academy.dto.LoginResponseDTO;
import com.example.Academy.dto.UserInfoResponseDTO;
import com.example.Academy.entity.Persona;
import com.example.Academy.repository.PersonaRepository;
import com.example.Academy.service.AuthService;
import org.springframework.security.core.userdetails.UserDetails;



@RestController
@RequestMapping("/auth")
public class AuthResource {

    private final AuthService authService;
    
    @Autowired
    private PersonaRepository personaRepository;

    public AuthResource(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request) throws Exception {

        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfoResponseDTO> me(Authentication authentication) {

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        Persona persona = personaRepository.findByUsername(userDetails.getUsername()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UserInfoResponseDTO dto = new UserInfoResponseDTO(persona.getId(), roles, persona.getNombre());
        dto.setId(persona.getId());
        dto.setRoles(roles);
        dto.setNombre(persona.getNombre());

        return ResponseEntity.ok(dto);
    }
}
