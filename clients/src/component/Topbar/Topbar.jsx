import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./Topbar.css"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/exportAllAction"
import { userRequest } from '../../requestMethod';

function Topbar() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	//fetching currentuser
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const [currentUser, setCurrentUser] = useState(null);
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userRequest.get("/users?userId=" + currentUserId);
				setCurrentUser(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser();
	}, [currentUserId, setCurrentUser])
	//fetched currentUser

	const [search, setSearch] = useState('')
	const dispatch = useDispatch();
	
	const [allUsers, setAllUsers] = useState([])
	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const res = await userRequest.get("/users/allUsers")
				setAllUsers(res.data); 
			} catch (error) {
				console.log(error)
			}
		}
		fetchAllUsers()
	}, [ ])

	const handleLogout = () => {
		dispatch(logout(currentUserId));
	}


	return (
		<div className="topbar">
			<div className="topbar-left">
				<Link className='text-link' to="/"><span className="topbar-logo">Socialify</span></Link>
			</div>

			<div className="topbar-center">
				<div className="search">
					<Search className="search-icon" />
					<input type="text" name="" id="" placeholder="Search for Person or friend" onChange={(e)=> setSearch(e.target.value)} />
					<div className="search-result">
						{allUsers.filter((user) => search !== "" && user?.name?.toLowerCase().includes(search.toLowerCase())).slice(0, 5).map((user) => {
							return (
								<Link key={user._id} className="search-result-item" to={`/profile/${user.username}`}>
									<div >{user.name}</div>
								</Link>
							)
						}) }
					</div>

				</div>
			</div>

			<div className="topbar-right">
				<div className="topbar-link-container">
					<Link className='text-link' to={`/profile/${currentUser?.username}`}><span className="topbar-link">Home</span></Link>
					<Link className='text-link' to="/"><span className="topbar-link">Timeline</span></Link>
					<span className="topbar-link" onClick={handleLogout}>Logout</span>
				</div>
				<div className="topbar-icon-container">
					<div className="topbar-icon-item">
						<Person className="topbar-icon" />
						<span className="topbar-icon-badge">1</span>
					</div>
					<div className="topbar-icon-item">
						<Link className='text-link' to="/chat">
							<Chat className="topbar-icon" />
							<span className="topbar-icon-badge">1</span>
						</Link>
					</div>
					<div className="topbar-icon-item">
						<Notifications className="topbar-icon" />
						<span className="topbar-icon-badge" >1</span>
					</div>
				</div>

				<Link className='text-link' to={`/profile/${currentUser?.username}`} ><img src={currentUser?.profilePicture ? currentUser?.profilePicture : PF + "/person/noAvatar.png"} alt="img" /></Link>
			</div>
		</div>
	)
}

export default Topbar