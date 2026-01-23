package com.example.Academy.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.dto.LoginRequestDTO;
import com.example.Academy.dto.LoginResponseDTO;
import com.example.Academy.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthResource {

     private final AuthService authService;

    public AuthResource(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request) throws Exception {

        return ResponseEntity.ok(authService.login(request));
    }
}
