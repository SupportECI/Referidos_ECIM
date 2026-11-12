package com.referidos.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table (name = "referidos")
public class Referidos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apaterno;

    @Column(nullable = false)
    private String amaterno;

    @Column(nullable = false)
    private String celular;

    @Column(nullable = false)
    private String correo;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false)
    private String modalidad;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Idioma idioma;

    @ManyToOne
    @JoinColumn(name = "embajador_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Usuarios embajador;

    @Column(nullable = false)
    private String estatus = "pendiente";

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    @PrePersist
    public void asignarFecha() {
        this.fechaRegistro = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApaterno() {
        return apaterno;
    }

    public void setApaterno(String apaterno) {
        this.apaterno = apaterno;
    }

    public String getAmaterno() {
        return amaterno;
    }

    public void setAmaterno(String amaterno) {
        this.amaterno = amaterno;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setModalidad(String modalidad) {
        this.modalidad = modalidad;
    }

    public Idioma getIdioma() {
        return idioma;
    }

    public void setIdioma(Idioma idioma) {
        this.idioma = idioma;
    }

    public Usuarios getEmbajador() {
        return embajador;
    }

    public void setEmbajador(Usuarios embajador) {
        this.embajador = embajador;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public LocalDate getFecharegistro() {
        return fechaRegistro;
    }

    public void setFecharegistro(LocalDate fecharegistro) {
        this.fechaRegistro = fecharegistro;
    }
}
