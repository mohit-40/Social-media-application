import React, { useRef, useState  } from 'react'
import "./Register.css"
import axios from "axios"
import { useHistory } from "react-router";
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { register } from '../../redux/User/userRegisterAction';


function Register() {
	
	const dispatch = useDispatch();
	const history=useHistory();
	const username = useRef()
	const email = useRef("")
	const password = useRef()
	const comfirmPassword=useRef();
	const otp = useRef("")
	const [otpSend, setOtpSend] = useState(false);
	const [otpVerified , setOtpVerified] =useState(false);
	const [otpCounter , setOtpCounter] =useState(30);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	

	const handleSubmit= async(e)=>{
		e.preventDefault();
		console.log(password.current.value,comfirmPassword.current.value)
		console.log(password.current.value===comfirmPassword.current.value)
		if(password.current.value!==comfirmPassword.current.value){
			setError("password do not match ")
		}
		else {
			const user={
				username:username.current.value,
				email:email.current.value,
				password:password.current.value
			}		
			try {
				await dispatch(register(user)) 
				history.push("/updateInfo");
			} catch(error) {
				setError(error.message);
				console.log(error);
			}
		}	
	}

	const handleSendOtp=async()=>{
		try {
			//send otp to email
			const res=await axios.get("/otp/gernate/"+email.current.value);
			console.log(res.data)
			setOtpSend(true);
			const myInterval = setInterval(() => {
				setOtpCounter(prev=>prev-1);
			}, 1000);
			setTimeout(() => {
				setOtpSend(false);
				setOtpCounter(30)
				clearInterval(myInterval);
			}, 30000);
		} catch(error) {
			setError(error.message);
			console.log(error);	
		}
	}
	const handleVerifyOtp=async()=>{
		try {
			console.log({email: email.current.value , otp : otp.current.value});
			const res =await axios.post("/otp/verify",{email: email.current.value , otp : otp.current.value})
			setError(res.data);
			setOtpVerified(true);
		} catch(error) {
			setError(error.message)
			if(error.response) {
				setError(error.response.data);
				console.log(error.response.data);
			}
		}
	}
	const handleEmailChange=()=>{
		setOtpSend(false);
		setOtpVerified(false);
	}


	return (
		<div className="register">
			<div className="register-wrapper">
				<div className="register-left">
					<div className="logo">Socialify</div>
					<div className="desc">Connect to friend and the world around you on Socialify</div>
				</div>
				<div className="register-right">
					{error && error}
					<form onSubmit={handleSubmit} className="register-form">
						<input  type="text" placeholder="Username" required ref={username} />
						<div className='inputAndBtn'>
							<input  type="email" onChange={handleEmailChange} placeholder="email" required ref={email} />
							{ (!otpSend&&!otpVerified) && <button type="button" className='otp-btn' onClick={handleSendOtp}>Send OTP</button>}
						</div>
						{ (otpSend||otpVerified )&&
									<div className='inputAndBtn'> 
										<input  type="text" placeholder="OTP" required ref={otp} /> 
										{!otpVerified && <button type="button" onClick={handleVerifyOtp} className='otp-btn'>Verify OTP {otpCounter}</button> }
									</div>
						}
						<input  type="password" placeholder="Password" required minLength="6" ref={password} />
						<input  type="password" placeholder="Comfirm Password" required ref={comfirmPassword} />
						<button type="submit"  className="submit-btn register-btn" disabled={!otpVerified}>Sign Up</button>
						{/* <span className="forget-password">Forget Password</span> */}
						<Link className='text-link' to="/login"><button className="submit-btn login-btn">LogIn</button></Link>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
