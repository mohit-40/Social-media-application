import React, { useEffect } from 'react'
import { useState } from 'react'
import { userRequest } from '../../requestMethod';

function ListModalListItem({userId}) {
	const [user,setUser] =useState(null);
	useEffect(()=>{
		const fetchUser=async()=>{
			try {
				const res = await userRequest.get(`/users?userId=${userId}`);
				setUser(res.data);
			} catch(error) {
				console.log(error.message);
			}
		}
		fetchUser();
	},[userId])

	return (
		<li className="likeModalListItem">
			<div className="likeModalListItemImgContainer">
				<img src={user?.profilePicture} alt="" className='likeModalListItemImg' />
			</div>
			<div className="likeModelListItemName"> {user?.name} </div>
		</li>
	)
}

export default ListModalListItem
