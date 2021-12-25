import React, { useEffect, useState } from 'react'
import "./FriendPage.css"
import {  useLocation } from "react-router-dom";
import Topbar from "../../component/Topbar/Topbar"
import UserItem from "../../component/UserItem/UserItem"
 
import {useSelector } from "react-redux"  
import { userRequest } from '../../requestMethod';

function FriendPage() {
	//fetching currentUser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	//fetched currentUser 
	let location = useLocation();
	console.log(location);
	const type = location.search?.split("?")[1]?.split("=")[1];
	const userName = location.search?.split("?")[2]?.split("=")[1]	;
	const [displayUsers, setDisplayUsers] = useState([]) 
	
	useEffect(() => {
		const fetchAllUser = async () => {
			try {
				if (type==="all") {
					const res = await userRequest.get("/users/allUsers", { userId: currentUserId })
					setDisplayUsers(res.data.map( u => {
						if(u._id !== currentUserId) 
							return u._id
						return u._id;
					} 
					))
				}
				else {
					setDisplayUsers(location.state.usersId)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchAllUser()
	}, [currentUserId, location.state?.usersId ,type ])


	return (
		<>
			<Topbar />
			<div className="friendMenuContainer">
				<div className="friendMenuWrapper">
					<h2>{userName} {type}</h2>
					{ 
						displayUsers.length===0? "No one to show" : 
						displayUsers?.map((userId) => <UserItem userId={userId} key= {userId} /> )
					}

				</div>
			</div>

		</>
	)
}

export default FriendPage
