package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.Docente;

@Repository
public interface DocenteRepository extends JpaRepository<Docente, Long> {

}
