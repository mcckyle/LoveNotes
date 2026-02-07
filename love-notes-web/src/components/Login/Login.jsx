//****************************************************************************************
// Filename: Login.jsx
// Date: 5 February 2026
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
	const { register, handleSubmit } = useForm();
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
			setErrorMessage("That didn't work. Please check your details.");
		}
	};

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
			
		<fieldset className="login-fields">
		  <input
			type="email"
			placeholder="Email"
			aria-label="Email"
			autoComplete="email"
			{...register("email", { required: true })}
		  />
		  <input
			type="password"
			placeholder="Password"
			aria-label="Password"
			autoComplete="current-password"
			{...register("password", { required: true })}
		  />
		</fieldset>
		
		{errorMessage && (
			<p className="login-error" role="alert">
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