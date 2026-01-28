package com.example.Academy.resource;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.service.MercadoPagoService;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/pagos")
public class MercadoPagoResource {

    private final MercadoPagoService mercadoPagoService;


    public MercadoPagoResource(MercadoPagoService mercadoPagoService) {
        this.mercadoPagoService = mercadoPagoService;
    }

    @PostMapping("/crear")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponseDTO<String>> crearPago()
            throws MPException, MPApiException {

        String urlPago = mercadoPagoService.crearPreferencia();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponseDTO<>(
                        "Preferencia de pago creada correctamente",
                        urlPago
                ));
    }

    @GetMapping("/success")
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> pagoExitoso(
            @RequestParam Map<String, String> params) {

        return ResponseEntity.ok(
                new ApiResponseDTO<>(
                        "Pago aprobado correctamente",
                        params
                )
        );
    }


    @GetMapping("/failure")
    public ResponseEntity<ApiResponseDTO<Void>> pagoFallido() {

        return ResponseEntity.badRequest()
                .body(new ApiResponseDTO<>(
                        "El pago fue rechazado",
                        null
                ));
    }


    @GetMapping("/pending")
    public ResponseEntity<ApiResponseDTO<Void>> pagoPendiente() {

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(new ApiResponseDTO<>(
                        "El pago se encuentra pendiente de confirmación",
                        null
                ));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> recibirWebhook(
            @RequestBody Map<String, Object> body) {

        mercadoPagoService.procesarWebhook(body, null);
        return ResponseEntity.ok().build(); 
    }

    @PostMapping("/mercadoPago")
    public ResponseEntity<Void> recibirWebhook(@RequestBody Map<String, Object> body,
                                                @RequestHeader Map<String, String> headers) {

        System.out.println(" WEBHOOK RECIBIDO");
        System.out.println("Body: " + body);
        System.out.println("Headers: " + headers);

        return ResponseEntity.ok().build();
    }

}
