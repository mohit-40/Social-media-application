import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./Online.css"
import { userRequest } from '../../requestMethod';

function Online({ userId, setCurrConversation }) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState()
	const currentUserId = useSelector(state => state.user.currentUserId)
	// fetch user 
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get("/users?userId=" + userId)
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
			senderId: currentUserId,
			receiverId: user._id
		}
		try {
			const res = await userRequest.post("/conversations/"+currentUserId, body)
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
				<span className="name">{user?.name}</span>
			</li>
		</div>
	)
}

export default Online
