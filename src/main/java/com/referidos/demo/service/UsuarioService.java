package com.referidos.demo.service;

import com.referidos.demo.model.RolUsuario;
import com.referidos.demo.model.Usuarios;
import com.referidos.demo.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuarios registrarEmbajador (Usuarios usuarios) {
        if (usuarioRepository.existsByCorreo(usuarios.getCorreo())) {
            throw new RuntimeException("El correo ya esta registrado");
        }
        usuarios.setRol(RolUsuario.embajador);
        return usuarioRepository.save(usuarios);
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

        return usuarioDB;
    }

    public List<Usuarios> obtenerUsuarios () {
        return usuarioRepository.findByRol(RolUsuario.embajador);
    }
}
