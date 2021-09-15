
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import "./Message.css"
import { format } from "timeago.js"

function Message({message,own}) {

	const {user:currentUser}=useContext(AuthContext)
	
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState();

	useEffect(()=>{
		const fetchUser=async ()=>{
		try {
				const res= await axios("/users?userId=" + message.senderId)		
				setUser(res.data)	
			} catch (error) {
				console.log(error)
			}
		}
		fetchUser();		
	},[message])


	return ( 
		<div className={own ? "message own" : "message"}>
			<div className="message-top">
				<img src={user?.profilePicture? user.profilePicture : PF +"/person/noAvatar.png" } alt="" className="message-img"/>
				<p className="message-text">{message.textMessage}</p>
			</div>
			<div className="message-bottom">
				{format(message.createdAt)}
			</div>
		</div>
	)
}

export default Message
