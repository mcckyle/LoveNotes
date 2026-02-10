//****************************************************************************************
// Filename: HomePage.jsx
// Date: 7 February 2026
// Author: Kyle McColgan
// Description: This file contains the HomePage component for LoveNotes.
//****************************************************************************************

import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
	return (
	  <div className="home">
	    {/* Hero Section. */}
	    <section className="home-hero">
		  <span className="home-eyebrow">Designed for love</span>
		  
		    <h1 className="home-title">
			  Write what you feel.
			  <br />
			  <span>Share it with intention.</span>
			</h1>
			
			<p className="home-subtitle">
		      A modern, private space for meaningful words - written in the moment,
			  shared when it matters most.
		    </p>
			
			<div className="home-actions">
		      <Link to="/note" className="home-cta">
			    Create a note
			  </Link>
		    </div>
		</section>
		
		{/* Feature Cards Grid. */}
		<section className="home-grid" aria-label="Key features">
		  <article className="home-card">
		    <h2 className="card-title">Intentional by design</h2>
			<p className="card-text">
			  No feeds. No noise. Just one message, written with care.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Write in the moment</h2>
			<p className="card-text">
			  Capture a feeling as it happens, without friction or distraction.
			</p>
		  </article>
		  
		  <article className="home-card">
		    <h2 className="card-title">Share thoughtfully</h2>
			<p className="card-text">
			  Send when the time feels right. Simple. Private. Sincere.
			</p>
		  </article>
		</section>
	  </div>
	);
};

export default HomePage;