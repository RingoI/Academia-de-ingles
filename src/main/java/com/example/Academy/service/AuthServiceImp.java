package com.example.Academy.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Academy.dto.LoginRequestDTO;
import com.example.Academy.dto.LoginResponseDTO;
import com.example.Academy.entity.Persona;
import com.example.Academy.util.JwtTokenUtil;


@Service
public class AuthServiceImp implements AuthService{

    private final JwtTokenUtil jwtTokenUtil;
    private final PersonaService personaService;
    private final PasswordEncoder passwordEncoder;


    public AuthServiceImp(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, PersonaService personaService, PasswordEncoder passwordEncoder) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.personaService = personaService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String authenticate(String username, String password) throws Exception {

        Optional<Persona> exist = personaService.findByUsername(username);

        if (exist.isEmpty()) {
            throw new Exception("User not found");
        }

        if (!passwordEncoder.matches(password, exist.get().getPassword())) {
            throw new Exception("Incorrect password");
        }

        return jwtTokenUtil.generateToken(exist.get().getUsername());

    }



    @Override
    public LoginResponseDTO login(LoginRequestDTO request) throws Exception {
        String token = authenticate(request.getUsername(), request.getPassword());
        return new LoginResponseDTO(token);
    }
    
}