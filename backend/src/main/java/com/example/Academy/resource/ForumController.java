package com.example.Academy.resource;

import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;

import com.example.Academy.entity.Tema;
import com.example.Academy.entity.TipoReaccion;
import com.example.Academy.dto.CrearMensajeDTO;
import com.example.Academy.dto.CrearTemaDTO;
import com.example.Academy.dto.TemaResumenDTO;
import com.example.Academy.entity.Curso;
import com.example.Academy.entity.Persona;
import com.example.Academy.entity.Reaccion;
import com.example.Academy.entity.Mensaje;
import com.example.Academy.repository.TemaRepository;
import com.example.Academy.repository.CursoRepository;
import com.example.Academy.repository.MensajeRepository;
import com.example.Academy.repository.ReaccionRepository;
import com.example.Academy.security.UserDetailsImpl;


@RestController
@RequestMapping("/foro")
public class ForumController {

    private final TemaRepository temaRepository;
    private final CursoRepository cursoRepository;
    private final MensajeRepository mensajeRepository;
    private final ReaccionRepository reaccionRepository;

    public ForumController(TemaRepository temaRepository,
                           CursoRepository cursoRepository,
                           MensajeRepository mensajeRepository,
                           ReaccionRepository reaccionRepository) {
        this.temaRepository = temaRepository;
        this.cursoRepository = cursoRepository;
        this.mensajeRepository = mensajeRepository;
        this.reaccionRepository = reaccionRepository;
    }

    // TRAER TEMAS
    @GetMapping("/cursos/{cursoId}/temas")
    public List<TemaResumenDTO> listarTemas(@PathVariable Long cursoId) {

        return temaRepository
                .findByCursoIdAndEliminadoFalseOrderByFijadoDescFechaCreacionDesc(cursoId)
                .stream()

                .sorted((t1, t2) -> {

                    // primero los fijados
                    if (t1.isFijado() != t2.isFijado()) {
                        return t2.isFijado() ? 1 : -1;
                    }

                    LocalDateTime fecha1 = t1.getMensajes().isEmpty()
                            ? t1.getFechaCreacion()
                            : t1.getMensajes()
                                .get(t1.getMensajes().size() - 1)
                                .getFecha();

                    LocalDateTime fecha2 = t2.getMensajes().isEmpty()
                            ? t2.getFechaCreacion()
                            : t2.getMensajes()
                                .get(t2.getMensajes().size() - 1)
                                .getFecha();

                    return fecha2.compareTo(fecha1);
                })

                .map(tema -> {

                    int cantidadMensajes = tema.getMensajes().size();

                    LocalDateTime ultimoMensaje = null;
                    String ultimoAutor = null;

                    if (cantidadMensajes > 0) {

                        Mensaje ultimo =
                            tema.getMensajes().get(cantidadMensajes - 1);

                        ultimoMensaje = ultimo.getFecha();
                        ultimoAutor = ultimo.getAutor().getNombre();
                    }

                    return new TemaResumenDTO(
                            tema.getId(),
                            tema.getTitulo(),
                            tema.getAutor().getNombre(),
                            tema.getFechaCreacion(),
                            cantidadMensajes,
                            ultimoMensaje,
                            ultimoAutor,
                            tema.isFijado(),
                            tema.isCerrado()
                    );
                })

                .toList();
    }

    // CREAR TEMA
    @PostMapping("/cursos/{cursoId}/temas")
    public void crearTema(
            @PathVariable Long cursoId,
            @RequestBody CrearTemaDTO dto) {

        Optional<Curso> cursoOptional = cursoRepository.findById(cursoId);

        if (cursoOptional.isEmpty()) {
            throw new RuntimeException("Curso no encontrado");
        }

        Curso curso = cursoOptional.get();
        Persona autor = obtenerPersonaLogueada();

        // Crear tema
        Tema tema = new Tema();
        tema.setTitulo(dto.getTitulo());
        tema.setCurso(curso);
        tema.setAutor(autor);
        tema.setFechaCreacion(LocalDateTime.now());

        temaRepository.save(tema);

        // Crear primer mensaje
        Mensaje mensaje = new Mensaje();
        mensaje.setContenido(dto.getContenido());
        mensaje.setTema(tema);
        mensaje.setAutor(autor);
        mensaje.setFecha(LocalDateTime.now());

        mensajeRepository.save(mensaje);
    }

    // TRAER MENSAJES DE UN TEMA 
    @GetMapping("/temas/{temaId}/mensajes")
    public Page<Mensaje> listarMensajes(
            @PathVariable Long temaId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        return mensajeRepository.findByTemaIdOrderByFechaAsc(
                temaId,
                PageRequest.of(page, size)
        );
    }

