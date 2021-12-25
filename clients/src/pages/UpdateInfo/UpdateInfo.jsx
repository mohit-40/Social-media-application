import React, { useRef, useState } from 'react'
import Topbar from "../../component/Topbar/Topbar" 
import "./UpdateInfo.css"
import { useHistory } from 'react-router';

import { useEffect } from "react"; 
import { useSelector } from 'react-redux'
import { userRequest } from '../../requestMethod';


function UpdateInfo() {
	const followings = useSelector(state => state.following.usersId)
	const userState = useSelector(state => state.user)
	const currentUserId = userState.currentUserId;
	const [currentUser, setCurrentUser]= useState(null);
	//fetching currentUser
	useEffect(()=>{
		const fetchUser=async()=>{
			try {
				const res = await userRequest.get("/users?userId="+currentUserId); 
				setCurrentUser(res.data);
			} catch(error) {
				console.log(error);
			}
		}
		fetchUser();
	},[currentUserId,setCurrentUser])
	//feched currentUser

	const [updated,setUpdated]=useState()
	const name = useRef();
	const from = useRef();
	const live = useRef();
	const work = useRef();
	const school = useRef();
	const relationship = useRef();
	const birthday = useRef();
	const desc = useRef();
	const history=useHistory();

	const handleSubmit=async (e)=>{
		e.preventDefault()
		const body={
			userId:currentUserId,
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
			const res =await userRequest.put("/users/"+currentUserId,body);
			setUpdated(true) 
			followings.length>0 ? history.push("/profile/"+currentUser?.username) :history.push("/friendPage?type=all") 

		} catch (error) {
			console.log(error)
		}
		
	}


	return (
		<div className='updateProfileContainer'>
			<Topbar />
			<div className="profile-update">

				{updated ? "the profile Infomation is now updated" : ''}

				<form className="profile-update-form" onSubmit={handleSubmit}>
					<input type="text" ref={name} placeholder="Name" defaultValue={currentUser?.name} required/>
					<div className="birthday">
						<label htmlFor="birthday" className='birthday-label'>Date of Birth    :</label>
						<input type="date" ref={birthday} placeholder="birthday" defaultValue={currentUser?.birthday} />
					</div>
					<input type="text" ref={from} placeholder="From" defaultValue={currentUser?.from} required />
					<input type="text" ref={live} placeholder="Live" defaultValue={currentUser?.live} required />
					<input type="text" ref={work} placeholder="Work" defaultValue={currentUser?.work} required />
					<input type="text" ref={school} placeholder="School" defaultValue={currentUser?.school} required />

					<h3>Relationship Status</h3>
					<div className="relationshipStatus">
						<label htmlFor="single"><span> Single </span><input type="radio" name="relationship" id="single" value="1" onChange={(e)=>relationship.current=e.target.value }/> </label>
						<label htmlFor="inRelationship"> In a relationship <input type="radio" name="relationship" id="inRelationship" value="2" onChange={(e)=>relationship.current=e.target.value }/>  </label>
						<label htmlFor="complicated"> Complicated <input type="radio" name="relationship" id="complicated" value="3" onChange={(e)=>relationship.current=e.target.value } /> </label>
					</div>

					<textarea name="" id="" cols="30" rows="5" ref={desc} placeholder="Write Something About You Here" defaultValue={currentUser?.desc} required ></textarea>
					<button type="submit">Save</button>
				</form>
			</div>
		</div>
	)
}

export default UpdateInfo
