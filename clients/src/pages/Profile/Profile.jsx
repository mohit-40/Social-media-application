import React, { useEffect, useState } from 'react'
import "./Profile.css"

import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import ProfileRightbar from '../../component/ProfileRightbar/ProfileRightbar';
import { useParams } from 'react-router';
import axios from 'axios';


function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	
	const params=useParams();
	const username=params.username;
	const [user,setUser] =useState({});

	useEffect(()=>{
		const fetchUser= async()=>{
			const res= await axios.get(`/users?username=${username}`);
			setUser(res.data); 
		}
		fetchUser();
	},[username]);
	console.log(user);

	return (
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profile-right">

					<div className="profile-right-top">
						<div className="profile-cover">
							<img src={user.coverPicture ? PF + user.coverPicture : PF + "/person/noCover.png"} alt="profileCoverPhoto" className="profile-cover-photo" />
							<img src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noAvatar.png"} alt="profilePhoto" className="profile-photo" />
						</div>
						<div className="profile-info">
							<h4 className="name">{user.username}</h4>
							<div className="desc">{user.desc}</div>
						</div>


						<div className="profile-right-bottom">
							<Feed username={user.username} />
							<ProfileRightbar user={user}/>
						</div>

					</div>

					
				</div>
			</div>
		</>
	)
}

export default Profile
