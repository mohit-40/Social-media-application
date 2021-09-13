import React, { useContext, useEffect, useState } from 'react'
import "./Profile.css"

import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import ProfileRightbar from '../../component/ProfileRightbar/ProfileRightbar';
import { useParams } from 'react-router';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import {storage} from "../../firebase/firebase"

function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const history=useHistory();	
	const params=useParams();
	const username=params.username;
	const [user,setUser] =useState({});
	const {user:currentUser}=useContext(AuthContext)

	useEffect(()=>{
		const fetchUser= async()=>{
			try {
				const res= await axios.get(`/users?username=${username}`);
				setUser(res.data); 	
			} 
			catch (error) {
				history.push("/error");
			}
		}
		fetchUser();
	},[username]);


	const [profilePic,setProfilePic] =  useState(null);
	const [coverPic,setCoverPic] =  useState(null);

	useEffect(() => {
		const call=async ()=>{
			console.log(profilePic)
			const updatedUser={ 
				userId: currentUser._id ,
			}
			if (coverPic) {
				try {
					const coverPicName = Date.now() + coverPic.name
					const uploadTask = storage.ref(`${user.username}/coverPic/${coverPicName}`).put(coverPic);
					await uploadTask.on( "state_changed", snapshot => { }, error => { console.log(error); },
						async () => {
							await storage.ref(`${user.username}/coverPic`).child(coverPicName).getDownloadURL().then((imgurl )=> { updatedUser.coverPicture=imgurl})
							await axios.patch("/users/"+ user._id,updatedUser);
							setCoverPic(null)
							window.location.reload();
						}
					)
				}
				catch (error) {
					console.log(error.message)
					history.push("/error")
				}
			}
			else if (profilePic) {
				try {
					const profilePicName = Date.now() + profilePic.name
					const uploadTask = storage.ref(`${user.username}/profilePic/${profilePicName}`).put(profilePic);
					await uploadTask.on( "state_changed", snapshot => { }, error => { console.log(error); },
						async () => {
							await storage.ref(`${user.username}/profilePic`).child(profilePicName).getDownloadURL().then((imgurl )=> { updatedUser.profilePicture=imgurl})
							await axios.patch("/users/"+ user._id,updatedUser);
							setProfilePic(null)
							window.location.reload();
						}
					)
				}
				catch (error) {
					console.log(error.message)
					history.push("/error")
				}
			}
		} 
		call();
	}, [coverPic,profilePic]);



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
