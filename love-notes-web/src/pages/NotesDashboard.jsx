//****************************************************************************************
// Filename: NotesDashboard.jsx
// Date: 7 February 2026
// Author: Kyle McColgan
// Description: This file contains the frontend dashboard for LoveNotes.
//****************************************************************************************

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserNotes, updateNote, deleteNote } from "../services/NoteService";
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
		catch
		{
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
		catch
		{
			setError("Failed to delete the note!");
		}
	};
	
	return (
	  <main className="page page-centered notes-dashboard">
	   <header className="dashboard-header">
	    <h1>My Love Notes</h1>
		<p className="dashboard-subtitle">
		  Private messages you've written with care.
		</p>
	   </header>
	   
	    {error && <p className="dashboard-message dashboard-message--error">{error}</p>}
		
		{loading && (
		  <p className="dashboard-message">
		    Loading your notes…
		  </p>
		)}
		{ ( ! loading) && (notes.length === 0) && (
		  <p className="dashboard-message">
		    You haven't written any notes yet.
		  </p>
		)}
		{ ( ! loading) && (notes.length > 0) && (
		  <section className="notes-grid">
			{notes.map((note) => (
			  <article key={note.id} className="note-card">
			    <header className="note-card-header">
			      <h3 className="note-title">
				    {note.title || "Untitled note"}
				  </h3>
			    </header>
				
				<p className="note-preview">
				  {note.message}
				</p>
				
				<footer className="note-actions">
				  <button
				    className="note-action note-action--secondary"
					onClick={() => setEditingNote(note)}
				  >
				    Edit
				  </button>
			  
				  <button
					className="note-action note-action--secondary"
					onClick={() =>
					  navigator.clipboard.writeText(
						`${window.location.origin}/note/${note.publicToken}`
					  )
					}
				  >
					Copy Link
				  </button>
			  <button
			    className="note-action note-action--danger"
				onClick={() => handleDelete(note.id)}
			  >
			    Delete
			  </button>
			</footer>
		  </article>
		  ))}
		</section>
	  )}
	  
	  {editingNote && (
	    <div className="modal-backdrop" role="dialog" aria-modal="true">
		 <div className="modal-card">
		  <NoteForm
		    note={editingNote}
			onSubmit={async (dto) => {
				try
				{
					const updated = await updateNote(editingNote.id, dto, accessToken);
					setNotes((n) => n.map((note) => (note.id === updated.id ? updated : note)));
					setEditingNote(null);
				}
				catch
				{
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