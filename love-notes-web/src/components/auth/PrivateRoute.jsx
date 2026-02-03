//****************************************************************************************
// Filename: PrivateRoute.jsx
// Date: 1 February 2026
// Author: Kyle McColgan
// Description: This file contains the wrapper for private routes for LoveNotes.
//****************************************************************************************

import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

//PrivateRoute Component.
const PrivateRoute = ({ children }) => {
	const authorized = useAuth();
	
	if (authorized === null)
	{
		return (
		  <div className="loading-screen">
		    <div className="loading-spinner" />
			<p>Checking session...</p>
		  </div>
		);
	}
	
	if ( ! authorized)
	{
		return <Navigate to="/login" replace />;
	}
	
    return children;
};

export default PrivateRoute;