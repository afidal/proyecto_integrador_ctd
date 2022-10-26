package com.example.ProyectoIntegradorGrupo2.emailsender;

public interface IEmailSenderService {
    void sendEmail(String to, String subject, String text);
}
