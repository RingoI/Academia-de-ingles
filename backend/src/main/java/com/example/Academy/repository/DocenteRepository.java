package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.Docente;
import com.example.Academy.entity.Persona;

@Repository
public interface DocenteRepository extends JpaRepository<Docente, Long> {

    void save(Persona persona);

}
