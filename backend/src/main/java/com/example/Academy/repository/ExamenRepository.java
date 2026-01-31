package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Academy.entity.Examen;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, Long> {

}
