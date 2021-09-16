import React, { useContext, useEffect, useState } from 'react'
import "./FriendPage.css"
import { Link, useLocation } from "react-router-dom";
import Topbar from "../../component/Topbar/Topbar"
import axios from "axios"
import { AuthContext } from '../../Context/AuthContext'
import UserItem from "../../component/UserItem/UserItem"


function FriendPage() {

	let location = useLocation();
	const [disUsers, setDisUsers] = useState([])
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext)


	useEffect(() => {
		const fetchallUser = async () => {
			try {
				if (location.state.all) {
					const res = await axios.get("/users/allUsers", { userId: currentUser._id })
					setDisUsers(res.data.filter((user) => user._id !== currentUser._id))
				}
				else {
					setDisUsers(location.state.users)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchallUser()
	}, [currentUser, location.state.all])




	return (
		<>
			<Topbar />
			<div className="friend-menu">
				{ disUsers.map((user) => <UserItem user={user} /> )}
			</div>

		</>
	)
}

export default FriendPage
