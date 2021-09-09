import React, { useRef,useContext } from 'react'
import "./Login.css"
import { AuthContext } from "../../Context/AuthContext";
import {loginCall} from "../../apiCall"
import { CircularProgress } from "@material-ui/core";
import {useHistory} from 'react-router';
import {Link} from "react-router-dom";
 
function Login() {

	const email= useRef();
	const password= useRef();


	const {user, isFetching, error, dispatch} = useContext(AuthContext);
	const history=useHistory();
	const handleSubmit=(e)=>{
		e.preventDefault();
		loginCall({email:email.current.value,password:password.current.value},dispatch);
		history.push("/");
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
						<button className="login-btn" type="submit" disabled={isFetching}>  
						{isFetching ? ( <CircularProgress size="20px" /> ) : ( "Log In" )}
						</button>
						<span className="forget-password">Forget Password</span>
						<Link to="/register">
							<button className="register-btn" type="submit" disabled={isFetching}>
							{isFetching ? ( <CircularProgress size="20px" /> ) : ( "Sign Up" )}
							</button>
						</Link>
					</form>
				</div>

			</div>
		</div>
	)
}

export default Login
