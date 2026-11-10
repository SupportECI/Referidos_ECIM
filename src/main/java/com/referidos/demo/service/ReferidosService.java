package com.referidos.demo.service;

import com.referidos.demo.model.Referidos;
import com.referidos.demo.repository.ReferidosRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReferidosService {
    @Autowired
    private ReferidosRepository referidosRepository;

    public Referidos anadirReferido (Referidos referidos) {
        if (referidosRepository.existsByCorreoAndCelular(referidos.getCorreo(), referidos.getCelular())){
            throw new RuntimeException("Este referido ya ha sido agregado");
        }
        return referidosRepository.save(referidos);
    }

    public List<Referidos> obtenerPorEmbajador(Long id) {
        return referidosRepository.findByEmbajador_Id(id);
    }

    public Referidos cambiarEstatus (Long id, String nuevoEstatus) {
        Referidos referido = referidosRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Referido no encontrado con ID" + id));

        referido.setEstatus(nuevoEstatus);

        return referidosRepository.save(referido);
    }
}
