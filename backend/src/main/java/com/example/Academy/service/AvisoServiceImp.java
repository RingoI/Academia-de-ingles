package com.example.Academy.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Academy.entity.Administrador;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Aviso;
import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Persona;
import com.example.Academy.repository.AvisoRepository;
import com.example.Academy.repository.PersonaRepository;

@Service
public class AvisoServiceImp implements AvisoService{
	@Autowired
	private AvisoRepository avisoRepository;

	@Autowired
	private PersonaRepository personaRepository;

	public Aviso crearAviso(Aviso aviso){
		return avisoRepository.save(aviso);
	}

	public List<Aviso> avisosPorCurso(Long cursoId){
		return avisoRepository.findByCursoId(cursoId);
	}

	public List<Aviso> avisosInstitucionales(){
		return avisoRepository.findByInstitucionalTrue();
	}

	public List<Aviso> obtenerAvisosPorRol(Authentication authentication){
		String username = authentication.getName();
		Persona persona = personaRepository.findByUsername(username)
							.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

	if(persona instanceof Alumno alumno){
			List<Aviso> institucionales = avisoRepository.findByInstitucionalTrue();
			List<Aviso> deCursos = avisoRepository.findByCursoIn(alumno.getCursos());
			return Stream.concat(institucionales.stream(), deCursos.stream()).
			sorted(Comparator.comparing(Aviso::getFechaCreacion).reversed()).
			toList();
			
		} else if (persona instanceof Docente docente){
			List<Aviso> institucionales = avisoRepository.findByInstitucionalTrue();
			List<Aviso> propios = avisoRepository.findByCreador(docente);
			return Stream.concat(institucionales.stream(),propios.stream()).sorted(Comparator.comparing(Aviso::getFechaCreacion).reversed()).toList();
		
		}else if (persona instanceof Administrador){
			return avisoRepository.findAllByOrderByFechaCreacionDesc();
		}

		return List.of();

	}

}