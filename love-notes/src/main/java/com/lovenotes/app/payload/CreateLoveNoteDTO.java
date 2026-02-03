//***************************************************************************************
//
//     Filename: CreateLoveNoteDTO.java
//     Author: Kyle McColgan
//     Date: 31 January 2026
//     Description: This file provides LoveNote data transfer formatting.
//
//***************************************************************************************

package com.lovenotes.app.payload;

public class CreateLoveNoteDTO
{
    private String title;
    private String message;
    private String recipientName;

    public CreateLoveNoteDTO() {}

    public CreateLoveNoteDTO(String title, String message, String recipientName)
    {
        this.title = title;
        this.message = message;
        this.recipientName = recipientName;
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
}