    // CREAR MENSAJE
    @PostMapping("/temas/{temaId}/mensajes")
    public void crearMensaje(
            @PathVariable Long temaId,
            @RequestBody CrearMensajeDTO dto) {

        Optional<Tema> temaOptional = temaRepository.findById(temaId);

        if (temaOptional.isEmpty()) {
            throw new RuntimeException("Tema no encontrado");
        }

        Tema tema = temaOptional.get();

        if (tema.isCerrado()) {
            throw new RuntimeException("El tema está cerrado");
        }

        Mensaje mensaje = new Mensaje();

        mensaje.setContenido(dto.getContenido());
        mensaje.setTema(tema);
        mensaje.setFecha(LocalDateTime.now());
        mensaje.setAutor(obtenerPersonaLogueada());

        mensajeRepository.save(mensaje);
    }

    // BORRAR MENSAJE
    @DeleteMapping("/mensajes/{mensajeId}")
    public void borrarMensaje(@PathVariable Long mensajeId) {
        mensajeRepository.deleteById(mensajeId);
    }

    // BORRAR TEMA (SOFT DELETE)
    @DeleteMapping("/tema/{temaId}")
    public ResponseEntity<?> eliminarTema(@PathVariable Long temaId) {

        Tema tema = temaRepository.findById(temaId)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        tema.setEliminado(true);

        temaRepository.save(tema);

        return ResponseEntity.ok("Tema eliminado");
    }

    // CERRAR O ABRIR TEMA
    @PatchMapping("/tema/{id}/cerrar")
    public ResponseEntity<?> cerrarTema(@PathVariable Long id) {

        Tema tema = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        tema.setCerrado(!tema.isCerrado());

        temaRepository.save(tema);

        return ResponseEntity.ok("Estado del tema actualizado");
    }

    //FIJAR O DEJAR DE FIJAR TEMA
    @PatchMapping("/tema/{id}/fijar")
    public ResponseEntity<?> fijarTema(@PathVariable Long id) {

        Tema tema = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        tema.setFijado(!tema.isFijado());

        temaRepository.save(tema);

        return ResponseEntity.ok(Map.of(
            "fijado", tema.isFijado()
        ));
    }


    // REACCIONAR A UN MENSAJE
    @PostMapping("/mensajes/{mensajeId}/reacciones/{tipo}")
    public void reaccionar(
            @PathVariable Long mensajeId,
            @PathVariable TipoReaccion tipo) {

        Persona persona = obtenerPersonaLogueada();

        Optional<Reaccion> existente =
            reaccionRepository.findByMensajeIdAndPersonaId(
                mensajeId,
                persona.getId()
            );

        if (existente.isPresent()) {

            Reaccion reaccion = existente.get();

            if (reaccion.getTipo() == tipo) {
                reaccionRepository.delete(reaccion);
            } else {
                reaccion.setTipo(tipo);
                reaccionRepository.save(reaccion);
            }

            return;
        }

        Mensaje mensaje = mensajeRepository.findById(mensajeId)
            .orElseThrow(() -> new RuntimeException("Mensaje no encontrado"));

        Reaccion reaccion = new Reaccion();
        reaccion.setMensaje(mensaje);
        reaccion.setPersona(persona);
        reaccion.setTipo(tipo);
        reaccion.setFecha(LocalDateTime.now());

        reaccionRepository.save(reaccion);
    }

    // SACAR REACCION
    @DeleteMapping("/mensajes/{mensajeId}/reacciones")
    public void quitarReaccion(@PathVariable Long mensajeId) {

        Persona persona = obtenerPersonaLogueada();

        reaccionRepository
                .findByMensajeIdAndPersonaId(mensajeId, persona.getId())
                .ifPresent(reaccionRepository::delete);
    }

    // EDITAR MENSAJE
    @PutMapping("/mensajes/{mensajeId}")
    public void editarMensaje(
            @PathVariable Long mensajeId,
            @RequestBody CrearMensajeDTO dto) {

        Persona persona = obtenerPersonaLogueada();

        Mensaje mensaje = mensajeRepository.findById(mensajeId)
            .orElseThrow(() -> new RuntimeException("Mensaje no encontrado"));

        if (!mensaje.getAutor().getId().equals(persona.getId())) {
            throw new RuntimeException("No podés editar este mensaje");
        }

        mensaje.setContenido(dto.getContenido());
        mensaje.setEditado(true);

        mensajeRepository.save(mensaje);
    }

    // EDITAR TÍTULO DEL TEMA
    @PutMapping("/tema/{id}")
    public ResponseEntity<?> editarTitulo(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Tema tema = temaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tema no encontrado"));

        tema.setTitulo(body.get("titulo"));
        tema.setEditado(true);

        temaRepository.save(tema);

        return ResponseEntity.ok().build();
    }

    // OBTENER PERSONA LOGUEADA
    private Persona obtenerPersonaLogueada() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl userDetails =
                (UserDetailsImpl) authentication.getPrincipal();

        return userDetails.getPersona();
    }

}