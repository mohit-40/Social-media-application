import React, { useContext } from 'react'
import "./CloseFriend.css"
import {AuthContext} from "../../Context/AuthContext"


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
