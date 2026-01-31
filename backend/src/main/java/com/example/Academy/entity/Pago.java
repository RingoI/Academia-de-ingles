package com.example.Academy.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "pagos",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "payment_id")
    }
)
@Getter
@Setter
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "payment_id", nullable = false, unique = true)
    private String paymentId;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private BigDecimal monto;

    @Column(nullable = false)
    private String currency;

    @Column(name = "raw_status")
    private String rawStatus;

    @Column(name = "external_reference")
    private String externalReference;

    @Column(name = "fecha")
    private LocalDateTime fecha;



    @Column(nullable = false)
    private String source = "MERCADO_PAGO";

}
