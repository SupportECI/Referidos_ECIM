package com.referidos.demo.service;

import com.referidos.demo.model.RolUsuario;
import com.referidos.demo.model.Usuarios;
import com.referidos.demo.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuarios registrarEmbajador (Usuarios usuarios) {
        usuarios.setNombre(limpiarTexto(usuarios.getNombre()));
        usuarios.setApellidos(limpiarTexto(usuarios.getApellidos()));

        if (usuarios.getCorreo() != null) {
            usuarios.setCorreo(limpiarTexto(usuarios.getCorreo()).toLowerCase());
        }
        if (usuarios.getCelular() != null) {
            usuarios.setCelular(usuarios.getCelular().trim());
        }
        if (usuarioRepository.existsByCorreo(usuarios.getCorreo())
                || usuarioRepository.existsByCelular(usuarios.getCelular()))
        {
            throw new RuntimeException("El correo o celular ya estan registrados");
        }
        String tokenSecreto = UUID.randomUUID().toString();
        usuarios.setTokenVerificacion(tokenSecreto);

        usuarios.setRol(RolUsuario.embajador);

        String encriptarPassword = passwordEncoder.encode(usuarios.getPassword());
        usuarios.setPassword(encriptarPassword);

        Usuarios nuevoUsuario = usuarioRepository.save(usuarios);

        emailService.enviarCorreoVerificacion(nuevoUsuario.getCorreo(), tokenSecreto);

        return nuevoUsuario;
    }

    public Usuarios login (Usuarios usuarios) {
        Optional<Usuarios> usuarioEncontrado = usuarioRepository.findByCorreo(usuarios.getCorreo());

        if (usuarioEncontrado.isEmpty()) {
            throw new RuntimeException("El correo no esta registrado");
        }

        Usuarios usuarioDB = usuarioEncontrado.get();

        if (!passwordEncoder.matches(usuarios.getPassword(), usuarioDB.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        if (!usuarioDB.isVerificado()){
            throw new RuntimeException("Correo no verificado");
        }

        return usuarioDB;
    }

    public List<Usuarios> obtenerUsuarios () {
        return usuarioRepository.findByRol(RolUsuario.embajador);
    }

    public String verificarCuenta(String token) {
        Optional<Usuarios> usuarioEncontrado = usuarioRepository.findByTokenVerificacion(token);

        if (usuarioEncontrado.isEmpty()){
            throw new RuntimeException("El enlace de verifacion es invalido o ya caduco");
        }

        Usuarios usuarios = usuarioEncontrado.get();

        if (usuarios.isVerificado()){
            throw new RuntimeException("Esta cuenta ya habia sido verificado anteriormente");
        }

        usuarios.setVerificado(true);

        usuarios.setTokenVerificacion(null);

        usuarioRepository.save(usuarios);

        return "Cuenta verificada con exito";
    }

    public String limpiarTexto(String input) {
        if (input == null) {
            return null;
        }

        return input.trim().replaceAll("<[^>]*>", "");
    }
}
