package com.example.Academy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Academy.entity.Pago;
import com.google.common.base.Optional;

public interface PagoRepository extends JpaRepository< Pago, Long> {

    boolean existsByPaymentId(String paymentId);

    Optional<Pago> findByPaymentId(String paymentId);
}
