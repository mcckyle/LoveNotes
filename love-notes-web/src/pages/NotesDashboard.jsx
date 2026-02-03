//****************************************************************************************
// Filename: NotesDashboard.jsx
// Date: 2 February 2026
// Author: Kyle McColgan
// Description: This file contains the frontend dashboard for LoveNotes.
//****************************************************************************************

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserNotes, deleteNote } from "../services/NoteService";
import NoteForm from "../components/NoteForm/NoteForm";
import "./NotesDashboard.css";

export default function NotesDashboard()
{
	const { accessToken } = useContext(AuthContext);
	const [notes, setNotes] = useState([]);
	const [editingNote, setEditingNote] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	const fetchNotes = async () => {
		try
		{
			setLoading(true);
			const data = await getUserNotes(accessToken);
			setNotes(data);
		}
		catch (error)
		{
			console.error(error);
			setError("We couldn't load your notes right now.");
		}
		finally
		{
			setLoading(false);
		}
	};
	
	useEffect(() => {
		fetchNotes();
	}, []);
	
	const handleDelete = async (id) => {
		if ( ! confirm("Delete this note permanently?"))
		{
			return;
		}
		
		try
		{
			await deleteNote(id, accessToken);
			setNotes((n) => n.filter((note) => note.id !== id));
		}
		catch (error)
		{
			console.error(error);
			setError("Failed to delete note!");
		}
	};
	
	const handleEdit = (note) => setEditingNote(note);
	
	return (
	  <main className="page page-centered notes-dashboard">
	   <header className="dashboard-header">
	    <h1>My Love Notes</h1>
		<p className="page-subtitle">
		  Private messages you've shared with care.
		</p>
	   </header>
		{error && <p className="error">{error}</p>}
		{loading ? (
		  <p className="dashboard-loading">Loading your notes...</p>
		) : notes.length === 0 ? (
		  <p className="dashboard-empty">
		    You haven't written any notes yet.
		  </p>
		) : (
		  <section className="notes-grid">
			{notes.map((note) => (
			  <article key={note.id} className="note-card">
			<header className="note-card-header">
			  <h3>{note.title || "Untitled note"}</h3>
			</header>
			<p className="note-preview">{note.message}</p>
			<footer className="note-actions">
			  <button className="secondary" onClick={() => handleEdit(note)}>Edit</button>
			  <button className="secondary" onClick={() => handleDelete(note.id)}>Delete</button>
			  <button
			    className="secondary"
			    onClick={() =>
				  navigator.clipboard.writeText(
				    window.location.origin + "/note/public" + note.publicToken
				  )
				}
			  >
			    Copy Link
			  </button>
			</footer>
		  </article>
		  ))}
		</section>
	  )}
	  
	  {editingNote && (
	    <div className="modal">
		 <div className="modal-card">
		  <NoteForm
		    note={editingNote}
			onSubmit={async (dto) => {
				try
				{
					const updated = await fetch(`/api/notes/${editingNote.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
						body: JSON.stringify(dto),
					}).then((r) => r.json());
					setNotes(
					  notes.map((n) => (n.id === updated.id ? updated : n))
					);
					setEditingNote(null);
				}
				catch (error)
				{
					console.error(error);
					setError("Failed to update the note!");
				}
			}}
			onCancel={() => setEditingNote(null)}
		  />
		</div>
	  </div>
	  )}
	</main>
	);
}