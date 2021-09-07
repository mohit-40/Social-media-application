import React from 'react'
import "./Login.css"

function login() {
	return (
		<div className="login">
			<div className="login-wrapper">
				<div className="login-left">
					<div className="logo">Socialify</div>
					<div className="desc">Connect to friend and the world around you on Socialify</div>
				</div>
				<div className="login-right">
					<form action="/profile" method="get" className="login-form">
						<input  type="text" placeholder="Username or email" />
						<input  type="password" placeholder="Password" />
						<button className="login-btn">Login</button>
						<span className="forget-password">Forget Password</span>
						<button className="register-btn" >Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default login
