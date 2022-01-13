import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { Link } from "react-router-dom"
import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import ProfileRightbar from '../../component/ProfileRightbar/ProfileRightbar';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { userRequest } from '../../requestMethod';

function Profile() {
	let PF = process.env.REACT_APP_PUBLIC_FOLDER;
	if(process.env.NODE_ENV=="production"){
		PF=process.env.REACT_APP_PUBLIC_FOLDER_DEPLOY
	}
	const history = useHistory();
	const params = useParams();
	const username = params.username;
	const [user, setUser] = useState({});
	const [loaded, setLoaded] = useState(false)

	
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
	}, [username, history]);

	return loaded && (
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profile-right">

					<div className="profile-right-top">
						<div className="profile-cover">
							<img src={user.coverPicture ? user.coverPicture : PF + "/person/noCover.png"} alt="profileCoverPhoto" className="profile-cover-photo" />
							<img src={user.profilePicture ? user.profilePicture : PF + "/person/noAvatar.png"} alt="profilePhoto" className="profile-photo" />
							
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
