package com.example.Academy.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PagoCuotaDTO {
	private Integer numeroCuota;
	private String status;
	private String initPoint;
	private BigDecimal monto;
	private String currency;
	private String nombreCurso;
	private LocalDateTime fecha;
	private String nombreAlumno;
	private LocalDateTime fechaPago;
	private int cantCuotas;
	private String nivel;
}
