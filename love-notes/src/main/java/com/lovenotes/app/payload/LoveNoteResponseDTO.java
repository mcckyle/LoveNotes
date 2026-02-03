//***************************************************************************************
//
//     Filename: LoveNoteResponseDTO.java
//     Author: Kyle McColgan
//     Date: 31 January 2026
//     Description: This file provides LoveNote data transfer formatting.
//
//***************************************************************************************

package com.lovenotes.app.payload;

public class LoveNoteResponseDTO
{
    private String title;
    private String message;
    private String recipientName;
    private String publicUrl;

    public LoveNoteResponseDTO() {}

    public LoveNoteResponseDTO(String title, String message, String recipientName, String publicUrl)
    {
        this.title = title;
        this.message = message;
        this.recipientName = recipientName;
        this.publicUrl = publicUrl;
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

    public String getPublicUrl() {
        return publicUrl;
    }

    public void setPublicUrl(String publicUrl) {
        this.publicUrl = publicUrl;
    }
}
