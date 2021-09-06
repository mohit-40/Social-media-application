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
					<div className="friend-list-item">
						<img src="/asset/person/8.jpeg" alt="" />
						<span className="friend-name">Angle</span>
					</div>
					<div className="friend-list-item">
						<img src="/asset/person/10.jpeg" alt="" />
						<span className="friend-name">Peter</span>
					</div>
					<div className="friend-list-item">
						<img src="/asset/person/9.jpeg" alt="" />
						<span className="friend-name">Rachel</span>
					</div>
					<div className="friend-list-item">
						<img src="/asset/person/7.jpeg" alt="" />
						<span className="friend-name">Monica</span>
					</div>
					<div className="friend-list-item">
						<img src="/asset/person/6.jpeg" alt="" />
						<span className="friend-name">Phebie</span>
					</div>
				</div>


			</div>
		</div>
	)
}

export default Sidebar
