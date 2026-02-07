//***************************************************************************************
//
//   Filename: LoveNoteController.java
//   Author: Kyle McColgan
//   Date: 2 February 2026
//   Description: This file provides LoveNote CRUD endpoints.
//
//***************************************************************************************

package com.lovenotes.app.Controllers;

import com.lovenotes.app.Models.LoveNote;
import com.lovenotes.app.Models.User;
import com.lovenotes.app.Services.LoveNoteService;
import com.lovenotes.app.Services.UserService;
import com.lovenotes.app.payload.CreateLoveNoteDTO;
import com.lovenotes.app.security.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/notes")
public class LoveNoteController
{
    private final LoveNoteService loveNoteService;
    private final UserService userService;

    public LoveNoteController(LoveNoteService loveNoteService, UserService userService)
    {
        this.loveNoteService = loveNoteService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createNote(
            @AuthenticationPrincipal UserDetailsImpl principal,
            @RequestBody CreateLoveNoteDTO dto
    )
    {
        User user = resolveUser(principal);

        LoveNote note = loveNoteService.createNote(user.getId(), dto);

        return ResponseEntity.ok(Map.of(
                "url", "/note/" + note.getPublicToken()
        ));
    }

    @GetMapping("/public/{token}")
    public ResponseEntity<LoveNote> getPublicNote(@PathVariable String token)
    {
        return ResponseEntity.ok(loveNoteService.getByPublicToken(token));
    }

    @GetMapping
    public ResponseEntity<List<LoveNote>> getUserNotes(@AuthenticationPrincipal UserDetailsImpl principal)
    {
        User user = resolveUser(principal);
        return ResponseEntity.ok(loveNoteService.getNotesForUser(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoveNote> getUserNote(
            @AuthenticationPrincipal UserDetailsImpl principal,
            @PathVariable Integer id
    )
    {
        User user = resolveUser(principal);
        return ResponseEntity.ok(loveNoteService.getUserNoteById(user.getId(), id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoveNote> updateNote(
            @AuthenticationPrincipal UserDetailsImpl principal,
            @PathVariable Integer id,
            @RequestBody CreateLoveNoteDTO dto
    )
    {
        User user = resolveUser(principal);
        LoveNote updated = loveNoteService.updateNote(user.getId(), id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<LoveNote> deleteNote(
            @AuthenticationPrincipal UserDetailsImpl principal,
            @PathVariable Integer id
    )
    {
        User user = resolveUser(principal);
        loveNoteService.deleteNote(user.getId(), id);
        return ResponseEntity.noContent().build();
    }

    private User resolveUser(UserDetailsImpl principal)
    {
        return userService.findById(principal.getId())
                .orElseThrow(() -> new RuntimeException("User not found!"));
    }
}
