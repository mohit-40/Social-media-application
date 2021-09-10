import React, { useEffect, useState } from 'react'
import "./CloseFriend.css"
import axios from "axios"

function CloseFriend(props) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get("/users/" + props.user);
			setUser(res.data);
		}
		fetchUser()
	}, [props.user])
	return (
		<div className={props.className} >
			<img src={user.profilePicture? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="img" />
			<div className="name">{user.username}</div>
		</div>
	)
}

export default CloseFriend