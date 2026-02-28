//***************************************************************************************
//
//     Filename: MailService.java
//     Author: Kyle McColgan
//     Date: 12 February 2026
//     Description: This file provides LoveNote business logic for mail delivery.
//
//***************************************************************************************

package com.lovenotes.app.Services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService
{
    private final JavaMailSender mailSender;

    @Value("${lovenotes.mail.from}")
    private String from;

    public void sendNoteShareEmail(String to, String noteTitle, String noteUrl)
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject("A Love Note for You");

        System.out.println("About to send email to: " + to);

        String body = """
                Hello,
                
                %s
                
                You can view it here: %s
                
                With love,
                LoveNotes
                """.formatted(
                        noteTitle != null && !noteTitle.isBlank() ? "Title: " + noteTitle : "Someone has shared a love note with you",
                        noteUrl
        );

        mailSender.send(message);
        System.out.println("Sent email to: " + to);
    }

    public void sendHtmlNoteEmail(String to, String noteTitle, String noteUrl) throws MessagingException
    {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom(from);
        helper.setTo(to);
        helper.setSubject("A Love Note for You");

        String html = """
                <html>
                <body style="font-family: sans-serif;line-height: 1.6;color: #333;">
                  <h2 style="color: #4b7bfd;">%s</h2>
                  <p>Someone sent you a private note.</p>
                  <p><a href="%s" style="background:#4b7bfd;color: #fff;padding: 0.5rem 1rem;border-radius:8px;text-decoration:none;">View Note</a></p>
                  <p style="font-size:0.85rem;color: #fff;">With love, LoveNotes</p>
                </body>
                </html>
                """.formatted(
                noteTitle != null && !noteTitle.isBlank() ? "Title: " + noteTitle : "You've received a love note!",
                noteUrl
        );

        helper.setText(html, true);
        mailSender.send(message);
    }
}
