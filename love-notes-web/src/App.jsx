//****************************************************************************************
// Filename: App.jsx
// Date: 7 February 2026
// Author: Kyle McColgan
// Description: This file contains the React entry point for LoveNotes.
//****************************************************************************************

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";

import Header from "./components/Header/Header.jsx";
import HomePage from './components/HomePage/HomePage.jsx';
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Settings from "./components/Settings/Settings.jsx";

import CreateNote from "./pages/CreateNote";
import NoteShared from "./pages/NoteShared";
import NotesDashboard from "./pages/NotesDashboard";

import "./App.css";

const App = () => {
      return (	
		  <BrowserRouter>
		    <div className="app-shell">
			  <Header />
			  <main className="app-main">
			    <div className="app-content">
				 <Routes>
				  {/* Public Routes. */}
				  <Route path="/" element={<HomePage />} />
				  <Route path="/login" element={<Login />} />
				  <Route path="/register" element={<Register />} />
				  <Route path="/note" element={<CreateNote />} />
				  <Route path="/note/:token" element={<NoteShared />} />
				  
				  {/* Protected Routes. */}
				  <Route
				    path="/dashboard"
					element={
						<PrivateRoute>
						  <NotesDashboard />
						</PrivateRoute>
					}
				  />
				  <Route
				    path="/profile"
					element={
						<PrivateRoute>
						  <Profile />
						</PrivateRoute>
					}
				  />
				  <Route
				    path="/settings"
					element={
						<PrivateRoute>
						  <Settings />
						</PrivateRoute>
					}
				  />

				  {/* Fallback Route. */}
				  <Route
					path="*"
					element={<h2 className="not-found">Page not found</h2>}
				  />
				</Routes>
			   </div>
			  </main>
			</div>
		  </BrowserRouter>
		);
};

export default App;