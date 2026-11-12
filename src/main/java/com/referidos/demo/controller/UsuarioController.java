package com.referidos.demo.controller;

import com.referidos.demo.model.Usuarios;
import com.referidos.demo.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<?> registrarEmbajador(@Valid @RequestBody Usuarios usuarios){
        try {
            Usuarios nuevoUsuario = usuarioService.registrarEmbajador(usuarios);
            return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestBody Usuarios usuarios){
        try {
            Usuarios usuarioLogueado = usuarioService.login(usuarios);
            return new ResponseEntity<>(usuarioLogueado, HttpStatus.OK);

        } catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/obtener")
    public ResponseEntity<List<Usuarios>> embajadores() {
        try {
            List<Usuarios> lista = usuarioService.obtenerUsuarios();
            return new ResponseEntity<>(lista, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/verificar")
    public ResponseEntity<?> verificarCuenta(@RequestParam String token){
        try {
            String mensaje = usuarioService.verificarCuenta(token);
            return new ResponseEntity<>(mensaje, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
