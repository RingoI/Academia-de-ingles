package com.example.Academy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateAlumnoDTO;
import com.example.Academy.dto.CreateDocenteDTO;
import com.example.Academy.dto.UpdateAlumnoDTO;
import com.example.Academy.dto.UpdateDocenteRequestDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Persona;

@Service
public interface PersonaService {

    public Optional<Persona> findByUsername(String username);
    void updateAlumno(Long id, UpdateAlumnoDTO updateAlumnoDTO) throws Exception;
    void updateDocente(Long id, UpdateDocenteRequestDTO dto) throws Exception;
    void createDocente(CreateDocenteDTO dto) throws Exception;
    void createAlumno(CreateAlumnoDTO dto) throws Exception;
    void deleteAlumno(Long id);
    void deleteDocente(Long id);
    List<Alumno> getAlumnosActivosConNiveles();
    void MostrarAlumnosPorId(Long id);
    public Alumno getAlumnoById(Long id);
    List<Alumno> findAll();
    List<Docente> findAllDocentes();
    Docente findDocenteById(Long id);
    
}  
