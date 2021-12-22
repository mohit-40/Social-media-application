import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { Link } from "react-router-dom"
import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import ProfileRightbar from '../../component/ProfileRightbar/ProfileRightbar';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { storage } from "../../firebase/firebase";
import { useSelector } from 'react-redux'
import { io } from "socket.io-client";
import { userRequest } from '../../requestMethod';

function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const history = useHistory();
	const params = useParams();
	const username = params.username;
	const [user, setUser] = useState({});
	const [profilePic,setProfilePic] =  useState(null);
	const [coverPic,setCoverPic] =  useState(null);
	const [loaded,setLoaded]=useState(false)

	const userState = useSelector(state => state.user)
	const currentUser = userState.currentUser;

	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUser._id);
	},[currentUser]);

	
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get(`/users?username=${username}`);
				setUser(res.data);
				setLoaded(true)
			}
			catch (error) {
				history.push("/error");
				setLoaded(true)
			}
		}
		fetchUser();
	}, [username , history ]);
	

	useEffect(() => {
		const call=async ()=>{
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
							await userRequest.put("/users/"+ user._id,updatedUser);
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
							await userRequest.put("/users/"+ user._id,updatedUser);
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
	}, [coverPic,profilePic,currentUser._id ,history , user._id, user.username ]);


	return loaded&&(
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profile-right">

					<div className="profile-right-top">
						<div className="profile-cover">
							<img src={user.coverPicture ? user.coverPicture : PF + "/person/noCover.png"} alt="profileCoverPhoto" className="profile-cover-photo" />
							<img src={user.profilePicture ? user.profilePicture : PF + "/person/noAvatar.png"} alt="profilePhoto" className="profile-photo" />
							{currentUser._id === user._id ?
								<>
									<label htmlFor="cover-pic" className="change-cover-label">
										Change Cover
										<input type="file" name="cover-pic" id="cover-pic" style={{ display: "none" }} className="change-cover" onChange={(e) => setCoverPic(e.target.files[0])} />
									</label>
									<label htmlFor="profile-pic" className="change-profile-label">
										Change Profile
										<input type="file" name="profile-pic" id="profile-pic" style={{ display: "none" }} className="profile-cover" onChange={(e) => setProfilePic(e.target.files[0])} />
									</label>
									<Link to="/updateInfo">
										<button className="update-info-btn cover-pic">Update Info</button>
									</Link>
								</>
								:
								''
							}
						</div>
						<div className="profile-info">
							<h4 className="name">{user.name}</h4>
							<div className="desc">{user.desc}</div>
						</div>


						<div className="profile-right-bottom">
							<Feed username={user.username} />
							<ProfileRightbar user={user} />
						</div>

					</div>


				</div>
			</div>
		</>
	)
}

export default Profile
