import React from 'react'
import "./Online.css"
function Online(props) {
	return (
		<li className="online-friend">
			<img src={props.user.profilePicture} alt="" />
			<span className="online-friend-badge"></span>
			<span className="name">{props.user.username}</span>
		</li>
	)
}

export default Online
