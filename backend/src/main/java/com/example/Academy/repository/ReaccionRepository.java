package com.example.Academy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Reaccion;

public interface ReaccionRepository extends JpaRepository<Reaccion, Long> {

    List<Reaccion> findByMensajeId(Long mensajeId);

    Optional<Reaccion> findByMensajeIdAndPersonaId(Long mensajeId, Long personaId);

}