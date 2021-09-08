import React from 'react'
import "./Profile.css"

import Topbar from '../../component/Topbar/Topbar';
import Sidebar from '../../component/Sidebar/Sidebar';
import Feed from '../../component/Feed/Feed';
import ProfileRightbar from '../../component/ProfileRightbar/ProfileRightbar';

function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profile-right">

					<div className="profile-right-top">
						<div className="profile-cover">
							<img src={ PF + "post/3.jpeg" } alt="profileCoverPhoto" className="profile-cover-photo" />
							<img src={PF + "/person/8.jpeg"} alt="profilePhoto" className="profile-photo" />
						</div>
						<div className="profile-info">
							<h4 className="name">Rachel green</h4>
							<p className="desc">Hello My friend !! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio odit aliquid dolorum deleniti mollitia. Sit accusantium quibusdam necessitatibus esse consequatur.</p>
						</div>
					</div>


					<div className="profile-right-bottom">
						<Feed />
						<ProfileRightbar />
					</div>


				</div>
			</div>
		</>
	)
}

export default Profile
