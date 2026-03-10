package com.example.Academy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.Academy.entity.Mensaje;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {

    Page<Mensaje> findByTemaIdOrderByFechaAsc(Long temaId, Pageable pageable);

}