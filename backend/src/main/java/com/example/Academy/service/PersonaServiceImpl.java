package com.example.Academy.service;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateAlumnoDTO;
import com.example.Academy.dto.CreateDocenteDTO;
import com.example.Academy.dto.UpdateAlumnoDTO;
import com.example.Academy.dto.UpdateDocenteRequestDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Nivel;
import com.example.Academy.entity.Persona;
import com.example.Academy.entity.Role;
import com.example.Academy.repository.AlumnoRepository;
import com.example.Academy.repository.DocenteRepository;
import com.example.Academy.repository.NivelRepository;
import com.example.Academy.repository.PersonaRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class PersonaServiceImpl implements PersonaService {


    private final PersonaRepository personaRepository;
    private final PasswordEncoder passwordEncoder;
    private final AlumnoRepository alumnoRepository;
    private final DocenteRepository docenteRepository;
    private final NivelRepository nivelRepository;

    public PersonaServiceImpl(PersonaRepository personaRepository, PasswordEncoder passwordEncoder , AlumnoRepository alumnoRepository,
         DocenteRepository docenteRepository, NivelRepository nivelRepository) {
        this.personaRepository = personaRepository;
        this.passwordEncoder = passwordEncoder;
        this.alumnoRepository = alumnoRepository;
        this.docenteRepository = docenteRepository;
        this.nivelRepository = nivelRepository;
    }
    
    @Override
    public Optional<Persona> findByUsername(String username) {
        return personaRepository.findByUsername(username);
    }

    @Override
    public void createDocente(CreateDocenteDTO dto) throws Exception {
        if (personaRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }

        Docente docente = new Docente();
        docente.setUsername(dto.getUsername());
        docente.setPassword(passwordEncoder.encode(dto.getPassword()));
        docente.setTitulo(dto.getTitulo());
        docente.setEstado(dto.getEstado());
        docente.setCuit(dto.getCuit());
        docente.setNombre(dto.getNombre());
        docente.setEmail(dto.getEmail());
        docente.setDireccion(dto.getDireccion());
        docente.setFechanacimiento(dto.getFechanacimiento());
        docente.setRole(Role.DOCENTE);

        personaRepository.save(docente);
    }

        
    @Override
    public void createAlumno(CreateAlumnoDTO dto) throws Exception {
        
        if (personaRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }

        // 2️⃣ Crear alumno y setear campos
        Alumno alumno = new Alumno();
        alumno.setUsername(dto.getUsername());
        alumno.setPassword(passwordEncoder.encode(dto.getPassword()));
        alumno.setDni(dto.getDni());
        alumno.setNombre(dto.getNombre());
        alumno.setEmail(dto.getEmail());
        alumno.setDireccion(dto.getDireccion());
        alumno.setFechanacimiento(dto.getFechanacimiento());
        alumno.setEstado(dto.getEstado());
        alumno.setRole(Role.ALUMNO);

        if (dto.getNivelId() != null) {
            Nivel nivel = nivelRepository.findById(dto.getNivelId())
                    .orElseThrow(() -> new RuntimeException("Nivel no existe"));
            nivel.setAlumno(alumno);   
            alumno.getNivel().add(nivel);
        }

        alumnoRepository.save(alumno);
    }


    @Override
    public List<Alumno> getAlumnosActivosConNiveles() {
    return alumnoRepository.findAllWithNiveles();
}


    @Override
    public void MostrarAlumnosPorId (Long id) {
        alumnoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
    }
    

    @Override
    public void deleteAlumno(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        alumno.setActivo(false);

        alumnoRepository.save(alumno);
    }

    @Override
    public void deleteDocente(Long id) {
        Docente docente = docenteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        docente.setActivo(false);

        docenteRepository.save(docente);
    }


    @Override
    public void updateAlumno(Long id, UpdateAlumnoDTO updateAlumnoDTO) throws Exception {
        Alumno alumno = alumnoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

        if (updateAlumnoDTO.getUsername() != null) {
            alumno.setUsername(updateAlumnoDTO.getUsername());
        }

        if (updateAlumnoDTO.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(updateAlumnoDTO.getPassword());
            alumno.setPassword(encodedPassword);
        }

        if (updateAlumnoDTO.getDni() != null) {
            alumno.setDni(updateAlumnoDTO.getDni());
        }   

        if (updateAlumnoDTO.getNombre() != null) {
            alumno.setNombre(updateAlumnoDTO.getNombre());
        }

        if (updateAlumnoDTO.getEmail() != null) {
            alumno.setEmail(updateAlumnoDTO.getEmail());
        }

        if (updateAlumnoDTO.getDireccion() != null) {
            alumno.setDireccion(updateAlumnoDTO.getDireccion());
        }

        if (updateAlumnoDTO.getFechanacimiento() != null) {
            alumno.setFechanacimiento(updateAlumnoDTO.getFechanacimiento());
        }

        if (updateAlumnoDTO.getEstado() != null) {
            alumno.setEstado(updateAlumnoDTO.getEstado());
        }

        alumnoRepository.save(alumno);


    }

    @Override
    public void updateDocente(Long id, UpdateDocenteRequestDTO updateDocenteRequestDTO) throws Exception {
            
        Docente docente = docenteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Docente no encontrado"));

        if (updateDocenteRequestDTO.getUsername() != null) {
            docente.setUsername(updateDocenteRequestDTO.getUsername());
        }

        if (updateDocenteRequestDTO.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(updateDocenteRequestDTO.getPassword());
            docente.setPassword(encodedPassword);
        }

        if (updateDocenteRequestDTO.getTitulo() != null) {
            docente.setTitulo(updateDocenteRequestDTO.getTitulo());
        }

        if (updateDocenteRequestDTO.getEstado() != null) {
            docente.setEstado(updateDocenteRequestDTO.getEstado());
        }

        if (updateDocenteRequestDTO.getCuit() != null) {
            docente.setCuit(updateDocenteRequestDTO.getCuit());
        }

        if (updateDocenteRequestDTO.getNombre() != null) {
            docente.setNombre(updateDocenteRequestDTO.getNombre());
        }

        if (updateDocenteRequestDTO.getEmail() != null) {
            docente.setEmail(updateDocenteRequestDTO.getEmail());
        }

        if (updateDocenteRequestDTO.getDireccion() != null) {
            docente.setDireccion(updateDocenteRequestDTO.getDireccion());
        }

        if (updateDocenteRequestDTO.getFechanacimiento() != null) {
            docente.setFechanacimiento(updateDocenteRequestDTO.getFechanacimiento());
        }

        docenteRepository.save(docente);
    }   

    @Override
    public Alumno getAlumnoById(Long id) {
        return alumnoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));

    }
}