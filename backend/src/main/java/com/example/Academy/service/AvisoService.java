package com.example.Academy.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.Academy.entity.Aviso;

@Service
public interface AvisoService {

	Aviso crearAviso(Aviso aviso);

	List<Aviso> avisosPorCurso(Long cursoId);

	List<Aviso> avisosInstitucionales();

	List<Aviso> obtenerAvisosPorRol(Authentication authentication);
}
