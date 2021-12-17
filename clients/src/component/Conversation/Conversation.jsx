import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import "./Conversation.css"


function Conversation({ conversation }) {


	const { user: currentUser } = useContext(AuthContext)
	const [user, setUser] = useState()
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	// friend of conversation With
	useEffect(() => {
		const friendId = conversation.members.find( m => m !== currentUser._id);
		const getUser = async () => {
			try {
				const res = await axios("/users?userId=" + friendId);
				setUser(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUser, conversation]);



	return (
		<div className="conversation">
			<img src={user?.profilePicture ? user?.profilePicture : PF + "/person/noAvatar.png"} alt="img" className="conversation-img" />
			<span className="conversation-name">{user?.name}</span>
		</div>
	)
}

export default Conversation
