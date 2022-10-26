package com.example.ProyectoIntegradorGrupo2.emailsender;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailSenderService implements IEmailSenderService{
    private final JavaMailSender mailSender;

    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
/*
    @Override
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("digitalbookinggrupo2@gmail.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(text);

        this.mailSender.send(simpleMailMessage);
    }*/

    @Override
    public void sendEmail(String to, String subject, String text) {
       try{
           MimeMessage mimeMailMessage = mailSender.createMimeMessage();
           MimeMessageHelper helper = new MimeMessageHelper(mimeMailMessage,"utf-8");
           helper.setText(text,true);
           helper.setTo(to);
           helper.setSubject(subject);
           helper.setFrom("digitalbookingg2@gmail.com");
           mailSender.send(mimeMailMessage);

       }catch(MessagingException e){
           throw new IllegalStateException("El envío no ha podido realizarse");
       }
    }
}
