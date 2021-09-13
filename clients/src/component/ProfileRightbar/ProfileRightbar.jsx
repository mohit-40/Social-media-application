import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import "./ProfileRightbar.css"
import { Add, Remove } from "@material-ui/icons";
import CloseFriend from '../CloseFriend/CloseFriend';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

function ProfileRightbar({ user }) {
	const { user: currentUser } = useContext(AuthContext)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [followed, setFollowed] = useState(user.followers.includes(currentUser._id));

	const handleFollow= async ()=>{
		try {
			followed? await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id}) : await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
			setFollowed(!followed);
		} catch (error) {
			console.log(error.message);
		}
	}


	return (
		<div className="profile-rightbar">
			<div className="profile-rightbar-wrapper">
			{user._id !== currentUser._id ?
					<button className="follow-btn" onClick={handleFollow}>
						{followed ? "UnFollow" : "Follow"}
						{followed ? <Remove /> : <Add />}
					</button>
				: ''}
				

				<div className="user-info">
					<div className="title">About {user.username}</div>
					{!user.work && !user.school && !user.from && !user.live && !user.relationship && <div>This User Information not available</div>}
					<div className="info">
						{user.work ? <span >Work at <b>{user.work}</b> </span> : ''}
					</div>
					<div className="info">
						{user.school ? <span >Studied at <b>{user.school}</b> </span> : ''}
					</div>
					<div className="info">
						{user.from ? <span >From <b>{user.from}</b> </span> : ''}
					</div>
					<div className="info">
						{user.live ? <span >Live in <b>{user.live}</b> </span> : ''}
					</div>
					<div className="info">
						{user.relationship ? <span >Relationship Status <b>{user.relationship}</b> </span> : ''}
					</div>
				</div>
				<hr />


				<div className="title">{user.username} friend</div>
				<div className="user-friend-container">
					{user.followings ?
						user.followings.map((friendId) => <CloseFriend key={friendId} className="user-friend-item" userId={friendId} />) :
						'you currently have no friend'
					}
				</div>

				<hr />
			</div>
		</div >
	)
}

export default ProfileRightbar
