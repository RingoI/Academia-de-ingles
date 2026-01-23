package com.example.Academy.service;

import org.springframework.stereotype.Service;

import com.example.Academy.entity.Persona;

@Service
public interface AutorizacionService {

    public Persona authorize(String token) throws Exception;
}
