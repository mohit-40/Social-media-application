import React,{  useEffect } from 'react'
import Topbar from "../../component/Topbar/Topbar"
import "./Error.css"

import {useSelector } from "react-redux" 
import { io } from "socket.io-client"; 

function Error({statusCode , message}) {
	message=message?message:"Some Error Occured";
	
	const currentUserId = useSelector(state => state.user.currentUserId)
	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUserId);
	},[currentUserId]);

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
