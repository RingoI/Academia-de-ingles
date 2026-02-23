package com.example.Academy.service;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateNivelDTO;

@Service
public interface NivelService {

	void createNivel(CreateNivelDTO dto) throws Exception;
}