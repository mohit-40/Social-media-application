import React from 'react'
import "./CloseFriend.css"

function CloseFriend(props) {
	return (
		<div className="friend-list-item">
			<img src={props.user.profilePicture} alt="" />
			<span className="friend-name">{props.user.username}</span>
		</div>
	)
}

export default CloseFriend
