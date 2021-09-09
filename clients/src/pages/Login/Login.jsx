import React, { useRef, Link, useEffect } from 'react'
import "./Login.css"

function Login() {

	const email= useRef();
	const password= useRef();

	const handleSubmit=(e)=>{
		e.preventDefault();
		LoginCall({email:email.current.value,password:password.current.value})
	}	
	useEffect(()=>{
		
	})

	return (
		<div className="login">
			<div className="login-wrapper">

				<div className="login-left">
					<div className="logo">Socialify</div>
					<div className="desc">Connect to friend and the world around you on Socialify</div>
				</div>

				<div className="login-right">
					<form onSubmit={handleSubmit} className="login-form">
						<input  type="text" placeholder="Username or email" ref={email} />
						<input  type="password" placeholder="Password" ref={password} />
						<button type="submit" className="login-btn">Login</button>
						<span className="forget-password">Forget Password</span>
						<button className="register-btn" >Sign Up</button>
					</form>
				</div>

			</div>
		</div>
	)
}

export default Login
