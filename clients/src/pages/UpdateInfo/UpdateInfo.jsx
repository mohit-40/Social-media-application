import React, { useContext,useRef } from 'react'
import Topbar from "../../component/Topbar/Topbar"
import { AuthContext } from '../../Context/AuthContext';
import "./UpdateInfo.css"

function UpdateInfo() {
	const {user:currentUser} =useContext(AuthContext)
	const name = useRef();
	const from = useRef();
	const live = useRef();
	const work = useRef();
	const school = useRef();
	const relationship = useRef();
	const desc = useRef();



	return (
		<>
			<Topbar />
			<div className="profile-update">
				<form className="profile-update-form">
					<input type="text" ref={name} placeholder="Name" value={currentUser.name}/>
					<input type="text" ref={from} placeholder="From" value={currentUser.from}/>
					<input type="text" ref={live} placeholder="Live" value={currentUser.live}/>
					<input type="text" ref={work} placeholder="Work" value={currentUser.work}/>
					<input type="text" ref={school} placeholder="School" value={currentUser.school}/>

					<h3>Relationship Status</h3>
					<div className="relationshipStatus">
						<label htmlFor="single"><span> Single </span><input type="radio" name="relationship" id="single" value="1" /> </label>
						<label htmlFor="inRelationship"> In a relationship <input type="radio" name="relationship" id="inRelationship" value="2" />  </label>
						<label htmlFor="complicated"> Complicated <input type="radio" name="relationship" id="complicated" value="3" /> </label>
					</div>

					<textarea name="" id="" cols="30" rows="5" ref={desc} placeholder="Write Something About You Here" value={currentUser.name} ></textarea>
					<button type="submit">Save</button>
				</form>
			</div>
		</>
	)
}

export default UpdateInfo
