import axios from 'axios'
import React, { useEffect, useState } from 'react' 
import "./Conversation.css"
import { useSelector } from 'react-redux'

function Conversation({ conversation }) {
	const userState = useSelector(state => state.user)
	const currentUser = userState.currentUser;
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
