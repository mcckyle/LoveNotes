//****************************************************************************************
// Filename: NoteShared.jsx
// Date: 2 February 2026
// Author: Kyle McColgan
// Description: This file contains the note success page for LoveNotes.
//****************************************************************************************

import { useParams } from "react-router-dom";

import "./NoteShared.css";

export default function NoteShared()
{
	const { token } = useParams();
	
	return (
	  <main className="page page-centered note-shared">
	   <section className="note-wrapper">
	    <div className="note-icon" aria-hidden>
		  💌
		</div>
		<p className="note-intro">
		  This note was shared with love.
		</p>
		
		{/* Placeholder for fetched note content... */}
		<div className="note-card loading">
			<p className="note-loading">
			  Opening your message…
			</p>
		</div>
	  </section>
	  {/* Token intentionally not displayed in the UI. */}
	  </main>
	);
}