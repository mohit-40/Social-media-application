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
	const dispatch = useDispatch();
	const followings = useSelector(state => state.following.usersId)
	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		const fetchFollowing = async () => {
			try {
				const res = await userRequest.get("/users/followings/" + currentUserId)
				dispatch(updateFollowing(res.data))
				setLoaded(true)
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchFollowing()
	}, [currentUserId, dispatch]);
	const [showSidebar, setShowSidebar] = useState(true);
	useEffect(()=>{
		if(window.innerWidth <= 600){
			setShowSidebar(false);
		}
	},[])

	return loaded && (

		<>
			{showSidebar ? <i className="fas fa-caret-square-left caret-left caret-sidebar" style={{ fontSize: "25px" }} onClick={() => setShowSidebar(!showSidebar)}></i>:<i className="fas fa-caret-square-right caret-right caret-sidebar" style={{ fontSize: "25px" }} onClick={() => setShowSidebar(!showSidebar)}></i>} 	
			<div className={showSidebar ? "sidebar showSidebar" : "sidebar hideSidebar"} >
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
							<Link className='text-link' to="/friendPage?type=all" >
								<PersonAdd className="menu-list-icon" />
								<span className="menu-list-text">Find Friend</span>
							</Link>
						</li>
					</ul>

					{/* <button className="sidebar-btn">Show More</button> */}
					<hr />

					<div className="friend-list">
						<h2 className="heading"><span className="follower-following-counter"><i className="fas fa-users" style={{ fontSize: "25px" }}></i> My Followings  ({followings.length})</span></h2>
						{followings.length !== 0 ?
							followings.slice(0, 5).map((followingId) => <CloseFriend key={followingId} userId={followingId} className="friend-list-item" />)
							: 'Currently no followings'
						}
						<Link className='text-link' to={{ pathname: `/friendPage`, search: `type=Myfollowings`, state: { usersId: followings } }} >
							<button className="show-all" >Show All</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar
