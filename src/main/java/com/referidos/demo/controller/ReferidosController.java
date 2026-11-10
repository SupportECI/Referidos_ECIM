package com.referidos.demo.controller;

import com.referidos.demo.model.Referidos;
import com.referidos.demo.model.Usuarios;
import com.referidos.demo.service.ReferidosService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/referidos")
@CrossOrigin(origins = "http://localhost:5173")
public class ReferidosController {
    @Autowired
    private ReferidosService referidosService;

    @PostMapping("/referral")
    public ResponseEntity<?> anadirReferido(@RequestBody Referidos referidos){
        try {
            Referidos nuevoReferido = referidosService.anadirReferido(referidos);
            return new ResponseEntity<>(nuevoReferido, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/embajador/{id}")
    public ResponseEntity<List<Referidos>> mostrarReferidos(@PathVariable("id") Long id) {
        try {
            List<Referidos> lista = referidosService.obtenerPorEmbajador(id);
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}/estatus")
    public ResponseEntity<?> cambiarEstatus(
            @PathVariable Long id,
            @RequestBody Map<String, String>
            body
    ) {
        try {
         String nuevoEstatus = body.get("estatus");

         Referidos actualizado = referidosService.cambiarEstatus(id, nuevoEstatus);

         return new ResponseEntity<>(actualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
