package com.example.Academy.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;

@Service
public interface MercadoPagoService {

    String crearPreferencia() throws MPException, MPApiException;
    void procesarWebhook(Map<String, Object> body,
                                Map<String, String> headers);
    Payment obtenerPago(String paymentId);
}
