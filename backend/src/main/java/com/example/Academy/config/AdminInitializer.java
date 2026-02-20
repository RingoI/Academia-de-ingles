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

        if (personaRepository.findByUsername("pepguardiola").isEmpty()) {
            Docente docente = new Docente();
            docente.setUsername("pepguardiola");
            docente.setPassword(passwordEncoder.encode("1234"));
            docente.setNombre("Pep Guardiola");
            docente.setEmail("pepguardiola@academy.com");
            docente.setDireccion("Rivadavia 456");
            docente.setFechanacimiento(LocalDate.of(1980, 1, 1));
            docente.setTitulo("C1");
            docente.setEstado(true);
            docente.setCuit("20-12345678-9");
            docente.setRole(Role.DOCENTE);
            docente.setActivo(true);
            personaRepository.save(docente);
        }

        if (personaRepository.findByUsername("carloancelotti").isEmpty()) {
            Docente docente = new Docente();
            docente.setUsername("carloancelotti");
            docente.setPassword(passwordEncoder.encode("1234"));
            docente.setNombre("Carlo Ancelotti");
            docente.setEmail("carloancelotti@academy.com");
            docente.setDireccion("25 de Mayo 789");
            docente.setFechanacimiento(LocalDate.of(1980, 1, 1));
            docente.setTitulo("A1");
            docente.setEstado(true);
            docente.setCuit("20-23456789-9");
            docente.setRole(Role.DOCENTE);
            docente.setActivo(true);
            personaRepository.save(docente);
        }

        if (personaRepository.findByUsername("jurgenklopp").isEmpty()) {
            Docente docente = new Docente();
            docente.setUsername("jurgenklopp");
            docente.setPassword(passwordEncoder.encode("1234"));
            docente.setNombre("Jurgen Klopp");
            docente.setEmail("jurgenklopp@academy.com");
            docente.setDireccion("Francia 34");
            docente.setFechanacimiento(LocalDate.of(1980, 1, 1));
            docente.setTitulo("C3");
            docente.setEstado(true);
            docente.setCuit("20-34567890-9");
            docente.setRole(Role.DOCENTE);
            docente.setActivo(true);
            personaRepository.save(docente);
        }

        if (personaRepository.findByUsername("josemourinho").isEmpty()) {
            Docente docente = new Docente();
            docente.setUsername("josemourinho");
            docente.setPassword(passwordEncoder.encode("1234"));
            docente.setNombre("Jose Mourinho");
            docente.setEmail("josemourinho@academy.com");
            docente.setDireccion("Laprida 525");
            docente.setFechanacimiento(LocalDate.of(1980, 1, 1));
            docente.setTitulo("B2");
            docente.setEstado(true);
            docente.setCuit("20-45678901-9");
            docente.setRole(Role.DOCENTE);
            docente.setActivo(true);
            personaRepository.save(docente);
        }

        if (personaRepository.findByUsername("lionelscaloni").isEmpty()) {
            Docente docente = new Docente();
            docente.setUsername("lionelscaloni");
            docente.setPassword(passwordEncoder.encode("1234"));
            docente.setNombre("Lionel Scaloni");
            docente.setEmail("lionelscaloni@academy.com");
            docente.setDireccion("Belgrano 678");
            docente.setFechanacimiento(LocalDate.of(1980, 1, 1));
            docente.setTitulo("B3");
            docente.setEstado(true);
            docente.setCuit("20-56789012-9");
            docente.setRole(Role.DOCENTE);
            docente.setActivo(true);
            personaRepository.save(docente);
        }

        if (personaRepository.findByUsername("mikelarteta").isEmpty()) {
            Docente docente = new Docente();
            docente.setUsername("mikelarteta");
            docente.setPassword(passwordEncoder.encode("1234"));
            docente.setNombre("Mikel Arteta");
            docente.setEmail("mikelarteta@academy.com");
            docente.setDireccion("Estrada 1289");
            docente.setFechanacimiento(LocalDate.of(1980, 1, 1));
            docente.setTitulo("A3");
            docente.setEstado(true);
            docente.setCuit("20-67890123-9");
            docente.setRole(Role.DOCENTE);
            docente.setActivo(true);
            personaRepository.save(docente);
        }
    }
}