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

import com.example.Academy.dto.AvisoRequestDTO;
import com.example.Academy.dto.AvisoResponseDTO;
import com.example.Academy.entity.Aviso;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Persona;
import com.example.Academy.repository.CursoRepository;
import com.example.Academy.repository.PersonaRepository;
import com.example.Academy.service.AvisoService;

@RestController
@RequestMapping("/avisos")
public class AvisoResource {

	@Autowired
	private AvisoService avisoService;

	@Autowired
	private PersonaRepository personaRepository;

	@Autowired
	private CursoRepository cursoRepository;

	@PostMapping
	@PreAuthorize("hasRole('DOCENTE') or hasRole('ADMIN')")
	public ResponseEntity<Aviso> crearAviso(@RequestBody AvisoRequestDTO avisoDTO, Authentication auth){
		Persona persona = personaRepository.findByUsername(auth.getName())
							.orElseThrow(() -> new RuntimeException("Usuario no encontrado"));


		Aviso aviso = new Aviso();
		aviso.setTitulo(avisoDTO.getTitulo());
		aviso.setCuerpo(avisoDTO.getCuerpo());
		aviso.setInstitucional(avisoDTO.isInstitucional());
		aviso.setCreador(persona);

		if (!avisoDTO.isInstitucional()) {
        if (avisoDTO.getCurso_id() == null) {
            throw new RuntimeException("Debe especificar curso_id si el aviso no es institucional");
        }
        Curso curso = cursoRepository.findById(avisoDTO.getCurso_id())
            .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        aviso.setCurso(curso);
   	}

		

		return ResponseEntity.ok(avisoService.crearAviso(aviso));
	}	


	@GetMapping
	public ResponseEntity<List<AvisoResponseDTO>> obtenerAvisos(Authentication authentication){

		List<Aviso> avisos = avisoService.obtenerAvisosPorRol(authentication);
		List<AvisoResponseDTO> dtos = avisos.stream().map(AvisoMapper::toDTO).toList();
		return ResponseEntity.ok(dtos);
	}

	public class AvisoMapper {
    public static AvisoResponseDTO toDTO(Aviso aviso) {
        AvisoResponseDTO dto = new AvisoResponseDTO();
        dto.setId(aviso.getId());
        dto.setTitulo(aviso.getTitulo());
        dto.setCuerpo(aviso.getCuerpo());
        dto.setFechaCreacion(aviso.getFechaCreacion());
        dto.setInstitucional(aviso.isInstitucional());
        dto.setCreador(aviso.getCreador());
        dto.setNombreCurso(aviso.getCurso() != null ? aviso.getCurso().getNombre() : null);
        return dto;
    	}	
	}


}
