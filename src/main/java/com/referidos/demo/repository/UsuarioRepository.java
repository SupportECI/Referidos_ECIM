package com.referidos.demo.repository;

import com.referidos.demo.model.RolUsuario;
import com.referidos.demo.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuarios, Long> {
    boolean existsByCorreo(String correo);

    Optional<Usuarios> findByCorreo(String correo);

    List<Usuarios> findByRol(RolUsuario rol);

    Optional<Usuarios> findByTokenVerificacion(String tokenVerificacion);
}
