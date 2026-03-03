package com.example.Academy.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.CreateNivelDTO;
import com.example.Academy.dto.NivelResponseDTO;
import com.example.Academy.repository.NivelRepository;
import com.example.Academy.service.NivelService;

@RestController
@RequestMapping("/niveles")
public class NivelResource {

	private final NivelRepository nivelRepository;
	private final NivelService nivelService;

	@Autowired
	public NivelResource(NivelRepository nivelRepository, NivelService nivelService ) {
		this.nivelRepository = nivelRepository;
		this.nivelService = nivelService;
	}
	
	@PostMapping("/crear")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponseDTO<Void>> agregarNivel(@RequestBody CreateNivelDTO dto){
		try {
			nivelService.createNivel(dto);
			return ResponseEntity.ok(new ApiResponseDTO<>("Nivel creado correctamente", null));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponseDTO<>(e.getMessage(), null));
		}
	}

	
@GetMapping
public List<NivelResponseDTO> getAll() {
    return nivelRepository.findAll()
            .stream()
            .map(n -> new NivelResponseDTO(n.getId(), n.getNombre()))
            .toList();
}

}