package com.referidos.demo.repository;

import com.referidos.demo.model.Referidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReferidosRepository extends JpaRepository<Referidos, Long> {
    boolean existsByCorreoAndCelular(String correo, String celular);

    List<Referidos> findByEmbajador_Id(Long embajadorId);

}
