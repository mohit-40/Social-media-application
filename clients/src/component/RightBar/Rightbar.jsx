import React , { useState ,useEffect } from 'react'
import "./Rightbar.css"
import Online from "../Online/Online" 
import { io } from "socket.io-client";
import {useSelector} from "react-redux"

function Rightbar() {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;
	const [onlineFriend, setOnlineFriend] = useState([]);	
	
	const userState = useSelector(state => state.user)
	const currentUser = userState.currentUser;
	
	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUser._id);
		socket.on("getUsers" , users=>{ 
			setOnlineFriend(currentUser.followings.filter((f) => users.some((u) => u.userId === f)))  
		})
	},[currentUser]);



	return (
		<div className="rightbar">
			<div className="rightbar-wrapper">
				<div className="rightbar-top">
					{/* <img src={PF+"gift.png"} alt="birthdayImg" className="birthday-img" /> */}
					{/* <span className="birthday-text"><b>Rachel</b> and <b>3 other</b> friend has birthday today.</span> */}
				</div>
				<div className="rightbar-center">
					<img className="rightbar-ad" src={PF+"ad.jpg"} alt="ad" />
				</div>
				<hr />
				<div className="rightbar-bottom">
					<span className="heading">Online Friend</span>
					<ul className="online-friend-list">
						{	onlineFriend.lenght===0
							?
							"No Friend Online Currently 😞"
							:
							onlineFriend.map((userId) => <Online key={userId} userId={userId}/>)
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Rightbar
