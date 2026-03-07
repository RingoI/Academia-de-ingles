package com.example.Academy.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.entity.Aviso;
import com.example.Academy.entity.Persona;
import com.example.Academy.repository.PersonaRepository;
import com.example.Academy.service.AvisoService;

@RestController
@RequestMapping("/avisos")
public class AvisoResource {

	@Autowired
	private AvisoService avisoService;

	@Autowired
	private PersonaRepository personaRepository;

	@PostMapping
	@PreAuthorize("hasRole('DOCENTE') or hasRole('ADMIN')")
	public ResponseEntity<Aviso> crearAviso(@RequestBody Aviso aviso, Authentication auth){
		Persona persona = personaRepository.findByUsername(auth.getName())
							.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
		aviso.setCreador(persona);
		return ResponseEntity.ok(avisoService.crearAviso(aviso));
	}	


	@GetMapping
	public ResponseEntity<List<Aviso>> obtenerAvisos(Authentication authentication){
		return ResponseEntity.ok(avisoService.obtenerAvisosPorRol(authentication));
	}

}
