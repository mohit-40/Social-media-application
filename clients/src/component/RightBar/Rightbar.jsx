import React, { useState, useEffect } from 'react'
import "./Rightbar.css"
import Online from "../Online/Online"
import { useSelector } from "react-redux"

function Rightbar() {
	//fetching reduxState
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const followings = useSelector(state=>state.following.usersId)
	const socket= useSelector(state => state.socket.socket)
	//fetched reduxState

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [onlineFriend, setOnlineFriend] = useState([]);

	//connecting to socket server 
	useEffect(() => {    
		console.log("socket useeffect called",socket)
		currentUserId && socket?.emit("addUser",currentUserId);
		socket?.on("getUsers", users => {
			setOnlineFriend(followings?.filter((fid) => users.some((u) => u.userId === fid)))
			console.log("listen to the getUser event ",socket)
		})
	}, [currentUserId,followings,socket]);

	return (
		<div className="rightbar">
			<div className="rightbar-wrapper">
				<div className="rightbar-top">
					{/* <img src={PF+"gift.png"} alt="birthdayImg" className="birthday-img" /> */}
					{/* <span className="birthday-text"><b>Rachel</b> and <b>3 other</b> friend has birthday today.</span> */}
				</div>
				<div className="rightbar-center">
					<img className="rightbar-ad" src={PF + "ad.jpg"} alt="ad" />
				</div>
				<hr />
				<div className="rightbar-bottom">
					<span className="heading">Online Friend</span>
					<ul className="online-friend-list">
						{onlineFriend?.lenght === 0
							?
							"No Friend Online Currently 😞"
							:
							onlineFriend?.map((userId) => <Online key={userId} userId={userId} />)
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Rightbar
