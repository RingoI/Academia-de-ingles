package com.example.Academy.config;

import java.time.LocalDate;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.Academy.entity.*;
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





        // NUEVO: crear alumnos y docentes PARA PRUEBAS.
        createAlumnos();
        createDocentes();
    }

    private void createAlumnos() {

        String[] jugadores = {
            "Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappe", "Erling Haaland",
            "Neymar Jr", "Kevin De Bruyne", "Vinicius Jr", "Luka Modric",
            "Robert Lewandowski", "Karim Benzema", "Harry Kane", "Jude Bellingham",
            "Antoine Griezmann", "Mohamed Salah", "Pedri", "Ilkay Gundogan",
            "Lautaro Martinez", "Julian Alvarez", "Victor Osimhen", "Rodri"
        };

        for (String nombre : jugadores) {

            String username = nombre.toLowerCase().replace(" ", "").replace(".", "");

            if (personaRepository.findByUsername(username).isPresent()) continue;

            Alumno alumno = new Alumno();
            alumno.setUsername(username);
            alumno.setPassword(passwordEncoder.encode("1234"));
            alumno.setNombre(nombre);
            alumno.setEmail(username + "@academy.com");
            alumno.setDireccion("Ciudad Deportiva 123");
            alumno.setFechanacimiento(LocalDate.of(2000, 1, 1));
            alumno.setDni(String.valueOf((int)(Math.random() * 100000000)));
            alumno.setEstado(true);
            alumno.setRole(Role.ALUMNO);
            alumno.setActivo(true);

            personaRepository.save(alumno);
        }
    }

    private void createDocentes() {

        String[] entrenadores = {
            "Pep Guardiola", "Carlo Ancelotti", "Jurgen Klopp",
            "Jose Mourinho", "Lionel Scaloni", "Mikel Arteta"
        };

        for (String nombre : entrenadores) {

            String username = nombre.toLowerCase().replace(" ", "");

            if (personaRepository.findByUsername(username).isPresent()) continue;

            Docente docente = new Docente();
            docente.setUsername(username);
            docente.setPassword(passwordEncoder.encode("1234"));
            docente.setNombre(nombre);
            docente.setEmail(username + "@academy.com");
            docente.setDireccion("Centro de Entrenamiento 456");
            docente.setFechanacimiento(LocalDate.of(1980, 1, 1));
            docente.setTitulo("Director Técnico Profesional");
            docente.setEstado(true);
            docente.setCuit("20-" + (int)(Math.random() * 10000000) + "-9");
            docente.setRole(Role.DOCENTE);
            docente.setActivo(true);

            personaRepository.save(docente);
        }





    }
}
