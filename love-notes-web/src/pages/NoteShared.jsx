//****************************************************************************************
// Filename: NoteShared.jsx
// Date: 7 February 2026
// Author: Kyle McColgan
// Description: This file contains the note success page for LoveNotes.
//****************************************************************************************

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNoteByPublicToken } from "../services/NoteService";

import "./NoteShared.css";

export default function NoteShared()
{
	const { token } = useParams();
	const [note, setNote] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const loadNote = async () => {
			try
			{
				setLoading(true);
				const response = await fetchNoteByPublicToken(token);
				setNote(response);
			}
			catch
			{
				setError("This note isn't available right now.");
			}
			finally
			{
				setLoading(false);
			}
		};
		loadNote();
	}, [token]);
	
	return (
	  <main className="page page-centered note-shared">
	   <section className="note-shared-wrapper">
	    <div className="note-shared-icon" aria-hidden="true">💌</div>
		<p className="note-shared-intro">
		  This note was shared with love.
		</p>
		
		{loading && (
		  <div className="note-card note-card--loading">
			<p className="note-loading-text">
			  Opening your message…
			</p>
		  </div>
		)}
		
		{error && <p className="note-error">{error}</p>}
		
		{ (note) && ( ! loading) && (
		  <article className="note-card note-card--content">
		    {note.title && <h2 className="note-title">{note.title}</h2>}
			<p className="note-message">{note.message}</p>
			{note.recipientName && (
			  <p className="note-recipient">💖 For {note.recipientName}</p>
			)}
		  </article>
		)}
	  </section>
	  {/* Token intentionally not displayed in the UI. */}
	  </main>
	);
}