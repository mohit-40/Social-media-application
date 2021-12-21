import React, { useRef } from 'react'
import "./Login.css" 
import { CircularProgress } from "@material-ui/core";
import {useHistory} from 'react-router';
import {Link} from "react-router-dom";
import {useSelector ,useDispatch} from "react-redux" 
import {login} from "../../redux/exportAllAction" 

function Login() {
	
	const email= useRef();
	const password= useRef();

	const dispatch =useDispatch();
	const userState = useSelector(state=>state.user)
	const {currentUser , isLoading, error} = userState;
	const history=useHistory();
	const handleSubmit= (e)=>{
			e.preventDefault();
			dispatch(login(  email.current.value, password.current.value ))
			history.push("/");
			console.log(error, isLoading)
	}
	 
	return (
		<div className="login">
			<div className="login-wrapper">

				<div className="login-left">
					<div className="logo">Socialify</div>
					<div className="desc">Connect to friend and the world around you on Socialify</div>
				</div>

				<div className="login-right">
					<form onSubmit={handleSubmit} className="login-form">
						<input  type="text" placeholder="Email" ref={email} />
						<input  type="password" placeholder="Password" ref={password} />
						<button className="login-btn" type="submit" disabled={isLoading}>  
						{isLoading ? ( <CircularProgress size="20px" /> ) : ( "Log In" )}
						</button>
						<span className="forget-password">Forget Password</span>
						<Link className='text-link' to="/register">
							<button className="register-btn" type="submit" disabled={isLoading}>
							{isLoading ? ( <CircularProgress size="20px" /> ) : ( "Sign Up" )}
							</button>
						</Link>
					</form>
				</div>

			</div>
		</div>
	)
}

export default Login
