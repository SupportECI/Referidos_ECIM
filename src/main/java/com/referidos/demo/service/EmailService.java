package com.referidos.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender meilSender;

    public void enviarCorreoVerificacion(String correoDestino, String token){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("zabdilopez187@gmail.com");
        message.setTo(correoDestino);
        message.setSubject("Verifica tu cuenta de embajador");

        String linkAcceso = "http://localhost:5173/verificar?token=" + token;

        message.setText("Hola!\n\n"
                + "Gracias por registrarte. Para activar tu cuenta y acceder al dashboard, "
                + "por favor haz clic en el siguiente enlace de verificación:\n\n"
                + linkAcceso + "\n\n"
                + "Si tú no solicitaste esta cuenta, puedes ignorar este correo de forma segura.");

        meilSender.send(message);
    }
}
