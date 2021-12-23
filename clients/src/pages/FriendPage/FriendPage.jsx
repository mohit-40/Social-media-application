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
	const [displayUsers, setDisplayUsers] = useState([]) 

	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUserId);
	},[currentUserId]);

	
	useEffect(() => {
		const fetchAllUser = async () => {
			try {
				if (location.state.all) {
					const res = await userRequest.get("/users/allUsers", { userId: currentUserId })
					setDisplayUsers(res.data.map( u => {
						if(u._id !== currentUserId) 
							return u._id
						return u._id;
					} 
					))
				}
				else {
					setDisplayUsers(location.state.usersId)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchAllUser()
	}, [currentUserId, location.state.usersId ,location.state.all])


	return (
		<>
			<Topbar />
			<div className="friend-menu">
				{ displayUsers?.map((userId) => <UserItem userId={userId} key= {userId} /> )}
			</div>

		</>
	)
}

export default FriendPage
