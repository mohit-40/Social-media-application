import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from "react-router-dom"
import { userRequest } from '../../requestMethod';
import "./CloseFriend.css"


function CloseFriend({ userId , className}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState();
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get("/users?userId=" + userId)
				setUser(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchUser();
	}, [userId])


	return (
		<Link to={`/profile/${user?.username}`} className="text-link">
			<div className={className} >
				<img src={user?.profilePicture ? user?.profilePicture : PF + "person/noAvatar.png"} alt="img" />
				<div className="name">{user?.name}</div>
			</div>
		</Link>
	)
}

export default CloseFriend