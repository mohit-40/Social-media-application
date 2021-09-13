import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./CloseFriend.css"


function CloseFriend(props) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	console.log(props)

	return (
		<Link to={`/profile/${props.user.username}`} className="text-link">
			<div  className={props.className} >
				<img src={props.user.profilePicture ? PF + props.user.profilePicture : PF + "person/noAvatar.png"} alt="img" />
				<div className="name">{props.user.username}</div>
			</div>
		</Link>
	)
}

export default CloseFriend