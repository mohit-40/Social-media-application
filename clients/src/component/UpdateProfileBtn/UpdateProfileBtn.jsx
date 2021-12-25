import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { storage } from "../../firebase/firebase";
import { userRequest } from '../../requestMethod';
import "./UpdateProfileBtn.css"


function UpdateProfileBtn({userId}) {
	//fetching reduxState
	const currentUserId = useSelector(state => state.user.currentUserId)
	//fetched reduxState
	const params = useParams()
	const history = useHistory()
	const [profilePic, setProfilePic] = useState(null);
	const [coverPic, setCoverPic] = useState(null);
	const username = params.username;
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get(`/users?username=${username}`);
				setUser(res.data); 
			}
			catch (error) {
				history.push("/error"); 
			}
		}
		fetchUser();
	}, [username, history]);


	useEffect(() => {
		const call = async () => {
			const updatedUser = {
				userId: currentUserId,
			}
			if (coverPic) {
				try {
					const coverPicName = Date.now() + coverPic.name
					const uploadTask = storage.ref(`${user.username}/coverPic/${coverPicName}`).put(coverPic);
					await uploadTask.on("state_changed", snapshot => { }, error => { console.log(error); },
						async () => {
							await storage.ref(`${user.username}/coverPic`).child(coverPicName).getDownloadURL().then((imgurl) => { updatedUser.coverPicture = imgurl })
							await userRequest.put("/users/" + user._id, updatedUser);
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
					await uploadTask.on("state_changed", snapshot => { }, error => { console.log(error); },
						async () => {
							await storage.ref(`${user.username}/profilePic`).child(profilePicName).getDownloadURL().then((imgurl) => { updatedUser.profilePicture = imgurl })
							await userRequest.put("/users/" + user._id, updatedUser);
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
	}, [coverPic, profilePic, currentUserId, history, user._id, user.username]);

	return (
		<>
		{ currentUserId === userId ?
			<div className="profile-top-btn-container">
				<label htmlFor="cover-pic" className="profile-top-btn">
					<i className="fas fa-images"></i>
					Change Cover
					<input type="file" name="cover-pic" id="cover-pic" style={{ display: "none" }} className="change-cover" onChange={(e) => setCoverPic(e.target.files[0])} />
				</label>
				<label htmlFor="profile-pic" className="profile-top-btn">
					<i className="fas fa-user"></i>
					Change Profile
					<input type="file" name="profile-pic" id="profile-pic" style={{ display: "none" }} className="profile-cover" onChange={(e) => setProfilePic(e.target.files[0])} />
				</label>
				<Link to="/updateInfo">
					<button className="profile-top-btn cover-pic"> <i className="fas fa-pen"></i> Update Info</button>
				</Link>
			</div>
			:
			''
		}
		</>
	)
}

export default UpdateProfileBtn
