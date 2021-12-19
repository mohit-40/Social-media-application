import Topbar from "../../component/Topbar/Topbar"
import React from 'react'
import "./Error.css"

import { useContext,useEffect } from "react";
import { io } from "socket.io-client";
import { AuthContext } from '../../Context/AuthContext'

function Error({statusCode , message}) {
	message=message?message:"Some Error Occured";
	
	const { user: currentUser } = useContext(AuthContext)
	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUser._id);
	},[currentUser]);

	return (
		<>
		<Topbar />
		<div className="error-page">
			<div className="error-message">{statusCode} {message}</div>
		</div>
		</>
	)
}

export default Error
