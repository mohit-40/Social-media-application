
import React, { useEffect, useState } from 'react'
import "./Message.css"
import { format } from "timeago.js" 
import { userRequest } from '../../requestMethod'

function Message({message,own}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState();

	useEffect(()=>{
		const fetchUser=async ()=>{
		try {
				const res= await userRequest.get("/users?userId=" + message.senderId)		
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
