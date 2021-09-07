import React from 'react'
import "./Rightbar.css"
import Online from "../Online/Online"
import { Users } from "../../dummy-data"


function Rightbar() {

	return (
		<div className="rightbar">
			<div className="rightbar-wrapper">
				<div className="rightbar-top">
					<img src="/asset/gift.png" alt="birthdayImg" className="birthday-img" />
					<span className="birthday-text"><b>Rachel</b> and <b>3 other</b> friend has birthday today.</span>
				</div>
				<div className="rightbar-center">
					<img className="rightbar-ad" src="/asset/ad.png" alt="ad" />
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
