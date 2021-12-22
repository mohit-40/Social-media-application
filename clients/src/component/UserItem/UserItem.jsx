import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import "./UserItem.css"
import { userRequest } from '../../requestMethod'


function UserItem({user}) {

	const userState = useSelector(state => state.user)
	const currentUser = userState.currentUser;
	
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [followings,setFollowings] = useState([])
	
	useEffect(()=>{
		const fetchFollowings=async()=>{
			try {
				const res=await userRequest.get("/users/followings/"+currentUser._id)
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
			followed? 	await userRequest.put("/users/"+user._id+"/"+ currentUser._id +"/unfollow"):
						await userRequest.put("/users/"+user._id+"/"+ currentUser._id +"/unfollow" )
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
