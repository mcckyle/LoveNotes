//***************************************************************************************
//
//     Filename: LoveNoteService.java
//     Author: Kyle McColgan
//     Date: 12 February 2026
//     Description: This file provides LoveNote business logic.
//
//***************************************************************************************

package com.lovenotes.app.Services;

import com.lovenotes.app.Data.LoveNoteRepository;
import com.lovenotes.app.Data.UserRepository;
import com.lovenotes.app.Models.LoveNote;
import com.lovenotes.app.Models.User;
import com.lovenotes.app.payload.CreateLoveNoteDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class LoveNoteService
{
    private final LoveNoteRepository repository;
    private final UserRepository userRepository;
    private final MailService mailService;

    public LoveNote createNote(Integer userId, CreateLoveNoteDTO dto)
    {
        User sender = userRepository.findById(userId)
                .orElseThrow();

        LoveNote note = new LoveNote();
        note.setSender(sender);
        note.setTitle(dto.getTitle());
        note.setMessage(dto.getMessage());
        note.setRecipientName(dto.getRecipientName());
        note.setPublicToken(UUID.randomUUID().toString());
        note.setCreatedAt(Instant.now());
        note.setExpiresAt(Instant.now().plus(30, ChronoUnit.DAYS));

        return repository.save(note);
    }

    private LoveNote createNoteAndNotify(LoveNote note, String recipientEmail)
    {
        //Save the note to the database (JPA).
        LoveNote savedNote = repository.save(note);

        if ( (recipientEmail != null) && (!recipientEmail.isBlank()) )
        {
            String shareUrl = "https://your-domain.com/note/" + savedNote.getPublicToken();
            mailService.sendNoteShareEmail(recipientEmail, savedNote.getTitle(), shareUrl);
        }

        return savedNote;
    }

    public LoveNote getByPublicToken(String token)
    {
        return repository.findByPublicToken(token)
                .orElseThrow(() -> new RuntimeException("Note not found!"));
    }

    public List<LoveNote> getNotesForUser(Integer userId)
    {
        return repository.findAllBySenderIdOrderByCreatedAtDesc(userId);
    }

    public LoveNote getUserNoteById(Integer userId, Integer noteId)
    {
        return repository.findByIdAndSenderId(noteId, userId)
                .orElseThrow(() -> new RuntimeException("Note not found!"));
    }

    public LoveNote updateNote(Integer userId, Integer noteId, CreateLoveNoteDTO dto)
    {
        LoveNote note = getUserNoteById(userId, noteId);

        note.setTitle(dto.getTitle());
        note.setMessage(dto.getMessage());
        note.setRecipientName(dto.getRecipientName());

        return repository.save(note);
    }

    public void deleteNote(Integer userId, Integer noteId)
    {
        LoveNote note = getUserNoteById(userId, noteId);
        repository.delete(note);
    }
}
