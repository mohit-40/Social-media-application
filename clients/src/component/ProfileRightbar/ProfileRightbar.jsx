import React from 'react'
import "./ProfileRightbar.css"

function ProfileRightbar() {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="profile-rightbar">
			<div className="profile-rightbar-wrapper">
				<div className="user-info">
					<div className="title">User Infomation</div>
					<div className="info">
						<span >Work at <b>letina coorporation</b> </span>
					</div>
					<div className="info">
						<span >Studied at <b>Harward University</b> </span>
					</div>
					<div className="info">
						<span >From <b>California ,USA</b> </span>
					</div>
					<div className="info">
						<span >Live in <b>New York ,USA</b> </span>
					</div>
					<div className="info">
						<span >Relationship Status <b>Single</b> </span>
					</div>
				</div>
				<hr />
				<div className="title">User friend</div>
				<div className="user-friend-container">
					<div className="user-friend-item">
						<img src={PF+"person/6.jpeg"} alt="img" />
						<div className="name">abc</div>
					</div>
					<div className="user-friend-item">
						<img src={PF + "person/5.jpeg"} alt="img" />
						<div className="name">abc</div>
					</div>
					<div className="user-friend-item">
						<img src={PF + "person/4.jpeg"} alt="img" />
						<div className="name">abc</div>
					</div>
					<div className="user-friend-item">
						<img src={PF + "person/2.jpeg"} alt="img" />
						<div className="name">abc</div>
					</div>
					<div className="user-friend-item">
						<img src={PF + "person/3.jpeg"} alt="img" />
						<div className="name">abc</div>
					</div>
					<div className="user-friend-item">
						<img src={PF + "person/2.jpeg"} alt="img" />
						<div className="name">abc</div>
					</div>
					<div className="user-friend-item">
						<img src={PF + "person/3.jpeg"} alt="img" />
						<div className="name">abc</div>
					</div>
				</div>

				<hr />
			</div>
		</div>
	)
}

export default ProfileRightbar
