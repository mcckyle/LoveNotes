//****************************************************************************************
// Filename: NoteForm.jsx
// Date: 2 February 2026
// Author: Kyle McColgan
// Description: This file contains the note form for creating notes for LoveNotes.
//****************************************************************************************

import { useState } from "react";
import "./NoteForm.css";

export default function NoteForm({ onSubmit, loading, note, onCancel })
{
	const [title, setTitle] = useState(note?.title || "");
	const [message, setMessage] = useState(note?.message || "");
	const [recipientName, setRecipientName] = useState(note?.recipientName || "");
	
	return (
	  <form
	    className="note-form"
	    onSubmit={(e) => {
			e.preventDefault();
			onSubmit({ title, message, recipientName });
		}}
	  >
	   <div className="note-field">
	    <input
		  type="text"
		  placeholder="Title (optional)"
		  value={title}
		  onChange={(e) => setTitle(e.target.value)}
		/>
	   </div>
	   
	   <div className="note-field note-field-primary">
		<textarea
		  placeholder="Write something meaningful…"
		  value={message}
		  onChange={(e) => setMessage(e.target.value)}
		  required
		/>
	   </div>
		
	   <div className="note-field">
		<input
		  type="text"
		  placeholder="Who is this for? (optional)"
		  value={recipientName}
		  onChange={(e) => setRecipientName(e.target.value)}
		/>
	   </div>
		<div className="form-actions">
			<button type="submit" className="primary" disabled={loading}>
			  {loading ? "Sending..." : "Send Love"}
			</button>
			{onCancel && (
			  <button type="button" className="secondary" onClick={onCancel}>
			    Cancel
			  </button>
			)}
		</div>
	  </form>
	);
}