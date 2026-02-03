//****************************************************************************************
// Filename: Register.jsx
// Date: 2 February 2026
// Author: Kyle McColgan
// Description: This file contains the Register component for LoveNotes.
//****************************************************************************************

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css"; //Import the custom CSS file

const Register = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState("");

	async function onSubmit(data) {
		setErrorMessage("");
		
		//Password Match Check.
		if (data.password !== data.confirmPassword)
		{
			setErrorMessage("Passwords do not match!");
			return;
		}
		
		//Remove confirmPassword before sending the payload...
		const { confirmPassword, ...payload } = data;
        
        try
        {
			const response = await registerUser(payload);
			
			setAccessToken(response.accessToken);
			setUser({ username: response.username, email: response.email });
			
			navigate("/");
        }
        catch
        {
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
	 <section className="register">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
		  <header className="register-header">
            <h1>Begin with intention</h1>
			<p className="register-subtitle">
                Create an account to start sharing meaningful words.
            </p>
		  </header>
			
		  <div className="register-fields">
			<input
			  type="text"
			  placeholder="Username"
			  aria-label="Username"
			  {...register("username", { required: true })}  
			/>
			<input
			  type="email"
			  placeholder="Email"
			  aria-label="Email"
			  {...register("email", { required: true })}      
			/>
			<input
			  type="password"
			  placeholder="Password"
			  aria-label="Password"
			  {...register("password", { required: true })}
			/>
			<input
			  type="password"
			  placeholder="Confirm Password"
			  aria-label="Confirm password"
			  {...register("confirmPassword", { required: true })}
			/>
		  </div>
				  
		  {errorMessage && (
			<div className="register-error" role="alert">
			  {errorMessage}
			</div>
		  )}
		  
		  <button type="submit" className="register-button">
			Create account
		  </button>
         </form>
	  </section>
    );
};

export default Register;