import React from 'react'
import {  Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./Topbar.css"



function topbar() {
	return (
		<>
			<div className="topbar-container">
				<div className="topbar-left">
					<span className="topbar-logo">SOCIALIFY</span>
				</div>
				<div className="topbar-center">
					<div className="topbar-search"> 
						<Search className="search-icon"/>
					 	<input type="text" placeholder="search for people post or video" />
					</div>
				</div>
				<div className="topbar-right">
					<div className="topbar-link">
						<span className="topbar-link-item">Home</span>
						<span className="topbar-link-item">Timeline</span>
					</div>
					<div className="topbar-icon">
						<div className="topbar-icon-item">
							<Notifications />
							<span className="topbar-icon-badge">1</span>
						</div>
						<div className="topbar-icon-item">
							<Person />
							<span className="topbar-icon-badge">1</span>
						</div>
						<div className="topbar-icon-item">
							<Chat />
							<span className="topbar-icon-badge">1</span>
						</div>
					</div>
					<img src="/asset/person/1.jpeg" alt="img" className="topbar-img" />
				</div>

			</div>
		</>
	)
}

export default topbar;