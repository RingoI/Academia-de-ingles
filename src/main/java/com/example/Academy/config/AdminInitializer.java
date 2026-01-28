package com.example.Academy.config;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.Academy.entity.Administrador;
import com.example.Academy.entity.Role;
import com.example.Academy.repository.PersonaRepository;

import jakarta.annotation.PostConstruct;

@Component
public class AdminInitializer {

    private final PersonaRepository personaRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(PersonaRepository personaRepository,
                            PasswordEncoder passwordEncoder) {
        this.personaRepository = personaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void initAdmin() {

        boolean exists = personaRepository.findByUsername("admin").isPresent();

        if (!exists) {

            Administrador admin = new Administrador();

            admin.setUsername("admin");
            admin.setEmail("admin@academy.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setActivo(true);

            personaRepository.save(admin);

            System.out.println(" Admin creado automáticamente");
        }
    }
}
