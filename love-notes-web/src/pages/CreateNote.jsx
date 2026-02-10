//****************************************************************************************
// Filename: CreateNote.jsx
// Date: 7 February 2026
// Author: Kyle McColgan
// Description: This file contains the note form wrapper for LoveNotes.
//****************************************************************************************

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createNote } from "../services/NoteService";
import NoteForm from "../components/NoteForm/NoteForm";

import "./CreateNote.css";

export default function CreateNote()
{
	const [shareUrl, setShareUrl] = useState(null);
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { accessToken } = useContext(AuthContext);
	
	const handleCreate = async (dto) => {
		try
		{
			setLoading(true);
			setError(null);
			
			const response = await createNote(dto, accessToken);
			setShareUrl(`${window.location.origin}${response.url}`);
		}
		catch (error)
		{
			console.error(error);
			setError("Unable to send your note. Please try again.");
		}
		finally
		{
			setLoading(false);
		}
	};
	
	const copyLink = async () => {
		if ( ! shareUrl)
		{
			return;
		}
		
		await navigator.clipboard.writeText(shareUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	
	return (
	  <main className="page page-centered create-note">
		{ ! shareUrl ? (
		  <section className="create-note-compose">
		   <header className="create-note-header">
		    <h1 className="create-note-title">Write a love note</h1>
			<p className="create-note-subtitle">
			  A private message, written with care and shared when it feels right.
			</p>
		  </header>
		    <NoteForm onSubmit={handleCreate} loading={loading}/>
			{error && <p className="create-note-error" role="alert">{error}</p>}
		  </section>
		) : (
		  <section className="share-card" aria-live="polite">
		   <header className="share-header">
		    <h2 className="share-title">Your note is ready</h2>
			<p className="share-description">
			  Share this link with someone special.
			</p>
		   </header>
			
			<div className="share-link">
		      <input readOnly value={shareUrl} aria-label="Shareable link" />
			  <button type="button" onClick={copyLink} className="share-button">
			    {copied ? "Copied" : "Copy"}
			  </button>
			</div>
			
			<p className="share-muted">
			  Anyone with this link can read your note.
			</p>
		  </section>
		)}
	  </main>
	);
}