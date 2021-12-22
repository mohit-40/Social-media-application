import React, { useEffect } from 'react'
import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import Rightbar from '../../component/Rightbar/Rightbar';
import "./Home.css"
import { io } from "socket.io-client";
import {useSelector } from "react-redux" 

function Home() {
	
	
	const currentUserId = useSelector(state => state.user.currentUserId)
	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUserId);
	},[currentUserId]);

	return (
		<>
			<Topbar />
			<div className="hero-container">
				<Sidebar />
				<Feed timeline={true} />
				<Rightbar />
			</div>
		</>
	)
}
export default Home