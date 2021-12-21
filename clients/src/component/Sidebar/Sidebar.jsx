import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Sidebar.css"
import { RssFeed, Chat, PersonAdd } from "@material-ui/icons";
import CloseFriend from "../CloseFriend/CloseFriend"
import {useSelector} from "react-redux"
import axios from 'axios';

function Sidebar() {

	const userState = useSelector(state => state.user)
	const currentUser = userState.currentUser;
	
	const [followings, setFollowings] = useState([])
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		const fetchFollowing = async () => {
			const res = await axios.get("/users/followings/" + currentUser._id)
			setFollowings(res.data)
			setLoaded(true)
		}
		fetchFollowing()
	}, [currentUser]);


	return loaded && (
		<div className="sidebar">
			<div className="sidebar-wrapper">

				<ul className="menu-list">
					<li className="menu-list-item">
						<Link className='text-link' to="/">
							<RssFeed className="menu-list-icon" />
							<span className="menu-list-text">Feed</span>
						</Link>
					</li>
					<li className="menu-list-item">
						<Link className='text-link' to="/chat">
							<Chat className="menu-list-icon" />
							<span className="menu-list-text">Chats</span>
						</Link>
					</li>
					<li className="menu-list-item">
						<Link className='text-link' to={{ pathname: `/friendPage`, state: { users: [], all: true } }} >
							<PersonAdd className="menu-list-icon" />
							<span className="menu-list-text">Find Friend</span>
						</Link>
					</li>
				</ul>


				{/* <button className="sidebar-btn">Show More</button> */}
				<hr />




				<div className="friend-list">
					<h2 className="heading">My Friend <span className="follower-following-counter">({followings.length})</span></h2>
					{followings.length !== 0 ?
						followings.slice(0, 3).map((user) => <CloseFriend key={user._id} user={user} className="friend-list-item" />)
						: 'you currently have no friend'
					}
					<Link className='text-link' to={{ pathname: `/friendPage`, state: { users: followings} }} >
						<button className="show-all">Show All</button>
					</Link>
				</div>


			</div>
		</div>
	)
}

export default Sidebar
