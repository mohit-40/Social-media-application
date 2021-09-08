import React from 'react'
import "./CloseFriend.css"

function CloseFriend(props) {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="friend-list-item">
			<img src={PF + props.user.profilePicture} alt="" />
			<span className="friend-name">{props.user.username}</span>
		</div>
	)
}

export default CloseFriend
