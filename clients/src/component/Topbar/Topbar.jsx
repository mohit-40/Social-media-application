import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./Topbar.css"
import {AuthContext} from "../../Context/AuthContext"


function Topbar() {
	const PF=process.env.REACT_APP_PUBLIC_FOLDER;
	const {user:currentUser}= useContext(AuthContext);

	return (
		<div className="topbar">
			<div className="topbar-left">
			<Link className='text-link' to="/"><span className="topbar-logo">Socialify</span></Link>
			</div>

			<div className="topbar-center">
				<div className="search">
					<Search className="search-icon" />
					<input type="text" name="" id="" placeholder="Search for Person or friend" />
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
					<Link className='text-link' to="/chat">
						<Chat className="topbar-icon"/>
						<span className="topbar-icon-badge">1</span>
					</Link>
					</div>
					<div className="topbar-icon-item">
						<Notifications className="topbar-icon" />
						<span className="topbar-icon-badge">1</span>
					</div>
				</div>

				<Link className='text-link' to={`/profile/${currentUser.username}`} ><img src={currentUser.profilePicture ? currentUser.profilePicture : PF + "/person/noAvatar.png"}  alt="img" /></Link>
			</div>
		</div>
	)
}

export default Topbar