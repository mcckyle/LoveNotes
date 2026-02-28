//****************************************************************************************
// Filename: NoteForm.jsx
// Date: 21 February 2026
// Author: Kyle McColgan
// Description: This file contains the note form for creating notes for LoveNotes.
//****************************************************************************************

import { useState } from "react";
import "./NoteForm.css";

export default function NoteForm({ onSubmit, loading = false, note, onCancel })
{
	const [title, setTitle] = useState(note?.title || "");
	const [message, setMessage] = useState(note?.message || "");
	const [recipientName, setRecipientName] = useState(note?.recipientName || "");
	const [recipientEmail, setRecipientEmail] = useState(note?.recipientEmail || "");
	
	function handleSubmit(e) {
		e.preventDefault();
		if ( loading)
		{
			return;
		}
		onSubmit({ title, message, recipientName, recipientEmail });
	}
	
	return (
	  <form className="note-form" onSubmit={handleSubmit} noValidate>
	   <header className="note-form-header">
	     <h2 className="note-form-title">Write with intention</h2>
		 <p className="note-form-subtitle">
		   A single message, written honestly and shared when it feels right.
		 </p>
		</header>
		
		<div className="note-field">
	      <input
		    type="text"
		    placeholder="Title (optional)"
			aria-label="Note title"
		    value={title}
		    onChange={(e) => setTitle(e.target.value)}
		  />
	    </div>
	   
	   <div className="note-field note-field-primary">
		<textarea
		  placeholder="Write something meaningful…"
		  aria-label="Note message"
		  value={message}
		  onChange={(e) => setMessage(e.target.value)}
		  required
		/>
	   </div>
		
	   <div className="note-field">
		<input
		  type="text"
		  placeholder="Who is this for? (optional)"
		  aria-label="Recipient name"
		  value={recipientName}
		  onChange={(e) => setRecipientName(e.target.value)}
		/>
	   </div>
	   
	   	<div className="note-field">
			<input
			  type="email"
			  placeholder="Recipient email (optional)"
			  aria-label="Recipient email"
			  value={recipientEmail}
			  onChange={(e) => setRecipientEmail(e.target.value)}
			/>
	    </div>
	   
	   <div className="note-actions">
			<button type="submit" className="note-button primary" disabled={loading}>
			  {loading ? "Sending…" : "Send Love"}
			</button>
			{onCancel && (
			  <button type="button" className="note-button secondary" onClick={onCancel}>
			    Cancel
			  </button>
			)}
		</div>
	  </form>
	);
}