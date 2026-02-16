package com.example.Academy.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import com.example.Academy.entity.Pago;
import com.example.Academy.repository.PagoRepository;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.mercadopago.resources.preference.Preference;

import jakarta.transaction.Transactional;

@Service
public class MercadoPagoServiceImp implements MercadoPagoService {

    private final PagoRepository pagoRepository;

    public MercadoPagoServiceImp(PagoRepository pagoRepository) {
        this.pagoRepository = pagoRepository;
    }

    @Override
    public String crearPreferencia() throws MPException, MPApiException {

        PreferenceItemRequest item =
            PreferenceItemRequest.builder()
                .title("Examen de Matemática")
                .quantity(1)
                .unitPrice(new BigDecimal("1500"))
                .currencyId("ARS")
                .build();

        PreferenceBackUrlsRequest backUrls =
            PreferenceBackUrlsRequest.builder()
                .success("http://localhost:8082/pagos/success")
                .failure("http://localhost:8082/pagos/failure")
                .pending("http://localhost:8082/pagos/pending")
                .build();

        PreferenceRequest preferenceRequest =
            PreferenceRequest.builder()
                .items(List.of(item))
                .backUrls(backUrls)
                .build();

        try {
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);
            
            System.out.println("✅ Preferencia creada: " + preference.getInitPoint());
            return preference.getInitPoint();
        } catch (MPApiException e) {
            System.out.println("MPApiException en crearPreferencia:");
            System.out.println("Status: " + e.getStatusCode());
            System.out.println("Message: " + e.getMessage());
            
            try {
                if (e.getApiResponse() != null) {
                    System.out.println("   Response Object: " + e.getApiResponse().toString());
                    System.out.println("   Response Status Code: " + e.getApiResponse().getStatusCode());
                    System.out.println("   Response Content: " + e.getApiResponse().getContent());
                }
            } catch (Exception ex) {
                System.out.println("   No se pudieron extraer más detalles");
            }
            
            e.printStackTrace();
            throw e;
        } catch (MPException e) {
            System.out.println("MPException en crearPreferencia: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional
    public void procesarWebhook(Map<String, Object> body,
                                Map<String, String> headers) {

        @SuppressWarnings("unchecked")
        Map<String, Object> data = (Map<String, Object>) body.get("data");
        if (data == null || data.get("id") == null) return;

        String paymentId = data.get("id").toString();

        // 2️⃣ idempotencia
        if (pagoRepository.existsByPaymentId(paymentId)) {
            return;
        }

        // 3️⃣ consultar pago real
        Payment payment = obtenerPago(paymentId);

        // 4️⃣ guardar estado
        Pago pago = new Pago();
        pago.setPaymentId(paymentId);
        pago.setStatus(payment.getStatus());
        pago.setMonto(payment.getTransactionAmount());
        pago.setFecha(LocalDateTime.now());

        pagoRepository.save(pago);

        // 5️⃣ lógica de negocio
        switch (payment.getStatus()) {
            case "approved" -> {
                // habilitar curso / examen / suscripción
            }
            case "pending" -> {
                // dejar en espera
            }
            case "rejected" -> {
                // marcar como fallido
            }
        }
    }

    @Override
    public Payment obtenerPago(String paymentId) {
        try {
            PaymentClient client = new PaymentClient();
            return client.get(Long.parseLong(paymentId));
        } catch (MPApiException | MPException e) {
            throw new RuntimeException(
                "Error obteniendo pago de Mercado Pago. paymentId=" + paymentId,
                e
            );
        }
    }

}
