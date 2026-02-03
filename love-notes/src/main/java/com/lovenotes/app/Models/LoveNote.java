//***************************************************************************************
//
//   Filename: LoveNote.java
//   Author: Kyle McColgan
//   Date: 31 January 2026
//   Description: This file contains the LoveNote Entity class definition.
//
//***************************************************************************************

package com.lovenotes.app.Models;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Objects;

@Entity
public class LoveNote
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    private User sender;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String recipientName;

    @Column(unique = true, nullable = false)
    private String publicToken;

    private Instant createdAt;

    private Instant expiresAt;

    private boolean deleted = false;

    public LoveNote(User sender,
                    String title,
                    String message,
                    String recipientName,
                    String publicToken,
                    Instant createdAt,
                    Instant expiresAt,
                    boolean deleted
    )
    {
        this.sender = sender;
        this.title = title;
        this.message = message;
        this.recipientName = recipientName;
        this.publicToken = publicToken;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.deleted = deleted;
    }

    public LoveNote() { }

    public Integer getId() {
        return id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getPublicToken() {
        return publicToken;
    }

    public void setPublicToken(String publicToken) {
        this.publicToken = publicToken;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @Override
    public boolean equals(Object o)
    {
        if ( (o == null) || (getClass() != o.getClass()) )
        {
            return false;
        }

        LoveNote loveNote = (LoveNote) o;
        return Objects.equals(id, loveNote.id);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(id);
    }
}
