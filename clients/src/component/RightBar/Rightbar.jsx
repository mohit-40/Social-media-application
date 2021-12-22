import React, { useState, useEffect } from 'react'
import "./Rightbar.css"
import Online from "../Online/Online"
import { io } from "socket.io-client";
import { useSelector } from "react-redux"
import { userRequest } from '../../requestMethod';

function Rightbar() {
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get("/users?userId=" + currentUserId);
				setCurrentUser(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser();
	}, [currentUserId, setCurrentUser])
	//fetched currentUser

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [onlineFriend, setOnlineFriend] = useState([]);

	//connecting to socket server 
	useEffect(() => {
		const socket = io.connect("ws://localhost:8900");
		socket.emit("addUser", currentUserId);
		socket.on("getUsers", users => {
			setOnlineFriend(currentUser?.followings.filter((f) => users.some((u) => u.userId === f)))
		})
	}, [currentUserId,currentUser]);



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
