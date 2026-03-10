package com.example.Academy.dto;

import java.time.LocalDateTime;

public class TemaResumenDTO {

    private Long id;
    private String titulo;
    private String autor;
    private LocalDateTime fechaCreacion;
    private int cantidadMensajes;
    private LocalDateTime ultimoMensaje;
    private String ultimoAutor;
    private boolean fijado;
    private boolean cerrado;

    public TemaResumenDTO(
            Long id,
            String titulo,
            String autor,
            LocalDateTime fechaCreacion,
            int cantidadMensajes,
            LocalDateTime ultimoMensaje,
            String ultimoAutor,
            boolean fijado,
            boolean cerrado) {

        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.fechaCreacion = fechaCreacion;
        this.cantidadMensajes = cantidadMensajes;
        this.ultimoMensaje = ultimoMensaje;
        this.ultimoAutor = ultimoAutor;
        this.fijado = fijado;
        this.cerrado = cerrado;
    }

    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getAutor() { return autor; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public int getCantidadMensajes() { return cantidadMensajes; }
    public LocalDateTime getUltimoMensaje() { return ultimoMensaje; }
    public String getUltimoAutor() { return ultimoAutor; }
    public boolean isFijado() { return fijado; }
    public boolean isCerrado() { return cerrado; }
    
}