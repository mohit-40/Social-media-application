import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import "./UserItem.css"
import axios from "axios"


function UserItem({user}) {
	const { user: currentUser } = useContext(AuthContext)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [followings,setFollowings] = useState([])
	
	useEffect(()=>{
		const fetchFollowings=async()=>{
			try {
				const res=await axios.get("/users/followings/"+currentUser._id)
				setFollowings(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchFollowings()
	},[])
	
	const [followed, setFollowed] = useState(user.followers.includes(currentUser._id))

	
	const handleClick =async () => {
		try {
			followed? 	await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id}):
						await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
			setFollowed(!followed);
		} catch (error) {
			console.log(error)
		}
	}


	return (
		<div className="friend-menu-item">
			<img src={user.profilePicture ? user.profilePicture : PF + "/person/noAvatar.png"} alt="" />
			<div className="info">
				<div className="name info-item">{user.name}</div>
				<div className="from info-item">{user.from}</div>
				<div className="work info-item">{user.work}</div>
				<div className="btn-container info-item">
					<button onClick={handleClick}>
						{followed ? "UnFollow" : "Follow"}
					</button>
					{/* <button >Message</button> */}
				</div>

			</div>
		</div>
	)
}

export default UserItem
