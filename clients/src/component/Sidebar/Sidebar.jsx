import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./Sidebar.css"
import { RssFeed, Chat, PersonAdd } from "@material-ui/icons";
import CloseFriend from "../CloseFriend/CloseFriend"
import { useSelector } from "react-redux"
import { userRequest } from '../../requestMethod';
import { useDispatch } from 'react-redux';
import { updateFollowing } from '../../redux/exportAllAction';

function Sidebar() {
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	//fetched currentUser
	const dispatch= useDispatch();
	const followings = useSelector(state=> state.following.usersId)
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		const fetchFollowing = async () => {
			const res = await userRequest.get("/users/followings/" + currentUserId)
			dispatch(updateFollowing(res.data))
			setLoaded(true)
		}
		fetchFollowing()
	}, [currentUserId,dispatch]);


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
						<Link className='text-link' to={{ pathname: `/friendPage`, state: { usersId: [], all: true } }} >
							<PersonAdd className="menu-list-icon" />
							<span className="menu-list-text">Find Friend</span>
						</Link>
					</li>
				</ul>


				{/* <button className="sidebar-btn">Show More</button> */}
				<hr />




				<div className="friend-list">
					<h2 className="heading">My Followings <span className="follower-following-counter">({followings.length})</span></h2>
					{followings.length !== 0 ?
						followings.slice(0, 3).map((followingId) => <CloseFriend key={followingId} userId={followingId} className="friend-list-item" />)
						: 'currently no followings'
					}
					<Link className='text-link' to={{ pathname: `/friendPage`, state: { usersId: followings } }} >
						<button className="show-all">Show All</button>
					</Link>
				</div>


			</div>
		</div>
	)
}

export default Sidebar
