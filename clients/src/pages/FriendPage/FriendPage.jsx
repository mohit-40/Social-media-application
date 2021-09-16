import React from 'react'
import "./FriendPage.css"
import {Link, useLocation} from "react-router-dom";
import FriendMenu from "../FriendMenu/FriendMenu"

function FriendPage() {
	let location = useLocation();
	console.log(location.state.users)
	return (
		<div>
			<FriendMenu users={location.state.users} all={location.state.all}/>
		</div>
	)
}

export default FriendPage
