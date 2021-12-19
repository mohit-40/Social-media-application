import React, { useRef, useState } from 'react'
import Topbar from "../../component/Topbar/Topbar"
import { AuthContext } from '../../Context/AuthContext';
import "./UpdateInfo.css"
import axios from "axios"
import { useHistory } from 'react-router';

import { useContext,useEffect } from "react";
import { io } from "socket.io-client"; 


function UpdateInfo() {
	const {user:currentUser} =useContext(AuthContext)
	const [updated,setUpdated]=useState()
	const name = useRef();
	const from = useRef();
	const live = useRef();
	const work = useRef();
	const school = useRef();
	const relationship = useRef();
	const desc = useRef();
	const history=useHistory();

	
	//connecting to socket server 
	useEffect(()=>{
		const socket = io.connect("ws://localhost:8900"); 
		socket.emit("addUser", currentUser._id);
	},[currentUser]);


	const handleSubmit=async (e)=>{
		e.preventDefault()
		const body={
			userId:currentUser._id,
			name:name.current.value,
			from:from.current.value,
			live:live.current.value,
			work:work.current.value,
			school:school.current.value,
			desc:desc.current.value,
			relationship:relationship.current 
		}
		console.log(body)
		try {
			const res =await axios.put("/users/"+currentUser._id,body);
			setUpdated(true)
			console.log(res)
			history.push("/profile/"+currentUser.username)
		} catch (error) {
			console.log(error)
		}
		
	}


	return (
		<>
			<Topbar />
			<div className="profile-update">

				{updated ? "the profile Infomation is now updated" : ''}

				<form className="profile-update-form" onSubmit={handleSubmit}>
					<input type="text" ref={name} placeholder="Name" defaultValue={currentUser.name} required/>
					<input type="text" ref={from} placeholder="From" defaultValue={currentUser.from} required />
					<input type="text" ref={live} placeholder="Live" defaultValue={currentUser.live} required />
					<input type="text" ref={work} placeholder="Work" defaultValue={currentUser.work} required />
					<input type="text" ref={school} placeholder="School" defaultValue={currentUser.school} required />

					<h3>Relationship Status</h3>
					<div className="relationshipStatus">
						<label htmlFor="single"><span> Single </span><input type="radio" name="relationship" id="single" value="1" onChange={(e)=>relationship.current=e.target.value }/> </label>
						<label htmlFor="inRelationship"> In a relationship <input type="radio" name="relationship" id="inRelationship" value="2" onChange={(e)=>relationship.current=e.target.value }/>  </label>
						<label htmlFor="complicated"> Complicated <input type="radio" name="relationship" id="complicated" value="3" onChange={(e)=>relationship.current=e.target.value } /> </label>
					</div>

					<textarea name="" id="" cols="30" rows="5" ref={desc} placeholder="Write Something About You Here" defaultValue={currentUser.desc} required ></textarea>
					<button type="submit">Save</button>
				</form>
			</div>
		</>
	)
}

export default UpdateInfo
