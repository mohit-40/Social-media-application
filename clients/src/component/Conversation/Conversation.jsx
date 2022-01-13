import React, { useEffect, useState } from 'react' 
import "./Conversation.css"
import { useSelector } from 'react-redux'
import { userRequest } from '../../requestMethod'

function Conversation({ conversation }) {
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	// fetched currentUser

	const [user, setUser] = useState()
	let PF = process.env.REACT_APP_PUBLIC_FOLDER;
	if(process.env.NODE_ENV=="production"){
		PF=process.env.REACT_APP_PUBLIC_FOLDER_DEPLOY
	}

	// friend of conversation With
	useEffect(() => {
		const friendId = conversation.members.find( m => m !== currentUserId);
		const getUser = async () => {
			try {
				const res = await userRequest.get("/users?userId=" + friendId);
				setUser(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [currentUserId, conversation]);



	return (
		<div className="conversation">
			<img src={user?.profilePicture ? user?.profilePicture : PF + "/person/noAvatar.png"} alt="img" className="conversation-img" />
			<span className="conversation-name">{user?.name}</span>
		</div>
	)
}

export default Conversation
