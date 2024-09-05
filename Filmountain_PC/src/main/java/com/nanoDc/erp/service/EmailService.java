package com.nanoDc.erp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String[] to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);  // 다수의 이메일 주소로 전송
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
}