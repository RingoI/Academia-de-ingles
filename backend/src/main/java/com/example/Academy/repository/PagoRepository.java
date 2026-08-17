package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Pago;
import java.util.List;


public interface PagoRepository extends JpaRepository< Pago, Long> {

    boolean existsByPaymentId(String paymentId);

    Pago findByPaymentId(String paymentId);

    List<Pago> findByAlumnoId(Long alumnoId);

    Pago findByPreferenceId(String preferenceId);

    Pago findByExternalReference(String externalReference);

    Boolean existsByAlumnoIdAndCursoId(Long alumno_id, Long curso_id);

    List<Pago> findByRawStatusOrderByFechaDePagoDesc(String rawStatus);

}
