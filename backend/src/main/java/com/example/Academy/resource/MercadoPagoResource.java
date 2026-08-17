package com.example.Academy.resource;

import java.util.List;
import java.util.Map;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Academy.dto.ApiResponseDTO;
import com.example.Academy.dto.PagoCuotaDTO;
import com.example.Academy.dto.PagoRequestDTO;
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
    public ResponseEntity<ApiResponseDTO<String>> crearPago() {
        try {
            String urlPago = mercadoPagoService.crearPreferencia();

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDTO<>(
                            "Preferencia de pago creada correctamente",
                            urlPago
                    ));
        } catch (MPApiException e) {
            System.out.println("Error MPApiException: " + e.getMessage());
            System.out.println("Status: " + e.getStatusCode());
            System.out.println("Response: " + e.getApiResponse());
            e.printStackTrace();
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponseDTO<>(
                            "Error en Mercado Pago: " + e.getMessage(),
                            null
                    ));
        } catch (Exception e) {
            System.out.println("Error general: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(
                            "Error: " + e.getMessage(),
                            null
                    ));
        }
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
        public ResponseEntity<Void> procesarWebhook(@RequestBody Map<String, Object> payload) {
                try {
                        mercadoPagoService.procesarWebhook(payload);
                        return ResponseEntity.ok().build();
                } catch (MPException | MPApiException e) {
                         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }
        }
        

    @PostMapping("/mercadoPago")
    public ResponseEntity<Void> recibirWebhook(@RequestBody Map<String, Object> body,
                                                @RequestHeader Map<String, String> headers) {

        System.out.println(" WEBHOOK RECIBIDO");
        System.out.println("Body: " + body);
        System.out.println("Headers: " + headers);

        return ResponseEntity.ok().build();
    }


    @PostMapping("/cuponera")
    public ResponseEntity<ApiResponseDTO<List<String>>> crearCuponera(@RequestBody PagoRequestDTO dto){
        System.out.println("Endpoint /pagos/cuponera llamado con dto: " + dto);
        try {
                List<String> urls = mercadoPagoService.crearCuponera(dto);
                System.out.println("Cuponera creada exitosamente");

                return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDTO<>("Cuponera creada correctamente", urls));


        } catch (MPException | MPApiException e) {
                System.out.println("Error con MercadoPago: " + e.getMessage());
                System.out.println("Status: " + (e instanceof MPApiException ? ((MPApiException) e).getStatusCode() : "N/A"));
                if (e instanceof MPApiException && ((MPApiException) e).getApiResponse() != null) {
                        System.out.println("Response: " + ((MPApiException) e).getApiResponse().getContent());
                }
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponseDTO<>("Error con MercadoPago: " + e.getMessage(), null));
        } catch (Exception e) {
                System.out.println("Error general: " + e.getMessage());
                if (e instanceof org.springframework.web.server.ResponseStatusException) {
                        org.springframework.web.server.ResponseStatusException rse = (org.springframework.web.server.ResponseStatusException) e;
                        return ResponseEntity.status(rse.getStatusCode()).body(new ApiResponseDTO<>(rse.getReason(), null));
                }
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponseDTO<>("Error: " + e.getMessage(), null));
        }
    }


    @GetMapping("/alumno/{id}")
    public ResponseEntity<ApiResponseDTO<List<PagoCuotaDTO>>> obtenerPagosPorAlumno(@PathVariable Long id){
        List<PagoCuotaDTO> pagos = mercadoPagoService.obtenerPagosPorAlumno(id);

        return ResponseEntity.ok(new ApiResponseDTO<>("Cuotas del alumno obtenidas correctamente", pagos));
    }
    
    @GetMapping("/acreditados")
    public ResponseEntity<ApiResponseDTO<List<PagoCuotaDTO>>> obtenerPagosAcreditados() {
        List<PagoCuotaDTO> pagos = mercadoPagoService.obtenerPagosAcreditados();

        return ResponseEntity.ok(new ApiResponseDTO<>("Ultimos pagos acreditados", pagos));
    }
    

}
