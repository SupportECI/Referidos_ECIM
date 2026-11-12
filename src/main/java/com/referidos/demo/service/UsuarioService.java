package com.referidos.demo.service;

import com.referidos.demo.model.RolUsuario;
import com.referidos.demo.model.Usuarios;
import com.referidos.demo.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmailService emailService;

    public Usuarios registrarEmbajador (Usuarios usuarios) {
        if (usuarioRepository.existsByCorreo(usuarios.getCorreo())) {
            throw new RuntimeException("El correo ya esta registrado");
        }
        String tokenSecreto = UUID.randomUUID().toString();
        usuarios.setTokenVerificacion(tokenSecreto);

        System.out.println("LINK SIMULADO DE CORREO: http://localhost:5173/verificar?token=" + tokenSecreto);

        usuarios.setRol(RolUsuario.embajador);

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

        if (!usuarios.getPassword().equals(usuarioDB.getPassword())){
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
}
