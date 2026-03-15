package com.example.Academy.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.Academy.dto.PagoCuotaDTO;
import com.example.Academy.dto.PagoRequestDTO;
import com.example.Academy.entity.Alumno;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Pago;
import com.example.Academy.repository.AlumnoRepository;
import com.example.Academy.repository.CursoRepository;
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

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

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
public void procesarWebhook(Map<String, Object> payload) throws MPApiException, MPException {
    System.out.println("Webhook recibido: " + payload);

    String topic = (String) payload.get("topic");
    String resource = String.valueOf(payload.get("resource"));

    if ("payment".equals(topic)) {
        try {
            Long paymentId = Long.valueOf(resource);
            PaymentClient paymentClient = new PaymentClient();
            Payment payment = paymentClient.get(paymentId);

            if (payment == null) {
                System.out.println("Pago no encontrado en Mercado Pago con id: " + paymentId);
                return;
            }

            // Recupero mi identificador propio desde metadata
            String pagoIdStr =payment.getExternalReference();
            if (pagoIdStr == null) {
                System.out.println("No se encontró metadata con pago_id");
                return;
            }

            Pago pago = pagoRepository.findByExternalReference(pagoIdStr);
            if (pago == null) {
                System.out.println("Pago no encontrado en DB con id interno: " + pagoIdStr);
                return;
            }

            // Actualizo con el paymentId real y el estado
            pago.setPaymentId(String.valueOf(paymentId));
            pago.setStatus(payment.getStatus());
            pago.setFechaDePago(LocalDateTime.now());
            pago.setRawStatus(payment.getStatusDetail());
            pagoRepository.save(pago);

            System.out.println("Pago actualizado correctamente: " + pago.getId());

        } catch (Exception e) {
            System.out.println("Error procesando webhook: " + e.getMessage());
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

    @Override
    public List<String> crearCuponera(PagoRequestDTO pagoDTO) throws MPException, MPApiException{

        
        Curso curso = cursoRepository.findById(pagoDTO.getCurso_id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Curso no encontrado"));

        Alumno alumno = alumnoRepository.findById(pagoDTO.getAlumno_id())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Alumno no encontrado"));

        boolean existeCuponera = pagoRepository.existsByAlumnoIdAndCursoId(pagoDTO.getAlumno_id(), pagoDTO.getCurso_id());

        if(existeCuponera){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una cuponera para este alumno y curso.");
        }


        PreferenceClient client = new PreferenceClient();
        List <String> urls = new ArrayList<>();

        System.out.print("Pago DTO" + pagoDTO.getAlumno_id() + pagoDTO.getCurso_id());



        Integer cantMeses = mesesEntreFechas(curso.getFechaInicio(), curso.getFechaFin());
        System.out.println("Cantidad de meses: " + cantMeses);


        for(int i=1; i<=cantMeses; i++){
            PreferenceItemRequest item = PreferenceItemRequest.builder()
                .title(curso.getNombre() + " - Cuota " + i)
                .quantity(1)
                .unitPrice(curso.getCosto())
                .currencyId("ARS")
                .build();

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                .success("https://merited-lakisha-monoblastic.ngrok-free.dev/pagos")
                .failure("https://merited-lakisha-monoblastic.ngrok-free.dev/pagos/failure")
                .pending("https://merited-lakisha-monoblastic.ngrok-free.dev/pagos/pending")
                .build();

            String externalRef = UUID.randomUUID().toString();


            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(List.of(item))
                .externalReference(externalRef)
                .backUrls(backUrls)
                .notificationUrl("https://merited-lakisha-monoblastic.ngrok-free.dev/pagos/webhook")
                .autoReturn("all")
                .build();

            Preference preference = client.create(preferenceRequest);
            urls.add(preference.getInitPoint());

            Pago pago = new Pago();
            pago.setPreferenceId(preference.getId());
            pago.setMonto(curso.getCosto());
            pago.setStatus("pending");
            pago.setExternalReference(externalRef);
            pago.setFecha(LocalDateTime.now());
            pago.setCurrency("ARS");
            pago.setAlumno(alumno);
            pago.setCurso(curso);
            pago.setCantCuotas(cantMeses);
            pago.setNumeroCuota(i);
            pago.setInitPoint(preference.getInitPoint());
            pagoRepository.save(pago);
        }

        return urls;
    }


    public List<PagoCuotaDTO> obtenerPagosPorAlumno(Long alumnoId){
        return pagoRepository.findByAlumnoId(alumnoId).stream()
            .map(pago -> {
                PagoCuotaDTO dto = new PagoCuotaDTO();
                dto.setNumeroCuota(pago.getNumeroCuota());
                dto.setStatus(pago.getStatus());
                dto.setInitPoint(pago.getInitPoint());
                dto.setMonto(pago.getMonto());
                dto.setNombreCurso(pago.getCurso().getNombre());
                dto.setCurrency(pago.getCurrency());
                dto.setFecha(pago.getFecha());
                return dto;
            }).toList();
    }



    public int mesesEntreFechas(LocalDate fechaInicio, LocalDate fechaFin){
        Period periodo = Period.between(fechaInicio, fechaFin);
        int mesesTotales = periodo.getYears()*12 + periodo.getMonths();

        return mesesTotales;
    }

    public List<PagoCuotaDTO> obtenerPagosAcreditados(){
        return pagoRepository.findByRawStatusOrderByFechaDePagoDesc("accredited").stream()
        .map(pago -> {
            PagoCuotaDTO dto = new PagoCuotaDTO();
            dto.setNumeroCuota(pago.getNumeroCuota());
            dto.setStatus(pago.getStatus());
            dto.setMonto(pago.getMonto());
            dto.setNombreAlumno(pago.getAlumno().getNombre());
            dto.setCantCuotas(pago.getCantCuotas());
            dto.setNombreCurso(pago.getCurso().getNombre());
            dto.setFechaPago(pago.getFechaDePago());
            dto.setNivel(pago.getCurso().getNiveles().get(0).getNombre());
            return dto;
        }).toList();
    }

}
