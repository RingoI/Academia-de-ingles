package com.example.Academy.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.CreateNivelDTO;
import com.example.Academy.service.NivelService;

@RestController
@RequestMapping("/nivel")
public class NivelResource {

	@Autowired
	private NivelService nivelService;
	
	@PostMapping
	public ResponseEntity<ApiResponseDTO<Void>> agregarNivel(@RequestBody CreateNivelDTO dto){
		try {
			nivelService.createNivel(dto);
			return ResponseEntity.ok(new ApiResponseDTO<>("Nivel creado correctamente", null));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponseDTO<>(e.getMessage(), null));
		}
	}
}
