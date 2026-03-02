package com.example.Academy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.Nivel;


@Repository
public interface NivelRepository  extends JpaRepository<Nivel, Long> {
	Optional<Nivel> findByNombre(String nombre);
}
