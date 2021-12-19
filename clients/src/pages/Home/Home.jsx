import React, { useContext, useEffect } from 'react'
import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import Rightbar from '../../component/Rightbar/Rightbar';
import "./Home.css"

import { io } from "socket.io-client";
import { AuthContext } from '../../Context/AuthContext'

function Home() {
	
	
	const { user: currentUser } = useContext(AuthContext)
	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUser._id);
	},[currentUser]);

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