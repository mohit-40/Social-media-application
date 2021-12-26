import React, { useState, useEffect } from 'react'
import "./Rightbar.css"
import Online from "../Online/Online"
import { useSelector } from "react-redux"

function Rightbar() {
	//fetching reduxState
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const followings = useSelector(state => state.following.usersId)
	const socket = useSelector(state => state.socket.socket)
	//fetched reduxState

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [onlineFriend, setOnlineFriend] = useState([]);

	//connecting to socket server 
	useEffect(() => {
		console.log()
		currentUserId && socket?.emit("addUser", currentUserId);
		socket?.on("getUsers", users => {
			setOnlineFriend(followings?.filter((fid) => users.some((u) => u.userId === fid)))
		})
	}, [currentUserId, followings, socket]);
	const [showRightbar, setShowRightbar] = useState(false);

	return (
		<>
			{showRightbar ? <i className="fas fa-caret-square-left caret-left caret-rightbar" style={{ fontSize: "25px" }} onClick={() => setShowRightbar(!showRightbar)}></i>:<i className="fas fa-caret-square-right caret-right caret-rightbar" style={{ fontSize: "25px" }} onClick={() => setShowRightbar(!showRightbar)}></i>}
			<div className={showRightbar ? "rightbar showRightbar" : "rightbar hideRightbar"}>
				<div className="rightbar-wrapper">
					<div className="rightbar-top">
						{/* <img src={PF+"gift.png"} alt="birthdayImg" className="birthday-img" /> */}
						{/* <span className="birthday-text"><b>Rachel</b> and <b>3 other</b> friend has birthday today.</span> */}
					</div>
					<div className="rightbar-center">
						<div className="rightbarCenterImgContainer">
							<img className="rightbar-ad" src={PF + "ad.jpg"} alt="ad" />
						</div>
					</div>
					<hr />
					<div className="rightbar-bottom">
						<span className="heading"><i class="fas fa-globe-americas"></i> Online Friend</span>

						<ul className="online-friend-list">
							{
								onlineFriend.length === 0 ? "No Friend Online Currently 😞"
									:
									onlineFriend?.map((userId) => <Online key={userId} userId={userId} />)
							}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Rightbar
