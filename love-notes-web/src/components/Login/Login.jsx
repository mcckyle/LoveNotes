//****************************************************************************************
// Filename: Login.jsx
// Date: 22 February 2026
// Author: Kyle McColgan
// Description: This file contains the Login component for LoveNotes.
//****************************************************************************************

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css"; //Import the custom CSS file.

const Login = () => {
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);
	const { register, handleSubmit } = useForm({ mode: "onSubmit" });
	const [errorMessage, setErrorMessage] = useState("");

    async function onSubmit(data) {
		setErrorMessage("");
		
		try
		{
			await login(data);
			navigate("/");
		}
		catch
		{
			setErrorMessage("Unable to sign in. Please check your details.");
		}
	}

    return (
	  <main className="login">
		<form
		  className="login-form"
		  onSubmit={handleSubmit(onSubmit)}
		  noValidate
		  aria-labelledby="login-title"
		>
		 <header className="login-header">
			<h1 id="login-title">Welcome back</h1>
			<p className="login-subtitle">
			  Sign in to continue where you left off.
			</p>
		 </header>
			
		<div className="login-fields">
		  <label className="sr-only" htmlFor="email">Email</label>
		  <input
		    id="email"
			type="email"
			placeholder="Email"
			autoComplete="email"
			{...register("email", { required: true })}
		  />
		  <label className="sr-only" htmlFor="password">Password</label>
		  <input
		    id="password"
			type="password"
			placeholder="Password"
			autoComplete="current-password"
			{...register("password", { required: true })}
		  />
		</div>
		
		{errorMessage && (
			<p id="login-error" className="login-error" role="alert">
			  {errorMessage}
			</p>
		)}
		
		<button type="submit" className="login-button">
			Sign in
		</button>
	  </form>
	</main>
    );
};

export default Login;