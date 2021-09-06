import React from 'react'
import "./Sidebar.css"
import {
	RssFeed,
	Chat,
	PlayCircleFilledOutlined,
	Group,
	Bookmark,
	HelpOutline,
	WorkOutline,
	Event,
	School,
} from "@material-ui/icons";
import CloseFriend from "../CloseFriend/CloseFriend"
import {Users} from "../../dummy-data"


function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebar-wrapper">

				<ul className="menu-list">
					<li className="menu-list-item">
						<RssFeed className="menu-list-icon" />
						<span className="menu-list-text">Feed</span>
					</li>
					<li className="menu-list-item">
						<Chat className="menu-list-icon" />
						<span className="menu-list-text">Chats</span>
					</li>
					<li className="menu-list-item">
						<PlayCircleFilledOutlined className="menu-list-icon" />
						<span className="menu-list-text">Videos</span>
					</li>
					<li className="menu-list-item">
						<Group className="menu-list-icon" />
						<span className="menu-list-text">Group</span>
					</li>
					<li className="menu-list-item">
						<Bookmark className="menu-list-icon" />
						<span className="menu-list-text">Bookmark</span>
					</li>
					<li className="menu-list-item">
						<HelpOutline className="menu-list-icon" />
						<span className="menu-list-text">Question</span>
					</li>
					<li className="menu-list-item">
						<WorkOutline className="menu-list-icon" />
						<span className="menu-list-text">Job</span>
					</li>
					<li className="menu-list-item">
						<Event className="menu-list-icon" />
						<span className="menu-list-text">Calender</span>
					</li>
					<li className="menu-list-item">
						<School className="menu-list-icon" />
						<span className="menu-list-text">Education</span>
					</li>
				</ul>


				<button className="sidebar-btn">Show More</button>
				<hr />




				<div className="friend-list">
					{Users.map((user)=> <CloseFriend user={user} />)}
				</div>


			</div>
		</div>
	)
}

export default Sidebar
