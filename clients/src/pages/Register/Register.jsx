import React from 'react'
import "./Register.css"

function register() {
	return (
		<div className="register">
			<div className="register-wrapper">
				<div className="register-left">
					<div className="logo">Socialify</div>
					<div className="desc">Connect to friend and the world around you on Socialify</div>
				</div>
				<div className="register-right">
					<form action="/profile" method="get" className="register-form">
						<input  type="text" placeholder="Username or email" />
						<input  type="password" placeholder="Password" />
						<input  type="password" placeholder="Comfirm Password" />
						<button className="register-btn" >Sign Up</button>
						<span className="forget-password">Forget Password</span>
						<button className="login-btn">LogIn</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default register
