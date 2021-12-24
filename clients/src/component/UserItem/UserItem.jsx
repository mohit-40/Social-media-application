import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import "./UserItem.css"
import { userRequest } from '../../requestMethod'
import { useDispatch } from 'react-redux'
import { follow, unfollow, updateFollowing } from '../../redux/exportAllAction'


function UserItem({ userId }) {
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	//fetched currentUser

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const dispatch = useDispatch();
	const followings = useSelector(state => state.following.usersId);
	//updateFollowing
	useEffect(() => {
		const fetchFollowings = async () => {
			try {
				const res = await userRequest.get("/users/followings/" + currentUserId)
				dispatch(updateFollowing(res.data))
			} catch (error) {
				console.log(error)
			}
		}
		fetchFollowings()
	}, [currentUserId, dispatch])

	//fetch user
	const [user, setUser] = useState();
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get("/users?userId=" + userId)
				setUser(res.data)
				setFollowed(res.data.followers.includes(currentUserId))
			} catch (error) {
				console.log(error)
			}
		}
		fetchUser();
	}, [userId, currentUserId])

	const [followed, setFollowed] = useState(user?.followers.includes(currentUserId))



	const handleClick = async () => {
		try {
			if (followed) {
				await userRequest.put("/users/" + userId + "/" + currentUserId + "/unfollow")
				dispatch(unfollow(userId))
				setFollowed(!followed);
			}
			else {
				await userRequest.put("/users/" + userId + "/" + currentUserId + "/follow")
				dispatch(follow(userId))
				setFollowed(!followed);
			}
		} catch (error) {
			console.log(error)
		}
	}


	return (
		<div className="friend-menu-item">
			<img src={user?.profilePicture ? user?.profilePicture : PF + "/person/noAvatar.png"} alt="" />
			<div className="info">
				<div className="name info-item">{user?.name}</div>
				<div className="from info-item">{user?.from}</div>
				<div className="work info-item">{user?.work}</div>
				<div className="btn-container info-item">
					{
						userId !== currentUserId ?
							<button onClick={handleClick}>
								{followed ? "UnFollow" : "Follow"}
							</button>
							:
							""
					}
					{/* <button >Message</button> */}
				</div>

			</div>
		</div>
	)
}

export default UserItem
