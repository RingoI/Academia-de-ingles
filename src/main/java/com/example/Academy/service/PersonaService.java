package com.example.Academy.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.UpdateAlumnoDTO;
import com.example.Academy.entity.Persona;

@Service
public interface PersonaService {

    public Optional<Persona> findByUsername(String username);
    public void create(Persona persona) throws Exception;
    public void updateAlumno(Long id, UpdateAlumnoDTO updateAlumnoDTO) throws Exception;
    public void delete(Long id) throws Exception;
    
}  
