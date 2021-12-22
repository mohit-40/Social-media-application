import React, { useEffect, useState } from 'react'
import "./FriendPage.css"
import {  useLocation } from "react-router-dom";
import Topbar from "../../component/Topbar/Topbar"
import UserItem from "../../component/UserItem/UserItem"
 
import {useSelector } from "react-redux" 
import { io } from "socket.io-client";
import { userRequest } from '../../requestMethod';

function FriendPage() {
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;



	let location = useLocation();
	const [disUsers, setDisUsers] = useState([]) 

	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUserId);
	},[currentUserId]);


	useEffect(() => {
		const fetchallUser = async () => {
			try {
				if (location.state.all) {
					const res = await userRequest.get("/users/allUsers", { userId: currentUserId })
					setDisUsers(res.data.filter((user) => user._id !== currentUserId))
				}
				else {
					setDisUsers(location.state.users)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchallUser()
	}, [currentUserId, location.state.users ,location.state.all])


	return (
		<>
			<Topbar />
			<div className="friend-menu">
				{ disUsers.map((user) => <UserItem user={user} key= {user._id} /> )}
			</div>

		</>
	)
}

export default FriendPage
