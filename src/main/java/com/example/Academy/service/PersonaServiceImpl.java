package com.example.Academy.service;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.UpdateAlumnoDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Nivel;
import com.example.Academy.entity.Persona;
import com.example.Academy.repository.AlumnoRepository;
import com.example.Academy.repository.NivelRepository;
import com.example.Academy.repository.PersonaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class PersonaServiceImpl implements PersonaService {


    private final PersonaRepository personaRepository;
    private final PasswordEncoder passwordEncoder;
    private final NivelRepository nivelRepository; 
    private final AlumnoRepository alumnoRepository;

    public PersonaServiceImpl(PersonaRepository personaRepository, PasswordEncoder passwordEncoder, NivelRepository nivelRepository, AlumnoRepository alumnoRepository) {
        this.personaRepository = personaRepository;
        this.passwordEncoder = passwordEncoder;
        this.nivelRepository = nivelRepository;
        this.alumnoRepository = alumnoRepository;
    }
    
    @Override
    public Optional<Persona> findByUsername(String username) {
        return personaRepository.findByUsername(username);
    }

     @Override
    public void create(Persona persona) throws Exception {
        
        Optional<Persona> existingUser = personaRepository.findByUsername(persona.getUsername());
        if (existingUser.isPresent()) {
            throw new Exception("Username already exists");
        }

        String encodedPassword = passwordEncoder.encode(persona.getPassword());
        persona.setPassword(encodedPassword);

        personaRepository.save(persona);
    }

    @Override
    public void delete(Long id) {
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        persona.setActivo(false);
        personaRepository.save(persona);
    }

    @SuppressWarnings("unchecked")
    @Override
    public void updateAlumno(Long id, UpdateAlumnoDTO updateAlumnoDTO) throws Exception {
        Alumno alumno = alumnoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        if (updateAlumnoDTO.getDni() != null) {
            alumno.setDni(updateAlumnoDTO.getDni());
        }

        if (updateAlumnoDTO.getNivelId() != null) {
            Nivel nivel = nivelRepository.findById(updateAlumnoDTO.getNivelId())
                    .orElseThrow(() -> new RuntimeException("Nivel no existe"));
            alumno.setNivel((List<Nivel>) nivel);
        }

        alumnoRepository.save(alumno);
    }
} 