import React, { useContext, useEffect, useState } from 'react'
import "./Online.css"
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
function Online({ userId, setCurrConversation }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState()
	const { user: currentUser } = useContext(AuthContext)
	// fetch user 
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get("/users?userId=" + userId)
				setUser(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchUser()
	}, [userId])


	//fetch or create conversation 
	const handleClick = async () => {
		const body = {
			senderId: currentUser._id,
			receiverId: user._id
		}
		try {
			const res = await axios.post("/conversations/", body)
			setCurrConversation(res.data[0])
		} catch (error) {
			console.log(error)
		}
	}


	//render 


	return (
		<div onClick={handleClick} >
			<li className="online-friend">
				<img src={user?.profilePicture ? user.profilePicture : PF + "/person/noAvatar.png"} alt="" />
				<span className="online-friend-badge"></span>
				<span className="name">{user?.username}</span>
			</li>
		</div>
	)
}

export default Online
