import React, { useContext, useEffect, useState } from 'react'
import "./FriendMenu.css"
import Topbar from "../../component/Topbar/Topbar"
import axios from "axios"
import { AuthContext } from '../../Context/AuthContext'



function FriendMenu(props) {

	const [disUsers, setDisUsers] = useState([])
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const {user:currentUser} = useContext(AuthContext)
	useEffect(() => {
		const fetchallUser = async () => {
			try {
				if(props.all){
				 	const res = await axios.get("/users/allUsers" , {userId : currentUser._id})
					 setDisUsers(res.data.filter((user)=> user._id!==currentUser._id))
					}
					else{
						setDisUsers(props.users)
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchallUser()
	}, [currentUser,props.all])

	return (
		<>
			<Topbar />
			<div className="friend-menu">
				{disUsers.map((user) => (
					<div className="friend-menu-item">
						<img src={user.profilePicture ? user.profilePicture : PF + "/person/noAvatar.png"} alt="" />
						<div className="info">
							<div className="name info-item">Mohit</div>
							<div className="from info-item">Kota</div>
							<div className="work info-item">ABC Pvt Limited</div>
							<div className="btn-container info-item">
								<button >
								{currentUser.followings.includes(user._id) ? "UnFollow": "Follow"}
								</button>
								{/* <button >Message</button> */}
							</div>

						</div>
					</div>
				))}
			</div>
		</>
	)
}

  
FriendMenu.defaultProps = {
	all:false
}

export default FriendMenu
