//***************************************************************************************
//
//     Filename: LoveNoteService.java
//     Author: Kyle McColgan
//     Date: 2 February 2026
//     Description: This file provides LoveNote business logic.
//
//***************************************************************************************

package com.lovenotes.app.Services;

import com.lovenotes.app.Data.LoveNoteRepository;
import com.lovenotes.app.Data.UserRepository;
import com.lovenotes.app.Models.LoveNote;
import com.lovenotes.app.Models.User;
import com.lovenotes.app.payload.CreateLoveNoteDTO;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class LoveNoteService
{
    private final LoveNoteRepository repository;
    private final UserRepository userRepository;

    public LoveNoteService(LoveNoteRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

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
