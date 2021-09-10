import React, { useRef, useState } from 'react'
import "./Register.css"
import axios from "axios"
import { useHistory } from "react-router";
import {Link} from "react-router-dom";


function Register() {

	const username = useRef()
	const email = useRef()
	const password = useRef()
	const comfirmPassword=useRef();
	const history=useHistory();

	const handleSubmit= async(e)=>{
		e.preventDefault();
		if(password.current.value!==comfirmPassword.current.value){
			comfirmPassword.current.setCustomValidity("password do not match");
		}
		else {
			const user={
				username:username.current.value,
				email:email.current.value,
				password:password.current.value
			}		
			try {
				await axios.post("/auth/register",user);
				history.push("/login");
			} catch(error) {
				console.log(error.message);
			}
		}	
	}

	return (
		<div className="register">
			<div className="register-wrapper">
				<div className="register-left">
					<div className="logo">Socialify</div>
					<div className="desc">Connect to friend and the world around you on Socialify</div>
				</div>
				<div className="register-right">
					<form onSubmit={handleSubmit} className="register-form">
						<input  type="text" placeholder="Username" required ref={username} />
						<input  type="email" placeholder="email" required ref={email} />
						<input  type="password" placeholder="Password" required minLength="6" ref={password} />
						<input  type="password" placeholder="Comfirm Password" required ref={comfirmPassword} />
						<button type="submit" className="register-btn" >Sign Up</button>
						<span className="forget-password">Forget Password</span>
						<Link className='text-link' to="/login"><button className="login-btn">LogIn</button></Link>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
