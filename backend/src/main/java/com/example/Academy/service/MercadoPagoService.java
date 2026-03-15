package com.example.Academy.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.Academy.dto.PagoCuotaDTO;
import com.example.Academy.dto.PagoRequestDTO;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;

@Service
public interface MercadoPagoService {

    String crearPreferencia() throws MPException, MPApiException;
    void procesarWebhook(Map<String, Object> payload) throws MPException, MPApiException;
    Payment obtenerPago(String paymentId);

    List<String> crearCuponera(PagoRequestDTO pagoDTO) throws MPException, MPApiException;

    List<PagoCuotaDTO> obtenerPagosPorAlumno(Long alumnoId);

    List<PagoCuotaDTO> obtenerPagosAcreditados();

}
