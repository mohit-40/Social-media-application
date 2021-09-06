import React from 'react'
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./Topbar.css"

function Topbar() {
	return (
		<div className="topbar">
			<div className="topbar-left">
				<span className="topbar-logo">Socialify</span>
			</div>

			<div className="topbar-center">
				<div className="search">
					<Search className="search-icon" />
					<input type="text" name="" id="" placeholder="Search for Person, Post or Images" />
				</div>
			</div>

			<div className="topbar-right">
				<div className="topbar-link-container">
					<span className="topbar-link">Home</span>
					<span className="topbar-link">Timeline</span>
				</div>
				<div className="topbar-icon-container">
					<div className="topbar-icon-item">
						<Person className="topbar-icon" />
						<span className="topbar-icon-badge">1</span>
					</div>
					<div className="topbar-icon-item">
						<Chat className="topbar-icon"/>
						<span className="topbar-icon-badge">1</span>
					</div>
					<div className="topbar-icon-item">
						<Notifications className="topbar-icon" />
						<span className="topbar-icon-badge">1</span>
					</div>
				</div>

				<img src="\asset\person\1.jpeg" alt="img" />
			</div>
		</div>
	)
}

export default Topbar