//****************************************************************************************
// Filename: Header.jsx
// Date: 7 February 2026
// Author: Kyle McColgan
// Description: This file contains the Header component for LoveNotes.
//****************************************************************************************

import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import "./Header.css";  // Import the CSS file here.

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  const navItem = (path) => `nav-item ${isActive(path) ? "active" : ""}`;
  
  async function handleLogout(){
	  //Call global logout logic.
	  await logout(); //Redirect AFTER logout state is fully cleared.
	  navigate("/login", { replace: true }); 
  };
  
  //Close the dropdown menu when clicking outside the menu.
  useEffect(() => {
	  if ( ! menuOpen)
	  {
		  return;
	  }
	  
	  const handleClickOutside = (e) => {
		  if ( (avatarRef.current) && ( ! avatarRef.current.contains(e.target)) )
		  {
			  setMenuOpen(false);
		  }
	  };
	  
	  document.addEventListener("mousedown", handleClickOutside);
	  return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);
  
  return (
	  <header className="header">
		<div className="header-inner container">
		
		  {/* Left Logo. */}
		  <Link to="/" className="logo">
		    LoveNotes
		  </Link>
		
		  {/* Primary Navigation. */}
		  <nav className="nav" aria-label="Primary Navigation">
		    <Link
			  to="/"
			  className={navItem("/")}
			  aria-current={isActive("/") ? "page" : undefined}
			>
			  Home
			</Link>
			<Link
			  to="/dashboard"
			  className={navItem("/dashboard")}
			  aria-current={isActive("/dashboard") ? "page" : undefined}
			>
			  Dashboard
			</Link>
		    <Link
			  to="/note"
			  className={navItem("/note")}
			  aria-current={isActive("/note") ? "page" : undefined}
			>
			  Write
			</Link>
		  </nav>
		
		  {/* Right Side: Auth / User Avatar. */}
		  <div className="header-actions">
		   {user ? (
		    <div
			  ref={avatarRef}
			  className="avatar-wrapper"
			  role="button"
			  tabIndex={0}
			  aria-haspopup="menu"
			  aria-expanded={menuOpen}
		      onClick={() => setMenuOpen((open) => ! open)}
			  onKeyDown={(e) => {
				  if ( (e.key === "Enter") || (e.key === " ") )
				  {
					  e.preventDefault();
					  setMenuOpen((open) => ! open);
				  }
				  if (e.key === "Escape") setMenuOpen(false);
			  }}
			>
			  <div className="avatar">
			    {user.username?.charAt(0).toUpperCase() || "?"}
			  </div>
			  
			  <div
			    className={`menu ${menuOpen ? "open" : ""}`}
				role="menu"
				onClick={(e) => e.stopPropagation()}
			  >
			    <Link to="/profile" className="menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
				  Profile
				</Link>
				<Link to="/settings" className="menu-item" role="menuitem" onClick={() => setMenuOpen(false)}>
				  Settings
				</Link>
				<div className="menu-divider" />
				<button className="menu-item danger" role="menuitem" onClick={handleLogout}>
				  Log out
				</button>
			  </div>
			</div>
		) : (
		  <div className="auth-links">
		    <Link to="/login" className="auth-link">Login</Link>
		    <Link to="/register" className="auth-link primary">Register</Link>
		  </div>
		)}
		</div>
	  </div>
	</header>
  );
};

export default Header;