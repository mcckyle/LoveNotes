//****************************************************************************************
// Filename: CreateNote.jsx
// Date: 2 February 2026
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
			setShareUrl(window.location.origin + response.url);
		}
		catch (error)
		{
			console.error(error);
			setError("We couldn't send your note just yet. Please try again.");
		}
		finally
		{
			setLoading(false);
		}
	};
	
	const copyLink = async () => {
		await navigator.clipboard.writeText(shareUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	
	return (
	  <main className="page page-centered create-note">
		{ ! shareUrl ? (
		  <section className="create-note-intro">
		    <h1 className="page-title">Write a Love Note</h1>
			<p className="page-subtitle">
			  A private message, shared with care.
			</p>
		    <NoteForm onSubmit={handleCreate} loading={loading}/>
			{error && <p className="error">{error}</p>}
		  </section>
		) : (
		  <section className="share-card">
		    <h2>Your love note is ready 💖</h2>
			<p className="share-description">
			  Share this link with someone special.
			</p>
			
			<div className="share-link">
		      <input readOnly value={shareUrl} />
			  <button onClick={copyLink}>
			    {copied ? "Copied!" : "Copy Link"}
			  </button>
			</div>
			
			<p className="muted">
			  Anyone with this link can read your note.
			</p>
		  </section>
		)}
	  </main>
	);
}