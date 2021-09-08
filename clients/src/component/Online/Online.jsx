import React from 'react'
import "./Online.css"
function Online(props) {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<li className="online-friend">
			<img src={PF + props.user.profilePicture} alt="" />
			<span className="online-friend-badge"></span>
			<span className="name">{props.user.username}</span>
		</li>
	)
}

export default Online
