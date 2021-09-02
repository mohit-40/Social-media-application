import React from 'react'
import {  Search, Person, Chat, Notifications } from "@material-ui/icons";

function topbar() {
	return (
		<>
			<div className="topbar-container">
				<div className="topbar-left">
					<span className="topbar-logo">SOCIALIFY</span>
				</div>
				<div className="topbar-middle">
					<div className="topbar-search"> 
						<Search />
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
							<div className="topbar-icon-item-badge">1</div>
						</div>
						<div className="topbar-icon-item">
							<Person />
							<div className="topbar-icon-item-badge">1</div>
						</div>
						<div className="topbar-icon-item">
							<Chat />
							<div className="topbar-icon-item-badge">1</div>
						</div>
					</div>
					<img src="/asset/person/1.jpeg" alt="img" className="topbar-img" />
				</div>

			</div>
		</>
	)
}

export default topbar
