import React, { useEffect, useState } from 'react'
import "./Online.css"
import axios from 'axios';
function Online({userId}) {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;
	const [user,setUser]=useState()
	useEffect(()=>{
		const fetchUser= async ()=>{
			try {
				const res= await axios.get("/users?userId="+userId)
				setUser(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchUser()
	},[userId])

	return (
		<li className="online-friend">
			<img src={ user?.profilePicture ? user.profilePicture : PF+"/person/noAvatar.png"} alt="" />
			<span className="online-friend-badge"></span>
			<span className="name">{user?.username}</span>
		</li>
	)
}

export default Online
