import React from 'react'
import "./Rightbar.css"
import Online from "../Online/Online"
import { Users } from "../../dummy-data"


function Rightbar() {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="rightbar">
			<div className="rightbar-wrapper">
				<div className="rightbar-center">
					<img className="rightbar-ad" src={PF+"ad.png"} alt="ad" />
				</div>
				<hr />
				<div className="rightbar-bottom">
					<span className="heading">Online Friend</span>
					<ul className="online-friend-list">
						{Users.map((user) => <Online key={user.id} user={user}/>)}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Rightbar
