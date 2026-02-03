//****************************************************************************************
// Filename: NoteService.js
// Date: 2 February 2026
// Author: Kyle McColgan
// Description: This file contains the frontend NoteService for LoveNotes.
//****************************************************************************************

import request from "../api/apiClient";

/**
 * Create a new love note.
 *
 * @param {Object} params
 * @param {string} params.title
 * @param {string} params.message - Note content
 * @param {string} params.recipientName
 * @param {string} token - JWT access token
 *
 * @returns {Promise<{ url: string }>}
 */
export async function createNote({ title, message, recipientName }, token)
{
	if ( ( ! message) || ( ! message.trim()) )
	{
		throw new Error("Note message is required!");
	}
	
	return request("", {
		method: "POST",
		token,
		body: {
			title: title?.trim() || null,
			message: message.trim(),
			recipientName: recipientName?.trim() || null,
		},
	});
}

export async function getUserNotes(token)
{
	return request("", { method: "GET", token });
}

export async function updateNote(id, dto, token)
{
	return request(`/${id}`, { method: "PUT", token, body: dto });
}

export async function deleteNote(id, token)
{
	return request(`/${id}`, { method: "DELETE", token });
}