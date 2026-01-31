package com.example.Academy.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.Academy.entity.Persona;
import com.example.Academy.util.JwtTokenUtil;

public class AutorizacionServiceImp implements AutorizacionService {


    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PersonaService personaService;
    
    public AutorizacionServiceImp(JwtTokenUtil jwtTokenUtil, PersonaService personaService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.personaService = personaService;
    }
    
    
    @Override
    public Persona authorize(String token) throws Exception {
         if (!jwtTokenUtil.verify(token)) {
        throw new Exception("Token inválido o expirado");
    }

    
    String username = jwtTokenUtil.getSubject(token);
    if (username == null) {
        throw new Exception("No se pudo obtener el subject del token");
    }


    Optional<Persona> persona = personaService.findByUsername(username);
    if (persona.isEmpty()) {
        throw new Exception("Usuario no encontrado");
    }

        
    return persona.get();
    }
}   
