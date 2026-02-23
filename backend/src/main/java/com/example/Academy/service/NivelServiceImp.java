package com.example.Academy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Academy.dto.CreateNivelDTO;
import com.example.Academy.entity.Nivel;
import com.example.Academy.repository.NivelRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class NivelServiceImp implements NivelService{
	
	@Autowired
	private  NivelRepository nivelRepository;


	@Override
	public void createNivel(CreateNivelDTO dto) throws Exception{
		if(nivelRepository.findByNombre(dto.getNombre()).isPresent()){
			throw new Exception("El nivel ya existe");
		}

		Nivel nivel = new Nivel();
		nivel.setNombre(dto.getNombre());

		nivelRepository.save(nivel);
	}
}
