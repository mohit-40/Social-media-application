import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import "./UserItem.css"
import { userRequest } from '../../requestMethod'
import { useDispatch } from 'react-redux'
import { follow, unfollow, updateFollowing } from '../../redux/exportAllAction'
import { Link } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


function UserItem({ userId }) {
	const history=useHistory();
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	//fetched currentUser

	let PF = process.env.REACT_APP_PUBLIC_FOLDER;
	if(process.env.NODE_ENV==="production"){
		PF=process.env.REACT_APP_PUBLIC_FOLDER_DEPLOY
	}
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
		<>
			<div className="friendMenuItem">
				<div className="friendMenuItemImgContainer">
					<img src={user?.profilePicture ? user?.profilePicture : PF + "/person/noAvatar.png"} alt="" className="friendMenuItemImg" />
				</div>
				<div className="friendMenuItemContent">
					<div className="friendMenuItemLeft">
						<div className="top"><b>{user?.name}</b></div>
						<div className="bottom">
							<div className="from info-item"><i className="fas fa-building"></i> {user?.from}</div>
							<div className="work info-item"><i className="fas fa-briefcase"></i> {user?.work}</div>
							<div className="work info-item"><i className="fas fa-university"></i> {user?.school}</div>
						</div>
					</div>
					<div className="friendMenuItemRight">
						{
							userId !== currentUserId ?
							<>
								<button onClick={handleClick} className='friendMenuItemRightButton'>
									{followed ?  <i className="fas fa-user-minus" >  UnFollow</i> :   <i className="fas fa-user-plus"> Follow</i> }
								</button>
								<button className='friendMenuItemRightButton' onClick={()=>history.push(`/profile/${user?.username}`)}> <i className="fas fa-user-alt"></i> Profile</button>
							</>
								:
								""
						}
					</div>
				</div>
			</div>

		</>
	)
}

export default UserItem;
