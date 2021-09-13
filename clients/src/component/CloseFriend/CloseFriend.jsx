import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./CloseFriend.css"
import axios from "axios"

function CloseFriend(props) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${props.userId}`);
			setUser(res.data);
		}
		fetchUser()
	}, [props.userId])
	return (
		<Link to={`/profile/${user.username}`} className="text-link">
			<div  className={props.className} >
				<img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="img" />
				<div className="name">{user.username}</div>
			</div>
		</Link>
	)
}

export default CloseFriend