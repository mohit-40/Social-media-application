import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom';
import "./ProfileRightbar.css"
import CloseFriend from '../CloseFriend/CloseFriend';
import { AuthContext } from '../../Context/AuthContext';

function ProfileRightbar({user}) {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const {user:currentUser}=useContext(AuthContext)

	return (
		<div className="profile-rightbar">
			<div className="profile-rightbar-wrapper">
				<div className="user-info">
					<button className="follow-btn">{currentUser._id!==user._id &&currentUser.following.includes(user._id)?"Following" : "Follow"}</button>

					<div className="title">About {user.username}</div>
					{!user.work&&!user.school&&!user.from&&!user.live&&!user.relationship  && <div>This User Information not available</div>}
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
						{	user.following ?
							user.following.map((friendId) =>	<CloseFriend  key={friendId} className="user-friend-item" userId={friendId}/> ) :
							'you currently have no friend'
						}
				</div>

				<hr />
			</div>
		</div >
	)
}

export default ProfileRightbar
